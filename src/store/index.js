import Vue from 'vue'
import Vuex from 'vuex'
import CONST from '../const';
import {getCityCode,getCityName} from '../utils/district';
import {update} from '../api/store';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        slide:true,
        lat:CONST.params._latitude ||'',
        lng:CONST.params._longitude ||'',
        cityCode:CONST.params._cityCode ||'110000',
        authToken:CONST.params.authToken,
        list:[],
        inFor:[],
        // val:'',
        loadEnd:false,
        loadStatus:false,
        showNone:false
    },
    mutations: {
        update(state, config){
            state[config[0]] = config[1];
        },
        select(state,config){
            state.lng=config.item.point.lng;
            state.lat=config.item.point.lat;
            state.cityCode=getCityCode(config.item.city||config.item.address);
            config.callback && config.callback();
        },
        loadData(state,config){
            config = config || {};
            if(config.reload){
                state.list=[];
                state.loadEnd=false;
            }else {
                state.slide=false;
                state.loadStatus=true;
            }
            update({
                activityType:config.activityType,
                latitude:config.lat,
                longitude:config.lng,
                cityCode:config.cityCode,
                page:config.page,
                limit:config.limit,
            }, function (data) {
                if(data.data.itemList.length>0){
                    state.list = state.list.concat(data.data.itemList||'');
                    state.slide=true;
                    if(config.reload){
                        state.loadStatus=false;
                    }
                }else{
                    if(config.reload){
                       state.showNone=true
                    }else {
                        state.loadEnd=true;
                    }

                }
                state.loadStatus=false;
                config.callback && config.callback();
            }, function () {
                console.log('失败')
                state.loadStatus=false;
                state.showNone=true;
                document.body.className = '';
                state.list=[]
            })
        },
        getAddress(state,config){
            state.inFor=[];
            // state.val=config;
            // var cityName= getCityName(state.cityCode)||'';
            var point = new BMap.Point(116.355958,39.981601);
            var map = new BMap.Map("l-map");
            map.centerAndZoom(point, 20);
            var options = {
                onSearchComplete: function(results){
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        for(var i =0;i<results.getCurrentNumPois();i++){
                            state.inFor=state.inFor.concat(results.getPoi(i));
                        }
                    }else{
                        state.inFor=[];
                    }
                },
                renderOptions: {map: map, panel: "r-result"}
            };
            var local = new BMap.LocalSearch(map, options);
            local.search(config);

        },

    }
//异步操作并不是必须放在actions中，最终触发的都是mutations
//actions: {
//    uploadInfo({commit}, data){
//        commit('uploadInfo', data)
//    }
//}
})
export default store
// strict: false
