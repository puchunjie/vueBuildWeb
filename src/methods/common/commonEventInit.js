/**
 *
 * 使用方法：
 * 调用方法
 * import { commonEventInit } from 'commonEventInit'
 * 在模块最外层元素绑定mouseover方法：
 * <xxx @mouseover="eventInit"></xxx>
 * 
 *  methods:{
 *      eventInit:function(){
 *          commonEventInit({
 *              vm:this,
 *              dragStart:function(){}
 *              ...
 *          })
 *      }
 *  },
 * ==========================================================================================================
 *  data(){                                                                                                 |
 *      return{                                                                                             |
 *          draggabale:false    //!!!!!看过来，这个必须写上，避免模块多次初始化拖拽和resize，影响到性能！！！！！！      |
 *      }                                                                                                   |
 *  }                                                                                                       |
 *==========================================================================================================
 * 
 * 模块初始化
 * 对外提供6个钩子函数,1个配置对象
 * vm:当前模块的vm(一般在模块内为this)
 * dragStart:拖拽开始时候执行,
 * draging:拖拽时执行,
 * dragStop:拖拽停止时执行,
 * resizeStart:resize开始时执行,
 * resizeing:resize时执行,
 * resizeStop:resize停止时执行
 */
import { any2Px } from "bUtils";

export function commonEventInit(obj) {
    // 参数修正
    obj.vm = obj.vm || {};
    obj.handles = obj.handles || 'all';
    //如果忘记在模块中定义draggable标示，那么就动态添加一个防止代码出错
    obj.vm.draggable = obj.vm.draggable === undefined ? obj.vm.$set(obj.vm, 'draggable', false) : obj.vm.draggable;
    // 是否初始化标示，避免多次初始化
    if (obj.vm.draggable) {
        return;
    } else {
        obj.dragStart = obj.dragStart || function() {};
        obj.draging = obj.draging || function() {};
        obj.dragStop = obj.dragStop || function() {};
        obj.resizeStart = obj.resizeStart || function() {};
        obj.resizeing = obj.resizeing || function() {};
        obj.resizeStop = obj.resizeStop || function() {};
        obj.sortStop = obj.sortStop || function() {};
        registerClickAction();
        let originStyle = $(obj.vm.$el).attr('style');
        // 绑定拖拽函数
        $(obj.vm.$el).draggable({
            containment: "parent",
            snap: true, //自动吸附
            snapTolerance: 2, //吸附颗粒度
            start: function(event, ui) {
                obj.dragStart();
                // 鼠标拖拽模块时候的偏移值，需要记录下来，但是又不想写进vux里，所以暂时挂载到body上去
                $("body").data("offset", { x: event.offsetX, y: event.offsetY });
                //不点击模块直接移动模块时，自动触发选择模块事件
                obj.vm.switchSelectModuleKey({
                    keys: {
                        dragKey: obj.vm.dragIndex,
                        slotModuleKey: obj.vm.slotModuleIndex
                    },
                    container: obj.vm.container
                });
                //移动时关闭工具栏
                obj.vm.closeToolbar();
                //移动时候使同一通栏内的其他模块变为透明
                $(obj.vm.$el).siblings(".draggle-module").addClass("be-opcity");
            },
            drag: function(event, ui) {
                obj.draging();
            },
            stop: function(event, ui) {
                obj.dragStop();
                //拖动完其他模块取消透明
                $(".draggle-module").removeClass("be-opcity");
                // 判断是否跨通栏（根据当前拖拽模块容器通栏和目标容器通栏是否为同一个）
                let toContIndex = $(event.toElement).parents(".bst-banner-content").attr("dragIndex");
                let nowContIndex = $(event.target).parents(".bst-banner-content").attr("dragIndex");
                // 如果不存在，就说明没有托出通栏,或者两个index相同也是没托出通栏，夸通栏处理在drag.vue里面做了统一处理
                if (!toContIndex || toContIndex == nowContIndex) {
                    //更新数据同步模块
                    obj.vm.module['$styles']['container'].left = any2Px(ui.position.left);
                    obj.vm.module['$styles']['container'].top = any2Px(ui.position.top);
                    //更新数据到状态机
                    obj.vm.modifyModuleData(obj.vm.module);
                }
                revertOriginStyle(obj, originStyle);

                //实时更新位置数据到黑色面板
                let setting = {
                    width: parseInt(obj.vm.getModuleData.$styles["container"]["width"]),
                    height: parseInt(obj.vm.getModuleData.$styles["container"]["height"]),
                    left: ui.position.left,
                    top: ui.position.top
                }
                obj.vm.getSettingInfo(setting);
            }
        }).click(
            $.singleDoubleClick(function(e) {
                //点击模块，把模块的数据都发送到状态机中，并打开工具栏
                if ($(this).is('.ui-draggable-dragging')) {
                    return;
                } else {
                    $(e.currentTarget).removeClass("ui-resizable-autohide");
                    clickActions(e, obj);
                }
            }, function(e) {
                if ($(this).is('.ui-draggable-dragging')) {
                    return;
                } else {
                    if (obj.vm.componentDbclickEvent) {
                        obj.vm.switchSelectModuleKey({
                            keys: {
                                dragKey: obj.vm.dragIndex,
                                slotModuleKey: obj.vm.slotModuleIndex,
                            },
                            container: obj.vm.container
                        });
                        obj.vm.componentDbclickEvent();
                    } else {
                        clickActions(e, obj);
                    }
                }
            })
        ).resizable({
            handles: obj.handles,
            create: function() {
                $(this).find(".ui-resizable-handle").each(function() {
                    $(this).empty().append('<p class="knob"></p>');
                });
                //隐藏掉resize边框
                $(this).addClass("ui-resizable-autohide");
            },
            start: function() {
                obj.resizeStart();
            },
            resize: function(event, ui) {
                obj.resizeing(ui);
            },
            stop: function(event, ui) {
                let bannerContent = $(event.target).parents(".banner-content-inside");
                let moduleWidth = ui.size.width,
                    moduleHeight = ui.size.height,
                    moduleTop = ui.position.top,
                    moduleLeft = ui.position.left;

                // 如果拖动后模块的宽高超出了通栏边界，则然模块回到通栏中
                if (moduleLeft + moduleWidth > bannerContent.width()) {
                    moduleWidth = bannerContent.width();
                } else if (moduleLeft < 0) {
                    moduleWidth = moduleWidth + moduleLeft;
                    moduleLeft = 0;
                }
                if (moduleTop + moduleHeight > bannerContent.height()) {
                    moduleHeight = bannerContent.height() - moduleTop;
                } else if (moduleTop < 0) {
                    moduleHeight = moduleHeight + moduleTop;
                    moduleTop = 0;
                }

                //更新数据同步模块
                obj.vm.module['$styles']['container'].width = obj.vm.module['$styles']['container'].width == 'auto' ? 'auto' : any2Px(moduleWidth);
                obj.vm.module['$styles']['container'].height = obj.vm.module['$styles']['container'].height == 'auto' ? 'auto' : any2Px(moduleHeight);
                obj.vm.module['$styles']['container'].top = any2Px(moduleTop);
                obj.vm.module['$styles']['container'].left = any2Px(moduleLeft);
                obj.resizeStop(ui);

                //更新数据到状态机
                obj.vm.modifyModuleData(obj.vm.module);
                revertOriginStyle(obj, originStyle);

                //实时更新宽高数据到黑色面板
                let setting = {
                    width: ui.size.width,
                    height: ui.size.height,
                    left: ui.position.left,
                    top: ui.position.top
                }
                obj.vm.getSettingInfo(setting);
            }
        });
        //初始化完毕设置模块初始化标示为不在初始化模式
        obj.vm.draggable = true;
    }
}


//通用单击事件，打开工工具条
function clickActions(e, obj) {
    let left = e.pageX + "px";
    let top = e.pageY + "px";

    obj.vm.switchSelectModuleKey({
        keys: {
            dragKey: obj.vm.dragIndex,
            slotModuleKey: obj.vm.slotModuleIndex,
        },
        container: obj.vm.container
    })
    let payload = {
        position: {
            left: left,
            top: top
        },
        moduleName: obj.vm.module.moduleName,
        ishide: true
    };
    //打开工具栏
    if (obj.vm.componetOpenToolebar) {
        obj.vm.componetOpenToolebar(payload);
    }
    obj.vm.openToolbar(payload);
    let setting = {
        width: parseInt(obj.vm.getModuleData.$styles["container"]["width"]),
        height: parseInt(obj.vm.getModuleData.$styles["container"]["height"]),
        left: parseInt(obj.vm.getModuleData.$styles["container"]["left"]),
        top: parseInt(obj.vm.getModuleData.$styles["container"]["top"])
    }
    obj.vm.openToolbar(payload);
    obj.vm.getSettingInfo(setting);
    // 给window注册点击时间来关闭toolbar和resize边框
    $(window).one('click', function() {
        obj.vm.closeToolbar();
        $(obj.vm.$el).addClass("ui-resizable-autohide");
        //obj.vm.resetSeleModule()
    });
}

//注册单击和双击事件的处理方法
function registerClickAction() {
    if (!$.singleDoubleClick) {
        $.singleDoubleClick = function(singleClk, doubleClk) {
            return (function() {
                var alreadyclicked = false;
                var alreadyclickedTimeout;

                return function(e) {
                    if (alreadyclicked) {
                        // double
                        alreadyclicked = false;
                        alreadyclickedTimeout && clearTimeout(alreadyclickedTimeout);
                        doubleClk && doubleClk(e);
                    } else {
                        // single
                        alreadyclicked = true;
                        alreadyclickedTimeout = setTimeout(function() {
                            alreadyclicked = false;
                            singleClk && singleClk(e);
                        }, 300);
                    }
                }
            })();
        }
    }
}

function revertOriginStyle(obj, originStyle) {
    if (originStyle) {
        $(obj.vm.$el).attr('style', originStyle);
    } else {
        $(obj.vm.$el).removeAttr('style');
    }

}