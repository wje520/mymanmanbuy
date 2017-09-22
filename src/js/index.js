/* 菜单栏模板数据 */
$.get('http://139.199.192.48:9090/api/getindexmenu', function(data) {
        /* 菜单模板栏图片路径 */
        var src = [
            '/public/img/ic_search.png',
            '/public/img/ic_cu.png',
            '/public/img/ic_coudanpin.png',
            '/public/img/ic_bcj.png',
            '/public/img/haitao.png',
            '/public/img/ic_temai.png',
            '/public/img/ic_trend.png',
            '/public/img/gengduo.png',
            '/public/img/ic_coudanpin.png',
            '/public/img/ic_kb.png',
            '/public/img/ic_mall.png',
            '/public/img/ic_pp.png'
        ]
        for (var i = 0; i < data.result.length; i++) {
            data.result[i].src = src[i];
        }
        /* 菜单模板栏对应跳转路径 */
         var links = [
             '/dist/html/BiLiAndHaiTao/bili.html',
             '/dist/html/AKA-Xiaodi/main-part.html',
             '/dist/html/AKA-Xiaodi/discount.html',
             '/dist/html/wje/bcj.html',
             '/dist/html/AKA-Xiaodi/main-part.html',
             '/dist/html/stephen/discount.html',
             'javascript:;',
             'javascript:;',
             '/dist/html/wje/coudanlist.html',
             'javascript:;',
             '/dist/html/page-fa/mall_nav.html',
             '/dist/html/stephen/tenbrand.html'
             
         ];
         for (var i = 0; i < data.result.length; i++) {
             data.result[i].links = links[i];
         }
        /* 菜单栏更多图标  开关 */
        $('.nav_item').html(template('mm_nav_tpl', data.result))
        $('.nav_item li:nth-child(8)').on('click', function() {
            $('.nav_item>li:nth-last-child(-n+4)').toggle();
        })
    })
    /* 折扣列表 */
$.get('http://139.199.192.48:9090/api/getmoneyctrl', function(data) {
    console.log(data);
    $('.items_center ul').append(template('main_tpl', data.result));
});