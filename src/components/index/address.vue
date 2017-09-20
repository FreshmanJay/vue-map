<template>
    <div class="page_home">
            <div class="home_title">
                <div class="home_ss">
                    <img src="./images/ss.png" alt="">
                    <input type="text" maxlength="45" placeholder="请选择您的上车地址"  id="#input" v-model="val"/>
                </div>
            </div>
            <div id="l-map"></div>
            <div class="home_content">
                 <div class="home_item" v-for="item in inFor" @click="select(item)">
                      <img  src="./images/loac.png" alt="">
                      <div class="home_infor">
                        <div>{{item.title}}</div>
                        <div>{{item.address}}</div>
                      </div>
                 </div>
            </div>
        </div>
</template>
<script type="text/ecmascript-6">
    import CONST from '../../const';
    import { mapState } from 'vuex';
    import store from '../../store';
    export default {
         name: 'address',
         mounted(){
            document.body.className = '';
            store.commit('update',['inFor',''])
         },
         computed:{
              ...mapState(['lat','lng','cityCode','inFor']),
//             val:{
//                  get(){
//                      return this.$store.state.val
//                  },
//                 set(value){
//                     store.commit('getAddress',value);
//                 }
//             }
         },
         watch:{
            val(newVal, oldVal){
                store.commit('getAddress',newVal);
            }
         },
         methods: {
                select(item){
                    store.commit('select',{
                        item:item,
                        callback:function(){
                            window.location.href = CONST.shareUrl + '#/'
                        }
                    })

                }
         },
        data(){
             return{
                 val:''
             }
        }

    }
</script>
<style>
    @import "style.css";
</style>