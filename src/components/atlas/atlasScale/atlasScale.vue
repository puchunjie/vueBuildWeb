<template>
    <div class="bst-module atlasScale-module draggle-module smartMenu"
     :class="module.moduleId + 'styles'"
     :id="module.moduleId" @mousemove="eventInit">
    <div class="pic">
        <a v-bind="{'_target':module.moduleSet.advancedSetting.target}"><img src="" /></a>
        <p class="title" v-show="module.moduleSet.advancedSetting.titleShow"></p>
    </div>
    <div class="scale">
        <ul>
            <li v-for="(el,index) in list" class="item">
                <div><img :src="el.imgUrl" :title="el.title" :href = "el.href"></div>
                <i class="cover"></i>
            </li>
        </ul>
        <a  href="javascript:"
            class="prev btn"
            @click="btn(module.moduleSet.advancedSetting.pos,'prev')"
            :class="module.moduleSet.advancedSetting.btnStyle"></a>
        <a  href="javascript:" class="next btn"
            @click="btn(module.moduleSet.advancedSetting.pos,'next')"
            :class="module.moduleSet.advancedSetting.btnStyle"></a>
    </div>
</div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import {
        commonEventInit
    } from 'commonEventInit';
    import modulemixin from '../../moduleMixin.js';
    require('./atlasScale.css');
    export default {
        mixins: [modulemixin],
        methods: {
            ...mapActions([
                'modifyModuleStyle'
            ]),
            eventInit() {
                let _this = this
                let $el = $(_this.$el)
                commonEventInit({
                    vm: _this,
                    resizeing: function() {
                        if (_this.module.moduleSet.advancedSetting.pos == 'top' || _this.module.moduleSet.advancedSetting.pos == 'bottom') {
                            if ($('.scale ul', $el).width() <= $('.scale', $el).width()) {
                                $('.scale ul', $el).css("left", 0)
                                $(".btn", $el).hide()

                            } else {
                                $(".btn", $el).show()
                            }
                        } else {
                            if ($('.scale ul', $el).height() <= $('.scale', $el).height()) {
                                $('.scale ul', $el).css("top", 0)
                                $(".btn", $el).hide()
                            } else {
                                $(".btn", $el).show()
                            }
                        }

                    }
                })
            },
            atlasScaleFun(pos) {
                var _this = this;
                var $el = $(_this.$el)
                var item = $(".item", $el);
                var l = item.length;
                item.eq(0).addClass("on")
                item.on("click", function() {
                    $(this).addClass("on").siblings("li").removeClass("on")
                })
                var h = item.outerHeight(true)
                var w = item.outerWidth(true)
                if (pos == 'top' || pos == "bottom") {
                    $(".scale ul", $el).css("width", w * l);
                } else {
                    $(".scale ul", $el).css("height", h * l);
                }
                $(".pic img", $el).attr("src", $("img", item.eq(0)).attr("src"))
                $(".pic a", $el).attr("data-href", $("img", item.eq(0)).attr("href"))
                $(".pic p", $el).text($("img", item.eq(0)).attr("title"))
                item.on("click", function() {
                    $(".pic img", $el).attr({
                        "src": $(this).find("img").attr("src")
                    })
                    $(".pic a", $el).attr({
                        "data-href": $(this).find("img").attr("data-href")
                    })
                    $(".pic p", $el).text($(this).find("img").attr("title"))
                })
            },
            btn(pos, type) {
                var $el = $(this.$el);
                var s = $el.find(".scale").children("ul")[0]
                if (pos == "bottom" || pos == "top") {
                    var liW = $(s).children().outerWidth(true)
                    var l
                    if (type == "prev") {
                        l = s.offsetLeft
                        $(s).stop().animate({
                            "left": l + liW + 'px'
                        })
                        if (l >= -110) {
                            $(s).stop().animate({
                                "left": 0
                            })
                            return false
                        }
                    } else {
                        l = s.offsetLeft
                        $(s).stop().animate({
                            "left": l - liW + 'px'
                        })
                        var r = $(s).outerWidth(true) - ($el.find(".scale").width() - l)
                        if (r <= 110) {
                            var left = $(s).outerWidth(true) - $el.find(".scale").width() - 10
                            $(s).stop().animate({
                                "left": -left + 'px'
                            })
                            return false
                        }
                    }
                } else {
                    var liH = $(s).children().outerHeight(true)
                    var t
                    if (type == "prev") {
                        t = s.offsetTop
                        $(s).stop().animate({
                            "top": t + liH + 'px'
                        })
                        if (t >= -110) {
                            $(s).stop().animate({
                                "top": 0
                            })
                            return false
                        }
                    } else {
                        t = s.offsetTop
                        $(s).stop().animate({
                            "top": t - liH + 'px'
                        })
                        var b = $(s).outerHeight(true) - ($el.find(".scale").height() - t)
                        if (b <= 110) {
                            var top = $(s).outerHeight(true) - $el.find(".scale").height() - 10
                            $(s).stop().animate({
                                "top": -top + 'px'
                            })
                            return false
                        }
                    }
                }
            }
        },
        mounted() {
            let _this = this
            let $el = $(this.$el)
            let pos = _this.module.moduleSet.advancedSetting.pos
            _this.atlasScaleFun(pos)
            if (pos == 'top' || pos == 'bottom') {
                if ($('.scale ul', $el).width() <= $('.scale', $el).width()) {
                    $(".btn", $el).hide()
                } else {
                    $(".btn", $el).show()
                }
            } else {
                if ($('.scale ul', $el).height() <= $('.scale', $el).height()) {
                    $(".btn", $el).hide()
                } else {
                    $(".btn", $el).show()
                }
            }
            if (pos == 'left') {
                this.$watch(function() {
                    return this.module['$styles']['.item'].width
                }, function(newVal, oldVal) {
                    var pl = parseInt($('.pic', $el).css('left'))
                    var pw = pl - parseInt(oldVal)
                    _this.modifyModuleStyle({
                        elTarget: '.pic',
                        attributetarget: {
                            'left': parseInt(newVal) + pw + 'px'
                        }
                    })
                })
            } else if (pos == 'bottom') {
                this.$watch(function() {
                    return this.module['$styles']['.item'].height
                }, function(newVal, oldVal) {
                    var pb = parseInt($('.pic', $el).css('bottom'))
                    var pw = pb - parseInt(oldVal)
                    _this.modifyModuleStyle({
                        elTarget: '.pic',
                        attributetarget: {
                            'bottom': parseInt(newVal) + pw + 'px'
                        }
                    })
                })
                this.$watch(function() {
                    return this.module['$styles']['.item'].width + this.module['$styles']['.item'].height
                }, function() {
                    if (pos == 'bottom') {
                        $('.scale', $el).css('height', this.module['$styles']['.item'].height)
                    }
                    setTimeout(function() {
                        _this.atlasScaleFun(pos)
                    }, 100)
                })
            }

        },
        computed: {
            list() {
                return this.module.moduleSet.list
            }
        },
        watch: {
            list: {
                handler() {
                    var _this = this
                    setTimeout(function() {
                        _this.atlasScaleFun(_this.module.moduleSet.advancedSetting.pos)
                    }, 100)
                },
                deep: true
            }
        }
    }
</script>