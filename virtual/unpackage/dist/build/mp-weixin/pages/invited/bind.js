(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invited/bind"],{"1aa3":function(n,t,e){"use strict";(function(n){e("16bf");o(e("66fd"));var t=o(e("bc8d"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},4956:function(n,t,e){"use strict";e.r(t);var o=e("cea0"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=u.a},bc8d:function(n,t,e){"use strict";e.r(t);var o=e("d59f"),u=e("4956");for(var a in u)"default"!==a&&function(n){e.d(t,n,(function(){return u[n]}))}(a);var c,i=e("f0c5"),r=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=r.exports},cea0:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{bind:{},areaRegion:"选择地址",fValue:[0,0,0],fStyles:{confirmText:"确定",canceltext:"取消",columnFontSize:"36rpx"}}},onLoad:function(n){},methods:{chooseAddr:function(){this.$refs["addr"].popUp()},upData:function(n){console.log(n),this.areaRegion=n.region},save:function(){this.$net.fetch((function(n){}),this.$net.bindFrom,{from:this.bind.id},"post")}}};t.default=o},d59f:function(n,t,e){"use strict";var o;e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var u=function(){var n=this,t=n.$createElement;n._self._c},a=[]}},[["1aa3","common/runtime","common/vendor"]]]);