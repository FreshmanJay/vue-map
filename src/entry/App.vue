<template>
    <div id="app" class="app" @click="event">
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import CONST from '../const';
    require('../common/js/share-sdk-v2.0')
    export default {
        name: 'app',
        methods: {
            //事件统计，添加data-event属性
            event: function (ev) {
                var target = ev.target;
                if (target.attributes && target.attributes['data-event']) {
                    window.mcShare.Statistic.event((CONST.isMucang ? '客户端-' : '') + target.attributes['data-event'].value);
                }
            }
        }
    }
</script>
<style>
    @import "../common/scss/base.css";
</style>
