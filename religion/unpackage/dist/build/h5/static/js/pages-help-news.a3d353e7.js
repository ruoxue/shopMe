(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-help-news"],{"0062":function(t,e,i){var n=i("4baa");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("4f06").default;s("69fe800a",n,!0,{sourceMap:!1,shadowMode:!1})},1455:function(t,e,i){"use strict";var n=i("0062"),s=i.n(n);s.a},"4baa":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".hide[data-v-18383a18]{display:none}",""]),t.exports=e},b3ca:function(t,e,i){"use strict";i.r(e);var n=i("d03c"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},cb2e:function(t,e,i){"use strict";i.r(e);var n=i("f77f"),s=i("b3ca");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("1455");var c,o=i("f0c5"),l=Object(o["a"])(s["default"],n["b"],n["c"],!1,null,"18383a18",null,!1,n["a"],c);e["default"]=l.exports},d03c:function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{waterfall:"",list:[],_isEnded:!1,page:1,news:{},isConment:!1,msg:""}},onLoad:function(t){this.news.id=t.id,this.loadNewsData(),this.loadData()},methods:{delConment:function(t){var e=this;this.$net.fetch((function(t){e.msg="",e.list=[],e._isEnded=!1,e.loadData()}),this.$net.delComment,{cid:e.news.id,id:t.currentTarget.id},"post")},closeConment:function(){this.isConment=!1},sendConment:function(){if(""!=this.msg){var t=this;this.$net.fetch((function(e){t.msg="",t.list=[],t._isEnded=!1,t.loadData()}),this.$net.addComment,{cid:t.news.id,content:this.msg},"post")}else uni.showToast({title:"请输入评论",icon:"none"})},like:function(){var t=this;this.$net.fetch((function(e){t.news.my_like_state=0==t.news.my_like_state?1:0}),0==this.news.my_like_state?this.$net.addLike:this.$net.delLike,{cid:t.news.id},"post")},favor:function(){var t=this;this.$net.fetch((function(e){t.news.my_coll_state=0==t.news.my_coll_state?1:0}),0==this.news.my_coll_state?this.$net.addFavor:this.$net.delFavor,{cid:t.news.id},"post")},comments:function(){this.isConment=!this.isConment},comment:function(t){this.isConment=!0},loadNewsData:function(){var t=this;this.$net.fetch((function(e){t.news=e.list[0]}),this.$net.getNewsItem,{id:t.news.id},"post")},loadData:function(){var t=this;this.$net.fetch((function(e){t._isEnded=!0,t.list=t.list.concat(e.list)}),this.$net.getNewsComment,{page:t.page,cid:t.news.id},"post")},onPullDownRefresh:function(){this.list=[],this.page=1,this._isEnded=!1,this.loadData()},onReachBottom:function(){this.loadMore()},loadMore:function(){this._isEnded?uni.showToast({title:"暂无更多数据",icon:"none"}):(this.page++,this.loadData())}}};e.default=n},f77f:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",[i("v-uni-view",{staticClass:"bg-white align-center text-black padding-bottom-xl padding-top-xl"},[i("v-uni-view",{staticClass:"text-ABC text-black    text-lg",staticStyle:{"text-align":"center",size:"22rpx"}},[t._v(t._s(t.news.name))])],1),i("v-uni-view",{staticClass:"fr  margin-bottom-xl"},[i("v-uni-text",{staticClass:"text-gray"},[t._v("发布时间:"+t._s(t.news.create_at))])],1),i("v-uni-view",{staticClass:"margin-top-xl bg-white ",staticStyle:{"text-align":"center"}},[i("v-uni-rich-text",{staticClass:"article bg-white",attrs:{nodes:t.news.content}})],1)],1),i("v-uni-view",{staticClass:"cu-list menu"},t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"cu-item      arrow margin-top-sm"},[""==e.member.headimg?i("v-uni-view",{staticClass:"cu-avatar cu-item radius lg margin-sm",staticStyle:{"background-image":"url(../../static/img/tabBar/user_on.png)"}}):t._e(),""!=e.member.headimg?i("v-uni-view",{staticClass:"cu-avatar cu-item radius lg margin-sm",style:"background-image: url("+e.member.headimg+");"}):t._e(),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"content"},[""!=e.member.nickname?i("v-uni-text",{staticClass:"text-black text-lg"},[t._v("用户:"+t._s(e.member.nickname))]):""!=e.member.username?i("v-uni-text",{staticClass:"text-black text-lg"},[t._v("用户:"+t._s(e.member.username))]):i("v-uni-text",{staticClass:"text-black text-lg"},[t._v("用户:匿名用户")])],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-gray text-sm"},[t._v(t._s(e.content))])],1),i("v-uni-view",{staticClass:"content fr"},[i("v-uni-text",{staticClass:"text-black text-lg cu-time"},[t._v(t._s(e.create_at))]),i("v-uni-text",{staticClass:"cuIcon-delete",attrs:{id:e.id},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.delConment.apply(void 0,arguments)}}})],1)],1)],1)})),1),i("v-uni-view",{staticClass:"bottom-fix-no "},[i("v-uni-view",{staticClass:"cu-form-group margin-top ",class:1==t.isConment?"":"hide"},[i("v-uni-input",{attrs:{placeholder:"请输入你的评论",name:"input"},model:{value:t.msg,callback:function(e){t.msg=e},expression:"msg"}}),i("v-uni-view",{staticClass:" cuIcon-forward",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendConment.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"cuIcon-close margin-left-sm",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeConment.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"cu-list col-4 grid ",class:t.isConment?"hide":""},[i("v-uni-view",{staticClass:"cu-item",class:1==t.news.my_coll_state?"text-orange":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.favor.apply(void 0,arguments)}}},[i("v-uni-view",{class:1==t.news.my_coll_state?"cuIcon-favorfill":"cuIcon-favor"},[i("v-uni-view",{staticClass:"cu-tag badge"},[t._v(t._s(t.news.num_collect))])],1)],1),i("v-uni-view",{staticClass:"cu-item ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.comment.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"cuIcon-comment"},[i("v-uni-view",{staticClass:"cu-tag badge"},[t._v(t._s(t.news.num_comment))])],1)],1),i("v-uni-view",{staticClass:"cu-item",class:1==t.news.my_like_state?"text-red":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.like.apply(void 0,arguments)}}},[i("v-uni-view",{class:1==t.news.my_like_state?"cuIcon-likefill":"cuIcon-like"},[i("v-uni-view",{staticClass:"cu-tag badge"},[t._v(t._s(t.news.num_like))])],1)],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cuIcon-read"},[i("v-uni-view",{staticClass:"cu-tag badge"},[t._v(t._s(t.news.num_read))])],1)],1)],1)],1)],1)},a=[]}}]);