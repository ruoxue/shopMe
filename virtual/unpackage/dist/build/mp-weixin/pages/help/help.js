(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/help/help"],{"1a33":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"21fb":function(t,n,e){"use strict";e.r(n);var a=e("1a33"),i=e("a90c");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);var u,c=e("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=r.exports},"315f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{waterfall:"",list:[],_isEnded:!1,page:1}},onLoad:function(t){this.loadData()},methods:{news:function(n){t.navigateTo({url:"./news?id="+n.currentTarget.id})},loadData:function(){var t=this;this.$net.fetch((function(n){n.page.pages<=n.page.current&&(t._isEnded=!0),t.list=t.list.concat(n.list)}),this.$net.getNewsItem,{page:t.page},"post")},onPullDownRefresh:function(){this.list=[],this.page=1,this._isEnded=!1,this.loadData()},onReachBottom:function(){this.loadMore()},loadMore:function(){this._isEnded?t.showToast({title:"暂无更多数据",icon:"none"}):(this.page++,this.loadData())}}};n.default=e}).call(this,e("543d")["default"])},a90c:function(t,n,e){"use strict";e.r(n);var a=e("315f"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},c44e:function(t,n,e){"use strict";(function(t){e("16bf");a(e("66fd"));var n=a(e("21fb"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["c44e","common/runtime","common/vendor"]]]);