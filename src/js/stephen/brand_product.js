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
var data = {
    brandtitleid: id,
}

$.get("http://139.199.192.48:9090/api/getbrand", data, function(data) {
    // console.log(data)
    $(".brand_product_menu").html(template("brand_product_tpl", data.result))


})

$.get("http://139.199.192.48:9090/api/getbrand", data, function(data) {
    // console.log(data)
    $(".brand_box").html(template("brand_compare_tpl", data.result))
})




var getFristImg;
var getFritsId; //用于获取排名第一的产品id；
var getTitle; //用于获取排名第一的产品名称
$.get("http://139.199.192.48:9090/api/getbrandproductlist", { brandtitleid: id, pagesize: 4 }, function(data) {
    // console.log(data)


    if (data.result != 0) {
        getFritsId = data.result[0].productId;
        getFristImg = data.result[0].productImg;
        getTitle = data.result[0].productName;
        $(".brand_box2").html(template("brand_product_introduct_tpl", data.result))
            // 获取评价排行
        var protitData = {
            productid: getFritsId,
        }


        $.get("http://139.199.192.48:9090/api/getproductcom", protitData, function(data) {
            console.log(data)
                // 缺少图片传入排名第一的图片
                // 缺少产品名称传入排名第一的产品名称
            data.result.forEach(function(value) {
                value.productImg = getFristImg;
                value.productName = getTitle;
            });
            $(".brand_box3").html(template("brand_comment_content_tpl", data.result))
        })

    }
})

















// $.ajax({
//     url: " http://139.199.192.48:9090/api/getbrand",
//     type: 'get',
//     data: {
//         brandtitleid: id

//     },
//     success: function(data) {
//         console.log(data);

//         var htmlStr = template('brand_product_tpl', data.result);
//         $('.box').html(htmlStr)
//     }
// })