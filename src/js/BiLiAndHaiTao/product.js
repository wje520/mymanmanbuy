/**
 * Created by Administrator on 2017/9/17.
 */


//��ȡ�ڼ�������Ʒ
var productid = location.search;
productid = productid.slice(1);
productid = productid.split('=')[1]



$.ajax({
    url:'http://139.199.192.48:9090/api/getproduct',
    type:'get',
    data:'productid='+productid,
    success:function(data){
        //�ڼ�����Ʒ
        var categoryid = data.result[0].categoryId;
        //������Ʒ�ڼ�����Ʒ
        var productId = data.result[0].productId;
        var category = null;
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getcategorybyid',
            type: 'get',
            data: 'categoryid=' + categoryid,
            success:function(data){
                category = data.result[0].category;

                $.ajax({
                    url:'http://139.199.192.48:9090/api/getproductlist',
                    type:'get',
                    data:'categoryid='+categoryid+'&pageid='+1,
                    success:function(data){
                        for(var i=0;i<data.result.length;i++){
                            if(data.result[i].productId==productId){
                                var item = data.result[i];
                                item.category = category;
                            }
                        }
                        $(".nav").html(template("nav",item));
                    }
                })
            }
        });

    }
});


$.ajax({
    url:'http://139.199.192.48:9090/api/getproduct',
    type:'get',
    data:'productid='+productid,
    success:function(data){
        $(".show").html(template("show",data.result[0]));
    }
});


$.ajax({
   url:'http://139.199.192.48:9090/api/getproductcom',
    type:'get',
    data:'productid='+productid,
    success:function(data){
        $(".pinglun").append(template("pinglun-tpl",data.result));
    }
});

