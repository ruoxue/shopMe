(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-home"],{"32e3":function(t,e,i){var s=i("b7fd");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=i("4f06").default;a("d8aa0b52",s,!0,{sourceMap:!1,shadowMode:!1})},"5fd9":function(t,e,i){"use strict";var s;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return s}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-swiper",{staticClass:"screen-swiper",class:t.dotStyle?"square-dot":"round-dot",attrs:{"indicator-dots":!0,circular:!0,autoplay:!0,interval:"5000",duration:"500"}},t._l(t.swiperList,(function(e,s){return i("v-uni-swiper-item",{key:s},["image"==e.type?i("v-uni-image",{attrs:{src:e.img,mode:"aspectFill"}}):t._e(),"video"==e.type?i("v-uni-video",{attrs:{src:e.img,autoplay:!0,loop:!0,muted:!0,"show-play-btn":!1,controls:!1,objectFit:"cover"}}):t._e()],1)})),1),i("v-uni-scroll-view",{attrs:{"scroll-y":!0}},[i("v-uni-view",{staticClass:"grid col-2 cu-list  no-padding "},t._l(t.dataList,(function(e,s){return i("v-uni-view",{key:s,staticClass:"cu-item"},[i("v-uni-navigator",{attrs:{url:"../detail/detail?id="+e.goods_id}},[i("v-uni-view",{staticClass:"content text-center"},[i("v-uni-image",{staticClass:"cu-avatar xl  margin-10 ",staticStyle:{width:"96%",height:"280rpx",margin:"2%"},style:"background-image: url("+e.cover+");",attrs:{src:e.cover}}),i("v-uni-text",{staticClass:"text-ABC text-lg ",staticStyle:{color:"black"}},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"text-center"},[i("v-uni-text",{staticClass:"text-price text-lg",staticStyle:{color:"red"}},[t._v(t._s(e.price_selling))]),i("v-uni-text",{staticClass:"text-price ",staticStyle:{"font-style":"italic","text-decoration":"line-through"}},[t._v(t._s(e.price_market))])],1)],1)],1)],1)})),1)],1)],1)},n=[]},"7e7e":function(t,e,i){"use strict";i.r(e);var s=i("5fd9"),a=i("841a");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("897a");var r,o=i("f0c5"),c=Object(o["a"])(a["default"],s["b"],s["c"],!1,null,"599e34f4",null,!1,s["a"],r);e["default"]=c.exports},"841a":function(t,e,i){"use strict";i.r(e);var s=i("d985"),a=i.n(s);for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e["default"]=a.a},"897a":function(t,e,i){"use strict";var s=i("32e3"),a=i.n(s);a.a},b7fd:function(t,e,i){var s=i("24fb");e=s(!1),e.push([t.i,".tower-swiper .tower-item[data-v-599e34f4]{-webkit-transform:scale(calc(.5 + var(--index) / 10));transform:scale(calc(.5 + var(--index) / 10));margin-left:calc(var(--left) * %?100?% - %?150?%);z-index:var(--index)}",""]),t.exports=e},d985:function(t,e,i){"use strict";i("99af"),i("e25e"),i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{cardCur:0,swiperList:[],dotStyle:!1,towerStart:0,direction:"",dataList:[],cate:"",page:1,_isEnded:!1}},onLoad:function(){this.TowerSwiper("swiperList");var t=this;this.$net.fetch((function(e){t.swiperList=null==e.wxapp.slider?[]:e.wxapp.slider.split("|")}),this.$net.getSlider),t.loadData()},methods:{loadData:function(){var t=this;this.$net.fetch((function(e){e.list.current_page<e.list.last_page?(console.log("12"),t._isEnded=!1):(console.log("23"),t._isEnded=!0),t.dataList=t.dataList.concat(e.list.data)}),this.$net.getGoods,{cate:t.cate,page:t.page},"post")},onPullDownRefresh:function(){this.page=1,this._isEnded=!1,this.dataList=[],this.loadData()},onReachBottom:function(){this.loadMore()},loadMore:function(){this.page++,this._isEnded?uni.showToast({title:"暂无更多数据",icon:"none"}):(this.loadData(),console.log("99"))},TowerSwiper:function(t){for(var e=this[t],i=0;i<e.length;i++)e[i].zIndex=parseInt(e.length/2)+1-Math.abs(i-parseInt(e.length/2)),e[i].mLeft=i-parseInt(e.length/2);this.swiperList=e},TowerStart:function(t){this.towerStart=t.touches[0].pageX},TowerMove:function(t){this.direction=t.touches[0].pageX-this.towerStart>0?"right":"left"},TowerEnd:function(t){var e=this.direction,i=this.swiperList;if("right"==e){for(var s=i[0].mLeft,a=i[0].zIndex,n=1;n<this.swiperList.length;n++)this.swiperList[n-1].mLeft=this.swiperList[n].mLeft,this.swiperList[n-1].zIndex=this.swiperList[n].zIndex;this.swiperList[i.length-1].mLeft=s,this.swiperList[i.length-1].zIndex=a}else{for(var r=i[i.length-1].mLeft,o=i[i.length-1].zIndex,c=this.swiperList.length-1;c>0;c--)this.swiperList[c].mLeft=this.swiperList[c-1].mLeft,this.swiperList[c].zIndex=this.swiperList[c-1].zIndex;this.swiperList[0].mLeft=r,this.swiperList[0].zIndex=o}this.direction="",this.swiperList=this.swiperList}}};e.default=s}}]);