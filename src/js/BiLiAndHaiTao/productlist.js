
//获取第几分类商品
var categoryid = location.search;
categoryid = categoryid.slice(1);
categoryid = categoryid.split('=')[1];

//默认第一页
var nowpage = 1;
//获取刷新第几页page
function getpage(){
    //获取目标page
    var page = null;
    if($(this).attr("id")=="selectpage"){
        page = $(this).val();
    }else if($(this).attr("id")=="lastpage"){
        page = $(this).attr("data-page");
    }else if($(this).attr("id")=="nextpage"){
        page = $(this).attr("data-page");
    }
    //获取目标页面数据
    $.ajax({
        url:'http://139.199.192.48:9090/api/getproductlist',
        type:'get',
        data:'categoryid='+categoryid+'&pageid='+page,
        success:function(data){
            //渲染出来效果
            $(".product-list").html(template("product-list",data.result));
            //更新当前页给模板
            var maxpage = Math.ceil(data.totalCount/data.pagesize);
            data.maxpage = maxpage;
            data.nowpage = page;
            $(".page").html(template("page-tpl",data));
            //重新绑定事件
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
        //设置页数
        var maxpage = Math.ceil(data.totalCount/data.pagesize);
        data.maxpage = maxpage;
        data.nowpage = parseInt(nowpage);
        $(".page").html(template("page-tpl",data));
        //设置第几页nowpage
        $("#lastpage").on("click",getpage);
        $("#selectpage").on("change",getpage);
        $("#nextpage").on("click",getpage);
    }
});


//设置导航条
$.ajax({
    url:'http://139.199.192.48:9090/api/getcategorybyid',
    type:'get',
    data:'categoryid='+categoryid,
    success:function(data){
        $(".nav").html(template("nav",data.result[0]));
    }
});