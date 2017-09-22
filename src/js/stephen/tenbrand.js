$.ajax({
    url: 'http://139.199.192.48:9090/api/getbrandtitle',
    type: 'get',
    success: function(data) {

        var htmlStr = template('tenbrand_tpl', data.result);
        $('#tenbrand').html(htmlStr)
    }
})