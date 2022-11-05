 
/**
 * 获取字典数据
 */
export async function useDict(args) {
	let res = {};
	for(let i = 0; i < args.length; i++){
		let d = args[i];
		res[d] = [];
		await uni.request({
			url:"dev-api/system/dict/data/type/" + d,
		}).then(resp => {
		//视具体后台接口返回字段更改
			res[d] =resp[1].data.data;
		})
	}
	console.log(res);
	return res;
}
// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == ('' + value)) {
      actions.push(datas[key].label);
      return true;
    }
  })
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
}

//将方法挂载到全局后可在页面中直接使用，bus_tam_gzlx, bus_tam_clsx是字典类型

//取字典值
// this.form.gzlxName=this.selectDictLabel(this.bus_tam_gzlx,this.form.gzlx)
