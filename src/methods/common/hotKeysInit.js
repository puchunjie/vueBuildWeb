exports.hotKeysInit = function(_this) {
    $(document).bind('keydown', 'Ctrl+c', function(evt) {
        console.log("复制了")
        if(_this.selectModule.container==''){
            return;
        }
        if (_this.getModuleData) {
            let m = _.cloneDeep(_this.getModuleData);
            _this.setModuleCopy(m);
            _this.$message('复制成功！');
        } else {
            _this.$message.error('错了哦!');
        }
    });
    $(document).bind('keydown', 'Ctrl+v', function(evt) {
        _this.pasteModuleToLayouts(_this.getDragKey);
    });
    $(document).bind('keydown', 'del', function(evt) {
        _this.deleteModule();
        _this.closeToolbar();
    });
    $(document).bind('keydown', 'left', function(evt) {
        if(_this.selectModule.container==''){
            return;
        }
        evt.preventDefault();
        let l = parseInt(_this.getModuleData.$styles.container.left);
        if (l == 0) {
            return
        }
        l--;
        _this.modifyModuleStyle({
            elTarget: "container",
            attributetarget: {
                'left': l + 'px'
            }
        });
    });
    $(document).bind('keydown', 'right', function(evt) {
        if(_this.selectModule.container==''){
            return;
        }
        evt.preventDefault();
        let l = parseInt(_this.getModuleData.$styles.container.left);
        let sWidth = parseInt(_this.getModuleData.$styles.container.width);
        let maxL = 1100 - sWidth;
        if (l == maxL) {
            return
        }
        l++;
        _this.modifyModuleStyle({
            elTarget: "container",
            attributetarget: {
                'left': l + 'px'
            }
        });
    });
    $(document).bind('keydown', 'up', function(evt) {
        if(_this.selectModule.container==''){
            return;
        }
        evt.preventDefault();
        let T = parseInt(_this.getModuleData.$styles.container.top);
        if (T == 0) {
            return
        }
        T--;
        _this.modifyModuleStyle({
            elTarget: "container",
            attributetarget: {
                'top': T + 'px'
            }
        });
    });
    $(document).bind('keydown', 'down', function(evt) {
        if(_this.selectModule.container==''){
            return;
        }
        evt.preventDefault();
        let T = parseInt(_this.getModuleData.$styles.container.top);
        let dHeight = parseInt($("#" + _this.getModuleData.moduleId).parents(".bst-banner-content").height());
        let sHeight = parseInt(_this.getModuleData.$styles.container.height);
        if (T == dHeight - sHeight) {
            return
        }
        T++;
        _this.modifyModuleStyle({
            elTarget: "container",
            attributetarget: {
                'top': T + 'px'
            }
        });
    });
}
