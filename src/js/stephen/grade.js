console.log(location.search);

$.get('http://139.199.192.48:9090/api/getproductcom?productid=102', function(data) {
    console.log(data)
    $('.mm_grade').append(template('mm_grade_tpl', data.result[0]))
});