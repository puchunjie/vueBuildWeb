module.exports = [{

        name: "样式",
        type: "settings",
        icon: "icon-xtgl6",
        fun: function(_this) {
            _this.openModuleSet('blank-set');
        }
    },
    {

        name: "链接",
        type: "link",
        icon: "icon-lianjie",
        fun: function(_this) {
            _this.openLinkSet({
                hasTarget:true,
                el: 'moduleSet>advancedSetting>href',
                iTarget:'moduleSet>advancedSetting>target',
                iType:'moduleSet>advancedSetting>type',
                href:_this.getModuleData.moduleSet.advancedSetting.href,
                target:_this.getModuleData.moduleSet.advancedSetting.target,
                linkType:_this.getModuleData.moduleSet.advancedSetting.type?_this.getModuleData.moduleSet.advancedSetting.type:'custom'
            });
        }

    },
     {
        name: "层级",
        type: "level",
        icon: "icon-cengdisc",
        fun: function(_this) {
            _this.IsLevelHide = !_this.IsLevelHide;
        }
    }, {
        name: "复制",
        type: "copy",
        icon: "icon-fuzhi",
        fun: function(_this) {
            _this.copyModule();
        }
    }, {
        name: "删除",
        type: "delete",
        icon: "icon-shanchu",
        fun: function(_this) {
            _this.deleteModule();
            _this.closeToolbar();
        }
    },
    // {
    //     name: "帮助",
    //     type: "help",
    //     icon: "icon-wenhao1",
    //     fun: function(_this) {
    //         alert("7")
    //     }
    // },
    {
        name: "锁定",
        type: "lock",
        icon: "icon-suoding",
        fun: function(_this) {
            _this.toggleModuleLock();
        }
    }
]