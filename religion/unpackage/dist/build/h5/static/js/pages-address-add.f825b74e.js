(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-add"],{1401:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.showMask,expression:"showMask"}],staticClass:"container"},[n("v-uni-view",{staticClass:"mask",style:{opacity:t.maskVal},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hide.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"main",style:{transform:"translateY("+t.transY+"rpx)","transition-timing-function":t.speed,height:t.height+"rpx"},on:{transitionend:function(e){arguments[0]=e=t.$handleEvent(e),t.onTransitionend.apply(void 0,arguments)}}},[t._t("default")],2)],1)},s=[]},"1e90":function(t,e,n){"use strict";n.r(e);var i=n("4c65"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},2909:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=c;var i=r(n("6005")),a=r(n("db90")),s=r(n("06c5")),o=r(n("3427"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t){return(0,i.default)(t)||(0,a.default)(t)||(0,s.default)(t)||(0,o.default)()}},"2fc0":function(t,e,n){"use strict";var i=n("94db"),a=n.n(i);a.a},3427:function(t,e,n){"use strict";function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"4b45":function(t,e,n){"use strict";n.r(e);var i=n("eca1"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},"4c65":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{address:{},areaRegion:"选择地址",fValue:[0,0,0],fStyles:{confirmText:"确定",canceltext:"取消",columnFontSize:"36rpx"}}},onLoad:function(t){var e=t.id;this.address=JSON.parse(e)},methods:{chooseAddr:function(){this.$refs["addr"].popUp()},upData:function(t){console.log(t),this.areaRegion=t.region,this.address.province=t.regionArr[0],this.address.city=t.regionArr[1],this.address.area=t.regionArr[2],this.address.region=t.provinceCode+","+t.cityCode+","+t.districtCode},save:function(){void 0!=this.address.area?this.$net.fetch((function(t){uni.showToast({title:"ok",icon:"none"}),uni.navigateBack({animationDuration:300})}),void 0==this.address.code?this.$net.addAddress:this.$net.stateAddress,this.address,"post"):uni.showToast({title:"请选择地址",icon:"none"})}}};e.default=i},"4ee0":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={nTransition:n("a802").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("n-transition",{ref:"pop",attrs:{height:500,maskVal:.5}},[n("v-uni-view",{staticClass:"btn"},[n("v-uni-view",{staticClass:"btn_item",style:{color:t.fStyles.cancelColor},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.popDown.apply(void 0,arguments)}}},[t._v(t._s(t.fStyles.canceltext))]),n("v-uni-view",{staticClass:"btn_item",style:{color:t.fStyles.confirmColor},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bindSure.apply(void 0,arguments)}}},[t._v(t._s(t.fStyles.confirmText))])],1),n("v-uni-picker-view",{staticClass:"picker",attrs:{"indicator-style":t.indicatorStyle,value:t.value},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindChange.apply(void 0,arguments)}}},[n("v-uni-picker-view-column",t._l(t.provinces,(function(e){return n("v-uni-view",{key:e.code,staticClass:"item",style:{"font-size":t.fStyles.columnFontSize}},[t._v(t._s(e.name))])})),1),n("v-uni-picker-view-column",t._l(t.cities,(function(e){return n("v-uni-view",{key:e.code,staticClass:"item",style:{"font-size":t.fStyles.columnFontSize}},[t._v(t._s(e.name))])})),1),n("v-uni-picker-view-column",{directives:[{name:"show",rawName:"v-show",value:t.districts.length,expression:"districts.length"}]},t._l(t.districts,(function(e){return n("v-uni-view",{key:e.code,staticClass:"item",style:{"font-size":t.fStyles.columnFontSize}},[t._v(t._s(e.name))])})),1)],1)],1)},s=[]},"50fe":function(t,e,n){var i=n("927e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4a8f684d",i,!0,{sourceMap:!1,shadowMode:!1})},"5ad5":function(t,e,n){"use strict";var i=n("50fe"),a=n.n(i);a.a},6005:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=s;var i=a(n("6b75"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){if(Array.isArray(t))return(0,i.default)(t)}},"637e":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={nAddress:n("7742").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-form",[n("v-uni-view",{staticClass:"cu-form-group margin-top"},[n("v-uni-view",{staticClass:"title"},[t._v("收货人")]),n("v-uni-input",{attrs:{placeholder:"收货人",name:"input"},model:{value:t.address.name,callback:function(e){t.$set(t.address,"name",e)},expression:"address.name"}})],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[t._v("手机号")]),n("v-uni-input",{attrs:{placeholder:"手机号",name:"input"},model:{value:t.address.phone,callback:function(e){t.$set(t.address,"phone",e)},expression:"address.phone"}})],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[t._v("所在地区")]),n("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseAddr.apply(void 0,arguments)}}},[n("v-uni-text",[t._v(t._s(t.areaRegion))])],1)],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-view",{staticClass:"title"},[t._v("详细地址")]),n("v-uni-input",{attrs:{placeholder:"详细地址",name:"input"},model:{value:t.address.detail,callback:function(e){t.$set(t.address,"detail",e)},expression:"address.detail"}})],1)],1),n("v-uni-button",{staticClass:"bg-red  submit text-white ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.save()}}},[t._v("保存")]),n("v-uni-view",{staticClass:"container"},[n("n-address",{ref:"addr",attrs:{fValue:t.fValue,fStyles:t.fStyles},on:{"up-data":function(e){arguments[0]=e=t.$handleEvent(e),t.upData.apply(void 0,arguments)}}})],1)],1)},s=[]},7742:function(t,e,n){"use strict";n.r(e);var i=n("4ee0"),a=n("4b45");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("5ad5");var o,r=n("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"cf5ed62c",null,!1,i["a"],o);e["default"]=c.exports},8055:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{speed:{type:String,default:"cubic-bezier(0.68, -0.55, 0.27, 1.55)"},height:{type:Number,default:500},maskVal:{type:Number,default:.4}},data:function(){return{showMask:!1,transY:this.height}},methods:{show:function(){var t=this;this.showMask=!0,setTimeout((function(){t.transY=0}),17)},hide:function(){this.transY=500},onTransitionend:function(){this.transY&&(this.showMask=!1)}}};e.default=i},"927e":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.btn[data-v-cf5ed62c]{height:%?80?%;display:flex;justify-content:space-between;align-items:center;border-bottom:%?1?% solid #eef0ef}.btn .btn_item[data-v-cf5ed62c]{padding:0 %?30?%;font-size:%?30?%;line-height:%?60?%}.picker[data-v-cf5ed62c]{width:100vw;height:%?400?%;margin-top:%?20?%}.picker .item[data-v-cf5ed62c]{display:flex;justify-content:center;align-items:center;text-align:center}',""]),t.exports=e},"94db":function(t,e,n){var i=n("9aae");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("e71aed66",i,!0,{sourceMap:!1,shadowMode:!1})},"9aae":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.mask[data-v-2712808c]{position:fixed;top:0;left:0;bottom:0;right:0;background-color:#000}.main[data-v-2712808c]{position:fixed;bottom:0;left:0;width:100vw;background-color:#fff;transition:-webkit-transform .4s;transition:transform .4s;transition:transform .4s,-webkit-transform .4s}',""]),t.exports=e},a802:function(t,e,n){"use strict";n.r(e);var i=n("1401"),a=n("f2f0");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("2fc0");var o,r=n("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"2712808c",null,!1,i["a"],o);e["default"]=c.exports},b06a:function(t,e,n){"use strict";n.r(e);var i=n("637e"),a=n("1e90");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);var o,r=n("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"daf870ae",null,!1,i["a"],o);e["default"]=c.exports},db90:function(t,e,n){"use strict";function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},eca1:function(t,e,n){"use strict";var i=n("4ea4");n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,s=i(n("2909")),o=i(n("3835")),r={props:{fValue:{type:Array,default:function(){return[0,0,0]}},fStyles:{type:Object,default:function(){return{canceltext:"取消",confirmText:"确定",cancelColor:"#584f54",confirmColor:"#32f06b",lineBgColor:"rgba(50,240,107,.1)",lineBorColor:"#23a249",columnFontSize:"28rpx"}}}},data:function(){return{area:[],provinces:[],cities:[],districts:[],value:this.fValue,indicatorStyle:"height: ".concat(Math.round(uni.getSystemInfoSync().screenWidth/7.5),"px; \n\t\t\t\tbackground-color: ").concat(this.fStyles.lineBgColor,";\n\t\t\t\tborder-top: 1px solid ").concat(this.fStyles.lineBorColor,";\n\t\t\t\tborder-bottom: 1px solid ").concat(this.fStyles.lineBorColor,";\n\t\t\t\t")}},watch:{value:{handler:function(t,e){this.initList(t,e)},immediate:!0}},created:function(){a=this,this.$net.fetch((function(t){a.area=t,a.provinces=t,a.initList([0,0,0],[0,0,0])}),this.$net.getRegion)},methods:{popUp:function(){this.$refs["pop"].show()},bindChange:function(t){this.value=t.detail.value},popDown:function(){this.$refs["pop"].hide()},bindSure:function(){this.popDown();var t=Object.create(null),e=(0,o.default)(this.value,3),n=e[0],i=e[1],a=e[2];t.value=(0,s.default)(this.value),t.provinceCode=this.provinces[n].id,t.cityCode=this.cities[i].id,this.districts.length?(t.districtCode=this.districts[a].id,t.region="".concat(this.provinces[n].name,"-").concat(this.cities[i].name,"-").concat(this.districts[a].name),t.regionArr=[this.provinces[n].name,this.cities[i].name,this.districts[a].name]):(t.districtCode="",t.region="".concat(this.provinces[n].name,"-").concat(this.cities[i].name),t.regionArr=[this.provinces[n].name,this.cities[i].name]),this.$emit("up-data",t)},initList:function(t,e){var n,i,a=(0,o.default)(t,3),s=a[0],r=a[1];a[2];if(e instanceof Array){var c=(0,o.default)(e,3);n=c[0],i=c[1],c[2],s!==n&&(this.value=[s,0,0]),r!==i&&(this.value=[s,r,0])}if(0!=this.provinces.length)try{var u=this.provinces[s].subs;this.cities=u,this.districts=u[r]&&u[r].subs||[]}catch(d){console.log(d)}}}};e.default=r},f2f0:function(t,e,n){"use strict";n.r(e);var i=n("8055"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a}}]);