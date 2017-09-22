
//获取数据渲染标题列表
$.get('http://139.199.192.48:9090/api/getbaicaijiatitle', function (data) {
    var html = template('bcj-title-tpl', data.result);
    $('.bcj-tab').html(html);
    //默认选中第二个标题  在渲染数据里面写，写在外面是获取不到该元素
    $('.bcj-tab li:nth-child(2)').addClass('active');

});
    //标题tab栏实现左右滑动
    var myscroll=new IScroll('#wrapper',{
        scrollX: true,
        scrollY: false,
        hScrollbar:false,
        vScrollar : false,
        vScroll:false
    });

//拿到数据先渲染一遍
$.get('http://139.199.192.48:9090/api/getbaicaijiaproduct', {titleid:1}, function (data) {
    var html = template('bcj-list-tpl', data.result);
    $('.bcj-list').html(html);
});

var ul = document.querySelector('.bcj-tab');
var lis = ul.children;
$(document).on('click', '.tab-item', function () {
    //tab切换
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = 'tab-item';
    }
    this.className = 'tab-item active';

    var data = {
        titleid: $(this).attr('data-id')
    };
    //console.log(data);
    $.get('http://139.199.192.48:9090/api/getbaicaijiaproduct', data, function (data) {
        var html = template('bcj-list-tpl', data.result);
        $('.bcj-list').html(html);
    });
});

//底部点击按钮跳回至顶部

$('.totop').onclick="javascript:scroll(0,0)";

$('.btntop').onclick="javascript:scroll(0,0)";


