// const host = "http://qiafan.applinzi.com/ThinkAdmin/public/index.php/data/";
// const host = "http://127.0.0.1:8099/index.php/data/";
// const host = "http://127.0.0.1:8888/public/index.php/api/";
const host = "";
const base = "/mobile/";

// const host='https://qiafan.applinzi.com/qiafan/public/index.php/api/';
// const upload="file/upload";//sh
const getSlider =  "/dev-api/order/productBanner/list"; //轮播
const getCate = base+"productCategory/category"; //类型
const getGoods = base+"product/list"; // 商品
const getMineGoods =base+ "product/mineList"
const detail =base+ "product/"; // 商品
const addOrder =  "/dev-api/order/buyerOrder"; // 
const getOrder =  "/dev-api/order/buyerOrder/list"; // 
const orderDetail = "/dev-api/order/buyerOrder"; // 
const perfectOrder =  "/dev-api/order/buyerPayment"; //  完成订单
const paymentOrder =base+ "user.order/pay"; //  订单下单

const address =base+ "buyerAddress/list"; //  地址
const addAddress =base+ "buyerAddress"; //  地址
const delAddress = base+"buyerAddress"; //  地址
const stateAddress =base+ "buyerAddress"; //  地址

const getRegion = base+"city/list"; //区域

const wxSession =base+ "wxapp/session"; //区域
const loginin = "/dev-api/auth/mlogin"; //
const register = "/dev-api/auth/mobile/mregister"; //

const bindFrom =base+ "center/bindFrom";
const invited =base+ "center/getFrom";
const getUserInfo = base+"buyerUser";
const getNewsItem = base+"news/getItem";
const getNewsComment = base+"news/getComment";
const getNewsMark = base+"news/getMark";
const addComment = base+"news/addComment";

const addProduct =base+ "product";


const getMeComment = "news/getComment";
const delComment = "news/delComment";
const addFavor = "news/addCollect";
const delFavor = "news/delCollect";
const getFavor = "news/getCollect";
const addLike = "news/addLike";
const delLike = "news/delLike";
const getLike = "news/getLike";
const getHistory = "news/getHistory";

const addCart = "cart/add";
const getCartList = "cart/lists";
const subCart = "cart/sub";
const deleteCart = "cart/del";
const clearCart = "cart/clear";
const getBuyList="buyerOrder/buyList";
const getSaleList="buyerOrder/saleList";

const getShop=base+"productShop/shop";
const getCategory=base+"productCategory/category";
const productSku=base+"productSku";
const buyerOrder="/dev-api/order/buyerOrder"
const getPayChannel= "/dev-api/order/payChannel/list";
const paymentSaleOrder="/mobile/buyerOrder/saleList";

const getType=(status)=>{//商品类型 1:实物 2:虚拟商品 3:电子卡密4 求购
	if(status==1){
		return '实物';
	}else if(status==2){
		return '虚拟商品';
	}else if(status==3){
		return '电子卡密';
	}else if(status==4){
		return '求购';
	}else{
		return '未知';
	}
	
	
}


const getOrderStatus=(status,type)=>{
	if(status==0){
		return '待付款';
	}else if(status==10){
		if(type==4){
			return '已提交/待收货';
		}else{
			return '已付款/待发货';
		}
	}else if(status==100){
		if(type==4){
			return '已完成/待打款';
		}else{
			return '已付款/待收货';
		}
		
	}else if(status==1000){
		return '已付款/待评价';
	}else if(status==-1){
		return '退款/售后';
	} else{
		return '未知状态';
	}
	
	
}
const getNowDate=(addDay)=> {
      const timeOne = new Date()
	  timeOne.setDate(timeOne.getDate() + addDay);
      const year = timeOne.getFullYear()
      let month = timeOne.getMonth() + 1
      let day = timeOne.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      const NOW_MONTHS_AGO = `${year}-${month}-${day}`
      return NOW_MONTHS_AGO
    } 
const upload = (ret, chooseImageRes) => {
	const tempFilePaths = chooseImageRes.tempFilePaths
	uni.uploadFile({
		url: '/mobile/file/upload', //仅为示例，非真实的接口地址
		filePath: tempFilePaths[0],
		name: 'file',
		formData: {
			'user': 'test'
		},
		success: (uploadFileRes) => {
			// console.log(uploadFileRes.data);
			ret(JSON.parse(uploadFileRes.data));
		}
	});
}


const fetch = (ret, address, param, method = 'GET') => {
	// console.log(param)

	var info = uni.getStorageSync("info");
	// console.log(info);
	var infoJ = {};
	try {
		if (info != undefined) {
			infoJ = JSON.parse(info);
		}
	} catch (e) {

	}
	 


	if (method == 'post' && (infoJ.token == undefined || '' == (infoJ.token))) {

		// uni.navigateTo({
		// 	url: '/pages/login/login'
		// })
		// return;

	}

	if (param == null) {
		param = {};
	}
	//param['wxapp_id']=10001;


	var header = {
		//'content-type': 'application/x-www-form-urlencoded',
		'Authorization': infoJ.access_token //'921555d3ce6a3947bf7feae7f2bc719b'//uni.getStorageSync('token')
	};

	uni.showLoading({

		title: '网络加载中...'
	})


	uni.request({
		url: host + address,
		data: param,
		header: header,
		method: method,
		success: (res) => { 

			if (res.statusCode != 200) {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			} else {

				if (res.data.code == 200) {
					// console.log(res.data);
					ret(res.data);
				}else if(res.data.msg=='无效的token'){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}  else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}


			}

		},
		fail: (res) => {
			// console.log(res.data);

			uni.navigateTo({
				url: '/pages/public/login'
			})
		},
		complete() {

			uni.hideLoading();
			uni.stopPullDownRefresh();
		}
	});

}
export default {
	fetch,
	upload,
	getSlider,
	getCate,
	getGoods,
	addOrder,
	perfectOrder,
	address,
	getRegion,
	getOrder,
	wxSession,
	loginin,
	invited,
	bindFrom,
	addAddress,
	delAddress,
	stateAddress,
	getUserInfo,
	paymentOrder,
	getNewsItem,
	getNewsComment,
	getNewsMark,
	addComment,
	getMeComment,
	delComment,
	addFavor,
	delFavor,
	getFavor,
	addLike,
	delLike,
	getLike,
	getHistory,
	addCart,
	getCartList,
	subCart,
	deleteCart,
	clearCart,
	register,
	detail,
	orderDetail,
	addProduct,
	getMineGoods,
	getBuyList,
	getSaleList,
	getNowDate, 
	getShop, 
	getCategory ,
	productSku,
	buyerOrder,
	getPayChannel,
	paymentSaleOrder,
	getType,
	getOrderStatus

}
