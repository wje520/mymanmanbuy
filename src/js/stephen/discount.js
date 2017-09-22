$.ajax({
    url: 'http://139.199.192.48:9090/api/getcoupon',
    type: 'get',
    success: function(data) {

        var htmlStr = template('discount_tpl', data.result);
        $('#discount_nav').html(htmlStr)
    }
})