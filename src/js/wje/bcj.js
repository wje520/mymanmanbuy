
//��ȡ������Ⱦ�����б�
$.get('http://139.199.192.48:9090/api/getbaicaijiatitle', function (data) {
    var html = template('bcj-title-tpl', data.result);
    $('.bcj-tab').html(html);
    //Ĭ��ѡ�еڶ�������  ����Ⱦ��������д��д�������ǻ�ȡ������Ԫ��
    $('.bcj-tab li:nth-child(2)').addClass('active');

});
    //����tab��ʵ�����һ���
    var myscroll=new IScroll('#wrapper',{
        scrollX: true,
        scrollY: false,
        hScrollbar:false,
        vScrollar : false,
        vScroll:false
    });

//�õ���������Ⱦһ��
$.get('http://139.199.192.48:9090/api/getbaicaijiaproduct', {titleid:1}, function (data) {
    var html = template('bcj-list-tpl', data.result);
    $('.bcj-list').html(html);
});

var ul = document.querySelector('.bcj-tab');
var lis = ul.children;
$(document).on('click', '.tab-item', function () {
    //tab�л�
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

//�ײ������ť����������

$('.totop').onclick="javascript:scroll(0,0)";

$('.btntop').onclick="javascript:scroll(0,0)";


