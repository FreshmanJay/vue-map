<template>
     <div class="page_content" @scroll="handleScroll">
                <div class="page_item" v-for="(item,index) in list" @click="skip(index)">
                    <div class="item_left">
                        <div class="item_avatar">
                            <img v-if="item.itemType=='coach'" class="avatar" :src="item.avatar+'!80.80'" alt="">
                            <img v-else-if="item.itemType=='jiaxiao'" class="avatar" :src="item.logo" alt="">
                            <img v-else class="avatar" src="./images/avatar.jpg" alt="">
                            <img v-if="item.itemType=='coach'&&item.certificationStatus==1" class="coach_rz" src="./images/rz.png" alt="">
                        </div>
                        <div class="item_infor">
                            <div class="item_top">
                                <span class="item_name">{{item.name}}</span>
                                    <img v-if="item.itemType=='jiaxiao'" class="jiaxiao_rz" src="./images/rz.png" alt="">
                                    <i v-if="item.itemType=='coach'">{{item.teachAge}}年教龄</i>
                                    <img v-if="item.goldCoach==1" class="item_gold" src="./images/jpjl.png" alt="">
                                </div>
                                <div class="item_mid"  v-for="obj in item.marketingActivityList">
                                    <span  v-if="obj.activityType==1">{{obj.activityPrivilege}}</span>
                                </div>
                                <div class="item_bot">
                                    <span v-if="item.studentCount>10000">学员&nbsp;{{(+item.studentCount/10000).toFixed(1)}}万</span>
                                    <span v-else>学员&nbsp;{{item.studentCount}}</span>
                                    <i v-if="item.distance>0&&item.distance<100&&lat>0&&lng>0">距离&nbsp;&lt;100m</i>
                                    <i v-if="item.distance>100&&lat>0&&lng>0">距离&nbsp;{{(+item.distance/1000).toFixed(1)}}km</i>
                                </div>
                            </div>
                        </div>
                        <div class="item_right">
                             <span>立即抢购</span>
                        </div>
                    </div>
                <img class="loading1" src="./images/loading1.gif" v-if="loadStatus">
                <div class="loading2" v-if="loadEnd">--没有更多了哦--</div>
                <div v-if="showNone">
                      <img class="page_none" src="./images/none.png">
                      <div class="none_wz">哎呦！没有符合您条件的信息</div>
                </div>
            </div>

</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
    import store from '../../store';
    import {Utils} from '../../utils';
    export default {
            name: 'preference',
            computed:{
                  ...mapState(['list','lat','lng','cityCode','slide','loadEnd','loadStatus','showNone'])
            },
            methods:{
                 getParams(config){
                       var params={
                             page:this.page,
                             limit:this.limit,
                             lat:this.lat,
                             lng:this.lng,
                             cityCode:this.cityCode,
                       }
                       return Utils.extend(params, config)
                 },
                 skip(index){
                      var activityId;
                      for(var i in this.list[index].marketingActivityList){
                            if(this.list[index].marketingActivityList[i].activityType==1){
                                 activityId=this.list[index].marketingActivityList[i].activityId
                            }
                      }
                      window.location.href="http://share.m.kakamobi.com/activity.kakamobi.com/jiakaobaodian-discount/?shareProduct=jiakaobaodian&shareKey=jiakaobaodian-discount&placeKey=jiakaobaodian-discount&activityId="+activityId
                 },
                 handleScroll(ev){
                        var target = ev.target;
                        if (this.slide && target.scrollHeight - target.scrollTop - target.offsetHeight < 50) {
                             this.page++;
                             store.commit('loadData', this.getParams({
                                    activityType:'',
                             }))
                        }
                 }
            },
            data(){
                 return{
                      page:1,
                      limit:10,
                 }
            }
    }
</script>
<style>
    @import "style.css";
</style>