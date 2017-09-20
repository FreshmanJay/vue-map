<template>
    <div class="page">
        <img class="banner" src="./images/banner.jpg" alt="">
        <div class="nav">
            <span v-for="(item,index) in nav" :class="{activeClass:isActive==index}" @click="toggle(index,item.view)">{{item.name}}</span>
        </div>
        <child :is="currentView"></child>
        <div class="page_toast" v-if="showToast">
            <div class="toast_clo">
                 <img src="./images/close.png" alt="" @click="hideToast">
                 <h1>无法获取到您的地理位置，请您手动添加<br>我们将为您推荐最合适的驾校或教练</h1>
                 <div class="toast_add" @click="goAddress">选择出发地</div>

            </div>
        </div>
        <router-view></router-view>
    </div>

</template>

<script type="text/ecmascript-6">
    import CONST from '../../const';
    import {Utils} from '../../utils';
    import store from '../../store';
    import { mapState } from 'vuex';
    import all from './all.vue';
    import preference from './preference.vue';
    import free from './free.vue';
    export default {
        name: 'index',
        computed:{
             ...mapState(['list','lat','lng','cityCode','gpsCity'])
        },
        components: {
            all,
            preference,
            free
        },
        mounted(){
             store.commit('loadData',this.getParams({
                  reload:true,
                  callback:function(){
                       document.body.className = '';
                  }
             }))
             if(this.lat<=0 || this.lng<=0){
                  this.showToast=true
             }

        },
        methods: {
            getParams(config){
                var params={
                    page:this.page,
                    limit:this.limit,
                    lat:this.lat,
                    lng:this.lng,
                    cityCode:this.cityCode,
                    activityType:this.activityType
                }
                return Utils.extend(params, config)
            },
            toggle: function (index,v) {
                this.isActive = index;
                this.currentView = v;
                if(index==0){
                    this.activityType='';
                    store.commit('loadData',this.getParams({
                          activityType:this.activityType,
                          reload:true
                    }))
                }else if(index==1){
                     this.activityType=1;
                     store.commit('loadData',this.getParams({
                            activityType:this.activityType,
                            reload:true
                     }))
                }else if(index==2){
                     this.activityType=2;
                     store.commit('loadData',this.getParams({
                            activityType:this.activityType,
                            reload:true
                     }))
                }
            },
            hideToast(){
                this.showToast=false
            },
            goAddress(){
                window.location.href = CONST.shareUrl + '#/address';
                this.showToast=false
            }
        },
        data(){
            return{
                page:1,
                limit:10,
                activityType:'',
                currentView: 'all',
                isActive:0,
                showToast:false,
                nav:[
                    {
                        name:'全部',
                        view:'all'
                    },
                    {
                        name:'限时特惠',
                        view:'preference'
                    },
                    {
                        name:'免费试学',
                        view:'free'
                    }
                ]
            }
        }
    }
</script>

<style>
    @import "style.css";
</style>
