$.get('http://139.199.192.48:9090/api/getsitenav', function(data) {
    console.log(data)
    $('.mm_mall_nav').append(template('mall_nav_tpl', data.result))
});