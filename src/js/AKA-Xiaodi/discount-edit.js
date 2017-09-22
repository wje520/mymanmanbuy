function getSearch(key) { // '?cg_id=1&cg_type=op'
    //location.search 中存储了域名中的字符串.使用slice切除掉了地址后面的问号
    var searchStr = location.search.slice(1); // 'cg_id=1&cg_type=op'
    //再通过split切掉2个字符串中间的&符号.
    var searchArr = searchStr.split('&'); // ['cg_id=1', 'cg_type=op']

    var searchObj = {},
        tempArr;

    for (var i = 0, len = searchArr.length; i < len; i++) {
        tempArr = searchArr[i].split('='); // ['cg_id', 1]    ['cg_type', 'op']

        searchObj[tempArr[0]] = tempArr[1]; // { cg_id:1, cg_type: 'op' }

    }
    // 传了key返回指定的值，没传返回解析好的整个对象
    return key ? searchObj[key] : searchObj;
}
//通过上面封装的方法获取地址中的字符串id
var productid = getSearch('productid')

$.ajax({
    url: 'http://139.199.192.48:9090/api/getdiscountproduct',
    type: 'get',
    data: 'productid=' + productid,
    success: function(data) {
        var html = template('discount-edit-tpl', data.result[0])
        $('#product-edit').html(html)
    }
})