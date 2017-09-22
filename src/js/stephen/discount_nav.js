function info(key) {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split('&');
    var searchObj = {},
        tempArr;
    for (var i = 0, len = searchArr.length; i < len; i++) {
        tempArr = searchArr[i].split('=');
        searchObj[tempArr[0]] = tempArr[1];
    }
    return key ? searchObj[key] : searchObj;
}
var id = info("id");

console.log(id)
    // $.get("http://139.199.192.48:9090/api/getcouponproduct", { couponid: id }, function(data) {
    //     console.log(data)
    //     $(".box").html(template("discount_nav_tpl", data.result))


// })


$.ajax({
    url: " http://139.199.192.48:9090/api/getcouponproduct",
    type: 'get',
    data: {
        couponid: id

    },
    success: function(data) {
        console.log(data);

        var htmlStr = template('discount_nav_tpl', data.result);
        $('.box').html(htmlStr)
    }
})