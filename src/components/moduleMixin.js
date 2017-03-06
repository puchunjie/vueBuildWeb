// 定义一个混合对象
import cssJson from 'cssJson';
import {
    mapActions,
    mapGetters
} from 'vuex';
import {
    commonEventInit
} from 'commonEventInit';
export default {
    data() {
        return {
            draggable: false
        }
    },
    computed: {
        ...mapGetters([
            'pageInfo',
            'getModuleData'
        ])
    },
    props: {
        module: Object,
        dragIndex: null,
        slotModuleIndex: null,
        container: String
    },
    methods: {
        ...mapActions([
            'openToolbar',
            'closeToolbar',
            'modifyModuleData',
            'switchSelectModuleKey',
            'resetSeleModule',
            'getSettingInfo'
        ]),
        eventInit: function() {
            commonEventInit({
                vm: this
            });
        }
    },
    watch: {
        'module': {
            handler: function(val, oldVal) {
                cssJson.toStyleHEAD(this.module)
            },
            deep: true
        }
    },
    mounted: function() {
        cssJson.toStyleHEAD(this.module);
    }
}