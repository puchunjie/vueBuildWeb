export function rtByTinymce(vm, contentElement) {

    $('#' + vm.module.moduleId).draggable( "destroy" );//模块去drag
    $('#' + vm.module.moduleId).resizable( "destroy" );//模块去drag
    $('#' + vm.module.moduleId).unbind();
    $('#' + vm.module.moduleId).find(".wordContent").addClass("nohide");
    $('#' + vm.module.moduleId).removeClass("ui-resizable-autohide");
    $('#' + vm.module.moduleId).removeClass("bst-move");
    let editor = elementHasRtInstants(contentElement);
    if(vm.module.moduleSet.advancedSetting.hasBar){
        $("#" + vm.module.moduleId).find(".wordContent").mCustomScrollbar('destroy')
    }
    if(!editor) {
        contentElement = '#' + contentElement;
        tinymce.init({
            selector: contentElement,
            menubar: false,
            inline: true,
            plugins: [
                'letterspacing lineheight advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            setup: function (editor) {
                /*editor.addButton('mylink', {
                    icon: "link",
                    tooltip: "插入链接",
                    onclick:function(e){
                        let activeEditor = tinymce.activeEditor;
                        let text = activeEditor.selection.getContent( { 'format' : 'text' } );
                        if(text==''){
                            vm.$message.error("请先选中文字");
                        }else{
                            vm.openLinkSet();
                        }
                        closeRichTextBars();
                    }
                });*/
                editor.on('blur', function(e) {
                    let moduleData = vm.module;
                    $('#' + vm.module.moduleId).find(".wordContent").removeClass("nohide");
                    if($("#setlink").length==0){
                        if(tinymce.get(contentElement.replace('#', '')).getContent() ==''){
                            $(contentElement).html(moduleData.moduleSet.advancedSetting.onaji)
                            moduleData.moduleSet.advancedSetting.wordDetails=moduleData.moduleSet.advancedSetting.onaji;
                        }else{
                            moduleData.moduleSet.advancedSetting.wordDetails = tinymce.get(contentElement.replace('#', '')).getContent();
                        }
                        editor.hide();
                        document.selection && document.selection.empty && ( document.selection.empty(), 1)
|| window.getSelection && window.getSelection().removeAllRanges();
                    }
                    vm.modifyModuleDataByIndex({
                        dragIndex:vm.dragIndex,
                        slotModuleIndex:vm.slotModuleIndex,
                        module:moduleData
                    });
                    vm.draggable = false;
                    $('#' + vm.module.moduleId).on('mousemove', function() {
                        vm.eventInit();
                        if($('#' + vm.module.moduleId).hasClass('frozen')) {
                            $('#' + vm.module.moduleId).draggable( "disable" );//模块去drag
                            $('#' + vm.module.moduleId).resizable( "disable" );//模块去drag
                        }
                    });
                    if(vm.module.moduleSet.advancedSetting.hasBar){
                        $("#"+vm.module.moduleId).find(".wordContent").mCustomScrollbar({
                            scrollButtons: {
                                enable: false,
                                scrollType: "continuous",
                                scrollSpeed: 20,
                                scrollAmount: 40
                            }
                        });
                    }
                    $('#' + vm.module.moduleId).addClass("bst-move");
                });
            },
            toolbar: "bold italic underline | alignleft aligncenter alignright alignjustify | forecolor backcolor  | formatselect fontselect fontsizeselect  letterspacingselect | code ",
            language: 'zh_CN',
            min_height: "100%",
            autofocus: true,
            //lineheight_formats: "12px 14px 16px 18px 20px 22px 24px 26px 36px 45px 50px 60px",
            letterspacing_formats: "1px 2px 3px 4px 5px 6px 7px 8px 9px 10px 12px 14px 16px 18px 20px 22px 24px 26px 36px 45px 50px 60px",
            init_instance_callback: function () {
                tinymce.activeEditor.focus();
            }
        });
    } else {
        editor.show();
        $('#' + vm.module.moduleId).find(".txt").focus()
    }
}

export const closeRichTextBars = () => {
    tinymce.editors.map(
        editor => {
            $('#' + editor.id).trigger('blur');
        }
    );
}

export const elementHasRtInstants = (id) => {
    for(let i =0; i < tinymce.editors.length ; i++) {
        if(tinymce.editors[i].id == id) {
            return tinymce.editors[i];
        }
    }
    return false;

}
