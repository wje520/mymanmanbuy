
//��ȡ�ڼ�������Ʒ
var categoryid = location.search;
categoryid = categoryid.slice(1);
categoryid = categoryid.split('=')[1];

//Ĭ�ϵ�һҳ
var nowpage = 1;
//��ȡˢ�µڼ�ҳpage
function getpage(){
    //��ȡĿ��page
    var page = null;
    if($(this).attr("id")=="selectpage"){
        page = $(this).val();
    }else if($(this).attr("id")=="lastpage"){
        page = $(this).attr("data-page");
    }else if($(this).attr("id")=="nextpage"){
        page = $(this).attr("data-page");
    }
    //��ȡĿ��ҳ������
    $.ajax({
        url:'http://139.199.192.48:9090/api/getproductlist',
        type:'get',
        data:'categoryid='+categoryid+'&pageid='+page,
        success:function(data){
            //��Ⱦ����Ч��
            $(".product-list").html(template("product-list",data.result));
            //���µ�ǰҳ��ģ��
            var maxpage = Math.ceil(data.totalCount/data.pagesize);
            data.maxpage = maxpage;
            data.nowpage = page;
            $(".page").html(template("page-tpl",data));
            //���°��¼�
            $("#lastpage").on("click",getpage);
            $("#selectpage").on("change",getpage);
            $("#nextpage").on("click",getpage);
        }
    });
}


$.ajax({
    url:'http://139.199.192.48:9090/api/getproductlist',
    type:'get',
    data:'categoryid='+categoryid+'&pageid='+1,
    success:function(data){
        $(".product-list").html(template("product-list",data.result));
        //����ҳ��
        var maxpage = Math.ceil(data.totalCount/data.pagesize);
        data.maxpage = maxpage;
        data.nowpage = parseInt(nowpage);
        $(".page").html(template("page-tpl",data));
        //���õڼ�ҳnowpage
        $("#lastpage").on("click",getpage);
        $("#selectpage").on("change",getpage);
        $("#nextpage").on("click",getpage);
    }
});


//���õ�����
$.ajax({
    url:'http://139.199.192.48:9090/api/getcategorybyid',
    type:'get',
    data:'categoryid='+categoryid,
    success:function(data){
        $(".nav").html(template("nav",data.result[0]));
    }
});