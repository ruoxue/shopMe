import{_ as t,o as e,c as s,w as i,a,n,b as o,t as l,d as r,e as d,r as c,F as h,f as u,g as p,i as m,h as g,j as f,k as b,l as w,m as y,p as _,q as I,s as T,$ as L,u as A,v as x,x as k,S,y as v,z as C,A as D}from"./index.cab44bf6.js";var M=t({props:{newsItem:{type:Object,default:function(t){return{}}}},methods:{click(){this.$emit("click")},close(t){t.stopPropagation(),this.$emit("close")}}},[["render",function(t,b,w,y,_,I){const T=m,L=g,A=f;return e(),s(A,{class:"media-item view",onClick:I.click},{default:i((()=>[a(A,{class:"view",style:u({flexDirection:1===w.newsItem.article_type||2===w.newsItem.article_type?2===w.newsItem.article_type?"row":"row-reverse":"column"})},{default:i((()=>[a(T,{class:n(["media-title",{"media-title2":1===w.newsItem.article_type||2===w.newsItem.article_type}])},{default:i((()=>[o(l(w.newsItem.title),1)])),_:1},8,["class"]),w.newsItem.image_list||w.newsItem.image_url?(e(),s(A,{key:0,class:n(["image-section flex-row",{"image-section-right":2===w.newsItem.article_type,"image-section-left":1===w.newsItem.article_type}])},{default:i((()=>[w.newsItem.image_url?(e(),s(L,{key:0,"fade-show":!1,class:n(["image-list1",{"image-list2":1===w.newsItem.article_type||2===w.newsItem.article_type}]),src:w.newsItem.image_url},null,8,["class","src"])):r("",!0),w.newsItem.image_list?(e(!0),d(h,{key:1},c(w.newsItem.image_list,((t,i)=>(e(),s(L,{"fade-show":!1,class:"image-list3",src:t.url,key:i},null,8,["src"])))),128)):r("",!0)])),_:1},8,["class"])):r("",!0)])),_:1},8,["style"]),a(A,{class:"media-foot flex-row"},{default:i((()=>[a(A,{class:"media-info flex-row"},{default:i((()=>[a(T,{class:"info-text"},{default:i((()=>[o(l(w.newsItem.source),1)])),_:1}),a(T,{class:"info-text"},{default:i((()=>[o(l(w.newsItem.comment_count)+"条评论",1)])),_:1}),a(T,{class:"info-text"},{default:i((()=>[o(l(w.newsItem.datetime),1)])),_:1})])),_:1}),a(A,{class:"close-view",onClick:p(I.close,["stop"])},{default:i((()=>[a(A,{class:"close-l close-h"}),a(A,{class:"close-l close-v"})])),_:1},8,["onClick"])])),_:1}),a(A,{class:"media-item-line",style:{position:"absolute"}})])),_:1},8,["onClick"])}],["__scopeId","data-v-63cb9c64"]]);const O=b().platform;var R=t({name:"UniLoadMore",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},iconType:{type:String,default:"auto"},color:{type:String,default:"#777777"},contentText:{type:Object,default:()=>({contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"})}},data:()=>({platform:O}),methods:{onClick(){this.$emit("clickLoadMore",{detail:{status:this.status}})}}},[["render",function(t,n,c,h,p,g){const b=f,y=m;return e(),s(b,{class:"uni-load-more",onClick:g.onClick},{default:i((()=>[("circle"===c.iconType||"auto"===c.iconType&&"android"===p.platform)&&"loading"===c.status&&c.showIcon?(e(),d("svg",{key:0,width:"24",height:"24",viewBox:"25 25 50 50",class:"uni-load-more__img uni-load-more__img--android-H5"},[w("circle",{cx:"50",cy:"50",r:"20",fill:"none",style:u({color:c.color}),"stroke-width":"3"},null,4)])):"loading"===c.status&&c.showIcon?(e(),s(b,{key:1,class:"uni-load-more__img uni-load-more__img--ios-H5"},{default:i((()=>[a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"]),a(b,{style:u({backgroundColor:c.color})},null,8,["style"])])),_:1})):r("",!0),a(y,{class:"uni-load-more__text",style:u({color:c.color})},{default:i((()=>[o(l("more"===c.status?c.contentText.contentdown:"loading"===c.status?c.contentText.contentrefresh:c.contentText.contentnomore),1)])),_:1},8,["style"])])),_:1},8,["onClick"])}],["__scopeId","data-v-6a1fd314"]]);var U=t({name:"nodata",data:()=>({textTypes:{none:"暂无网络"},isConnected:!1,networkType:"none"}),mounted(){this.isIOS="ios"===b().platform,y((t=>{this.isConnected=t.isConnected,this.networkType=t.networkType})),_({success:t=>{this.networkType=t.networkType}})},methods:{retry(){this.$emit("retry")},async openSettings(){"none"!=this.networkType||this.openSystemSettings()},openAppSettings(){this.gotoAppSetting()},openSystemSettings(){this.isIOS?this.gotoiOSSetting():this.gotoAndroidSetting()},network(){var t=null,e=plus.ios.newObject("CTCellularData"),s=e.plusGetAttribute("restrictedState");return 0==s?(t=null,console.log("StateUnknown")):2==s?(t=1,console.log("已经开启了互联网权限:NotRestricted")):1==s&&(t=2,console.log("Restricted")),plus.ios.deleteObject(e),t},gotoAppSetting(){if(this.isIOS){var t=plus.ios.import("UIApplication").sharedApplication(),e=plus.ios.import("NSURL"),s=e.URLWithString("app-settings:");t.openURL(s),plus.ios.deleteObject(s),plus.ios.deleteObject(e),plus.ios.deleteObject(t)}else{var i=plus.android.importClass("android.content.Intent"),a=plus.android.importClass("android.provider.Settings"),n=plus.android.importClass("android.net.Uri"),o=plus.android.runtimeMainActivity(),l=new i;l.setAction(a.ACTION_APPLICATION_DETAILS_SETTINGS);var r=n.fromParts("package",o.getPackageName(),null);l.setData(r),o.startActivity(l)}},gotoiOSSetting(){var t=plus.ios.import("UIApplication").sharedApplication(),e=plus.ios.import("NSURL"),s=e.URLWithString("App-prefs:root=General");t.openURL(s),plus.ios.deleteObject(s),plus.ios.deleteObject(e),plus.ios.deleteObject(t)},gotoAndroidSetting(){var t=plus.android.importClass("android.content.Intent"),e=plus.android.importClass("android.provider.Settings"),s=plus.android.runtimeMainActivity(),i=new t(e.ACTION_SETTINGS);s.startActivity(i)}}},[["render",function(t,n,d,c,h,u){const p=m,g=f;return e(),s(g,{class:"nodata"},{default:i((()=>[a(g,{class:"nodata-content"},{default:i((()=>[a(g,{class:"text-view a-i-c j-c-c t-a-c"},{default:i((()=>[a(p,{class:"title"},{default:i((()=>[o(l(h.textTypes[h.networkType]),1)])),_:1})])),_:1}),a(g,{class:"icon-view"}),a(g,{class:"opera-view"},{default:i((()=>["none"!=h.networkType?(e(),s(g,{key:0,class:"btn btn-default",onClick:u.retry},{default:i((()=>[a(p,{class:"btn-text"},{default:i((()=>[o("重试")])),_:1})])),_:1},8,["onClick"])):r("",!0),"none"==h.networkType?(e(),s(g,{key:1,class:"btn btn-default",onClick:u.openSettings},{default:i((()=>[a(p,{class:"btn-text"},{default:i((()=>[o("设置")])),_:1})])),_:1},8,["onClick"])):r("",!0)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-37475ffd"]]);var W=t({components:{uniLoadMore:R,noData:U,newsItem:M},props:{nid:{type:[Number,String],default:""}},data:()=>({dataList:[],navigateFlag:!1,pulling:!1,refreshing:!1,refreshFlag:!1,refreshText:"",isLoading:!1,loadingText:"加载中...",isNoData:!1,pulling:!1,angle:0,loadingMoreText:{contentdown:"",contentrefresh:"",contentnomore:""},refreshIcon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="}),created(){this.pullTimer=null,this.requestParams={columnId:this.nid,minId:0,pageSize:10,column:"id,post_id,title,author_name,cover,published_at,comments_count"},this._isWidescreen=!1,I(this).observe({minWidth:768},(t=>{this._isWidescreen=t}))},methods:{loadData(t){this.isLoading||(this.isLoading=!0,this.isNoData=!1,this.requestParams.time=(new Date).getTime()+"",T({url:"https://unidemo.dcloud.net.cn/api/news",data:this.requestParams,success:e=>{const s=e.data;this.isNoData=s.length<=0;const i=s.map((t=>{return{id:this.newGuid()+t.id,newsid:t.id,article_type:1,datetime:(e=new Date(t.published_at.replace(/\-/g,"/")).getTime(),s=Date.now(),i=Math.floor((s-e)/1e3),a=Math.floor(i/60),n=Math.floor(a/60),o=Math.floor(n/24),l=Math.floor(o/30),r=Math.floor(l/12),d="",c=0,r>0?(d="year",c=r):l>0?(d="month",c=l):o>0?(d="day",c=o):n>0?(d="hour",c=n):a>0?(d="minute",c=a):(d="second",c=0===i?i=1:i),{year:"%n% 年前",month:"%n% 月前",day:"%n% 天前",hour:"%n% 小时前",minute:"%n% 分钟前",second:"%n% 秒前"}[d].replace("%n%",c)),title:t.title,image_url:t.cover,source:t.author_name,comment_count:t.comments_count,post_id:t.post_id};var e,s,i,a,n,o,l,r,d,c}));t?(this.dataList=i,this.requestParams.minId=0):(this.dataList=this.dataList.concat(i),this.requestParams.minId=s[s.length-1].id),this.dataList.length>0&&this._isWidescreen&&this.dataList.length<=10&&this.goDetail(this.dataList[0])},fail:t=>{0==this.dataList.length&&(this.isNoData=!0)},complete:e=>{this.isLoading=!1,t&&(this.refreshing=!1,this.refreshFlag=!1,this.refreshText="已刷新",this.pullTimer&&clearTimeout(this.pullTimer),this.pullTimer=setTimeout((()=>{this.pulling=!1}),1e3))}}))},loadMore(t){this.loadData()},clear(){this.dataList.length=0,this.requestParams.minId=0},goDetail(t){this._isWidescreen?L("updateDetail",{detail:encodeURIComponent(JSON.stringify(t))}):A({url:"./detail?query="+encodeURIComponent(JSON.stringify(t))})},closeItem(t){x({content:"不感兴趣？",success:e=>{e.confirm&&this.dataList.splice(t,1)}})},refreshData(){this.isLoading||(this.pulling=!0,this.refreshing=!0,this.refreshText="正在刷新...",this.loadData(!0))},onrefresh(t){this.refreshData()},onpullingdown(t){this.refreshing||(this.pulling=!1,Math.abs(t.pullingDistance)>Math.abs(t.viewHeight)?(this.refreshFlag=!0,this.refreshText="释放立即刷新"):(this.refreshFlag=!1,this.refreshText="下拉可以刷新"))},newGuid(){let t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return(t()+t()+"-"+t()+"-4"+t().substr(0,3)+"-"+t()+"-"+t()+t()+t()).toUpperCase()}}},[["render",function(t,n,u,p,g,b){const w=k("news-item"),y=f,_=m,I=S,T=k("no-data");return e(),s(y,{class:"page-news"},{default:i((()=>[a(I,{class:"listview",style:{flex:"1"},enableBackToTop:"true","scroll-y":"",onScrolltolower:n[0]||(n[0]=t=>b.loadMore())},{default:i((()=>[(e(!0),d(h,null,c(g.dataList,((t,n)=>(e(),s(y,{key:t.id},{default:i((()=>[a(w,{newsItem:t,onClose:t=>b.closeItem(n),onClick:e=>b.goDetail(t)},null,8,["newsItem","onClose","onClick"])])),_:2},1024)))),128)),g.isLoading||g.dataList.length>4?(e(),s(y,{key:0,class:"loading-more"},{default:i((()=>[a(_,{class:"loading-more-text"},{default:i((()=>[o(l(g.loadingText),1)])),_:1})])),_:1})):r("",!0)])),_:1}),g.isNoData?(e(),s(T,{key:0,class:"no-data",onRetry:b.loadMore},null,8,["onRetry"])):r("",!0)])),_:1})}],["__scopeId","data-v-16e08cb0"]]);var z=t({components:{newsPage:W},data:()=>({tabList:[{id:"tab01",name:"最新",newsid:0},{id:"tab02",name:"大公司",newsid:23},{id:"tab03",name:"内容",newsid:223},{id:"tab04",name:"消费",newsid:221},{id:"tab05",name:"娱乐",newsid:225},{id:"tab06",name:"区块链",newsid:208}],tabIndex:0,cacheTab:[],scrollInto:"",navigateFlag:!1,indicatorLineLeft:0,indicatorLineWidth:0,isTap:!1}),onReady(){this._lastTabIndex=0,this.swiperWidth=0,this.tabbarWidth=0,this.tabListSize={},this._touchTabIndex=0,this.pageList=[];for(var t=0;t<this.tabList.length;t++){let e=this.$refs["page"+t];Array.isArray(e)?this.pageList.push(e[0]):this.pageList.push(e)}this.switchTab(this.tabIndex),this.selectorQuery()},methods:{ontabtap(t){let e=t.target.dataset.current||t.currentTarget.dataset.current;this.isTap=!0;var s=this.tabListSize[e];this.updateIndicator(s.left,s.width),this._touchTabIndex=e,this.switchTab(e)},onswiperchange(t){},onswiperscroll(t){if(!this.isTap){var e=t.detail.dx,s=this._lastTabIndex;if(e>1?s++:e<-1&&s--,!(s===this._lastTabIndex||s<0||s>this.pageList.length-1)){0===this.pageList[s].dataList.length&&this.loadTabData(s);var i=Math.abs(this.swiperWidth/e),a=this.tabListSize[this._lastTabIndex],n=this.tabListSize[s],o=a.left+(n.left-a.left)/i,l=a.width+(n.width-a.width)/i;this.updateIndicator(o,l)}}},animationfinish(t){let e=t.detail.current;this._touchTabIndex===e&&(this.isTap=!1),this._lastTabIndex=e,this.switchTab(e),this.updateIndicator(this.tabListSize[e].left,this.tabListSize[e].width)},selectorQuery(){v().in(this).select(".tab-box").fields({dataset:!0,size:!0},(t=>{this.swiperWidth=t.width})).exec(),v().in(this).selectAll(".uni-tab-item").boundingClientRect((t=>{t.forEach((t=>{this.tabListSize[t.dataset.id]=t})),this.updateIndicator(this.tabListSize[this.tabIndex].left,this.tabListSize[this.tabIndex].width)})).exec()},getElementSize(t,e,s){t.getComponentRect(e,(t=>{this.tabListSize[s]=t.size}))},updateIndicator(t,e){this.indicatorLineLeft=t,this.indicatorLineWidth=e},switchTab(t){if(0===this.pageList[t].dataList.length&&this.loadTabData(t),this.tabIndex!==t){if(this.pageList[this.tabIndex].dataList.length>100){this.cacheTab.indexOf(this.tabIndex)<0&&this.cacheTab.push(this.tabIndex)}if(this.tabIndex=t,this.scrollInto=this.tabList[t].id,this.cacheTab.length>3){let t=this.cacheTab[0];this.clearTabData(t),this.cacheTab.splice(0,1)}}},scrollTabTo(t){const e=this.$refs["tabitem"+t][0];let s=0;t>0&&(s=this.tabbarWidth/2-this.tabListSize[t].width/2,this.tabListSize[t].right<this.tabbarWidth/2&&(s=this.tabListSize[0].width)),dom.scrollToElement(e,{offset:-s})},loadTabData(t){this.pageList[t].loadData()},clearTabData(t){this.pageList[t].clear()}}},[["render",function(t,r,p,g,b,w){const y=m,_=f,I=S,T=k("newsPage"),L=D,A=C;return e(),s(_,{class:"tabs"},{default:i((()=>[a(I,{ref:"tabbar1",id:"tab-bar",class:"tab-bar",scroll:!1,"scroll-x":!0,"show-scrollbar":!1,"scroll-into-view":b.scrollInto},{default:i((()=>[a(_,{style:{"flex-direction":"column"}},{default:i((()=>[a(_,{style:{"flex-direction":"row"}},{default:i((()=>[(e(!0),d(h,null,c(b.tabList,((t,r)=>(e(),s(_,{class:"uni-tab-item",key:t.id,id:t.id,ref_for:!0,ref:"tabitem"+r,"data-id":r,"data-current":r,onClick:w.ontabtap},{default:i((()=>[a(y,{class:n(["uni-tab-item-title",b.tabIndex==r?"uni-tab-item-title-active":""])},{default:i((()=>[o(l(t.name),1)])),_:2},1032,["class"])])),_:2},1032,["id","data-id","data-current","onClick"])))),128))])),_:1}),a(_,{class:"scroll-view-indicator"},{default:i((()=>[a(_,{ref:"underline",class:n(["scroll-view-underline",b.isTap?"scroll-view-animation":""]),style:u({left:b.indicatorLineLeft+"px",width:b.indicatorLineWidth+"px"})},null,8,["class","style"])])),_:1})])),_:1})])),_:1},8,["scroll-into-view"]),a(_,{class:"tab-bar-line"}),a(A,{class:"tab-box",ref:"swiper1",current:b.tabIndex,duration:300,onChange:w.onswiperchange,onTransition:w.onswiperscroll,onAnimationfinish:w.animationfinish,onOnAnimationEnd:w.animationfinish},{default:i((()=>[(e(!0),d(h,null,c(b.tabList,((t,n)=>(e(),s(L,{class:"swiper-item",key:n},{default:i((()=>[a(T,{class:"page-item",nid:t.newsid,ref_for:!0,ref:"page"+n},null,8,["nid"])])),_:2},1024)))),128))])),_:1},8,["current","onChange","onTransition","onAnimationfinish","onOnAnimationEnd"])])),_:1})}],["__scopeId","data-v-61187d9c"]]);export{z as default};