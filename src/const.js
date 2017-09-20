//通用、常量配置
import {getParams} from './utils/utils'
require('./common/js/share-sdk-v2.0')

//var host = window.location.protocol + '//jiaxiao.jiakaobaodian.com';
var host = window.location.protocol + '//jiaxiao.kakamobi.cn';
//var host = window.location.protocol + '//jiaxiao.ttt.mucang.cn';

var CONST = {
    host: host,
    baseUrl: host + '/api/web/v3/coach',
    MicroMessenger: navigator.userAgent.indexOf('MicroMessenger') > -1,
    isMucang: /mucang/ig.test(navigator.userAgent),
    isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
    params: getParams(),
    //shareUrl: 'http://share.m.kakamobi.com/activity.kakamobi.com/jiakaobaodian-vue-test/dist/',
    shareUrl: 'http://192.168.1.165:8888/dist/',
}

CONST.params.channel = mcShare.Utils.getChannel();
export default CONST