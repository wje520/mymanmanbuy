/**
 * Created by Administrator on 2017/9/16.
 */
$.ajax({
    url:"http://139.199.192.48:9090/api/getcategorytitle",
    type:"get",
    success:function(data){
        $(".brief").html(template("getcategorytitle",data.result));
        $(".drow").on("click",function(){
            var titleid = $(this.children[0]).attr("data-indexmunuld");
            getcategoryData(titleid);
        });
    }
});

function getcategoryData(titleid){
    $.ajax({
        url:'http://139.199.192.48:9090/api/getcategory',
        type:"get",
        data:"titleid="+titleid,
        success:function(data){
            //排他
            $(".title").each(function(){
                $(this).attr("style","display:none");
            });
            $(".titleId_"+titleid).html(template("getcategory",data.result)).stop().slideDown();
        }
    });
}

