import _ from "lodash"
exports.setLevelMenu = function (vm,dK,sk,type) {
    let dragKey = dK;        //  通栏的index
    let slotModuleKey = sk;       //选中模块的index
    let zIndexArr=[];        //保存索引与层级
    let currentIndex=-1;      //当前模块的zIndex在zIndexArr中的索引
    let moduleArr = _.clone(vm.layouts[dragKey].slotModeules);   //通栏的所有模块
    let z = vm.getModuleData.$styles.container["z-index"]; //当前模块的zINdex
    $(moduleArr).each(function(i,v){
        zIndexArr.push({
            k:i,
            zIndex:v.$styles.container['z-index']
        })
    })
    //排序
    zIndexArr.sort(function(a,b){
        return a.zIndex-b.zIndex;
    })
    $(zIndexArr).each(function(i,v){
        if(v.k==slotModuleKey){
            currentIndex=i;
            return false;
        }
    })
    let moduleLen=zIndexArr.length;
    if(type == "indexAdd"){
        if(z == zIndexArr[moduleLen-1].zIndex){
            vm.$message.error('已是最高层级');
        }else {
            vm.modifyModuleZindex({
                elTarget: "container",
                arrData:[
                    {index:zIndexArr[currentIndex+1].k,
                    attrs:{'z-index':z}
                    }
                ],
                attributetarget1: {
                    'z-index': zIndexArr[currentIndex+1].zIndex
                }
            });
        }
    } else if(type == "indexMinus"){
        if(z == zIndexArr[0].zIndex){
            vm.$message.error('已是最低层级');
        }else {
            vm.modifyModuleZindex({
                elTarget: "container",
                arrData:[
                    {index:zIndexArr[currentIndex-1].k,
                    attrs:{'z-index':z}
                    }
                ],
                attributetarget1: {
                    'z-index':zIndexArr[currentIndex-1].zIndex
                }
            });  
        }
    } else if(type == "indexTop"){
        if(z == zIndexArr[moduleLen-1].zIndex){
            vm.$message.error('已是最高层级');
        }else {
            let setArr=[];
            $(zIndexArr).each(function(i,v){
                if(i>currentIndex){
                  setArr.push(
                   {index:v.k,
                    attrs:{'z-index':zIndexArr[i-1].zIndex}
                    } 
                  )  
                }
            });
            vm.modifyModuleZindex({
                elTarget: "container",
                arrData:setArr,
                attributetarget1: {
                    'z-index': zIndexArr[moduleLen-1].zIndex
                }
            });
        }
    } else if(type =="indexBottom"){
        if(z == zIndexArr[0].zIndex){
            vm.$message.error('已是最低层级');
        }else {
            let setArr=[];
            $(zIndexArr).each(function(i,v){
                if(i<currentIndex){
                  setArr.push(
                   {index:v.k,
                    attrs:{'z-index':zIndexArr[i+1].zIndex}
                    } 
                  )  
                }
            });
            vm.modifyModuleZindex({
                elTarget: "container",
                arrData:setArr,
                attributetarget1: {
                    'z-index':zIndexArr[0].zIndex
                }
            });  
        }
    }
    vm.IsLevelHide = false;
}


