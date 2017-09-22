

$('#cd-shop').on('click',function(){
  
    if($(this).find('span').hasClass('glyphicon-triangle-bottom')){
        $(this).find('span').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
    }else {
        $(this).find('span').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
    }
    $('.popshop').fadeToggle();
    $('.poparea').hide();

});

$(document).on('click','#cd-area',function(){

    if($(this).find('span').hasClass('glyphicon-triangle-bottom')){
        $(this).find('span').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
    }else {
        $(this).find('span').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
    }
    $('.popshop').hide();
    $('.poparea').fadeToggle();

});


$.get('http://139.199.192.48:9090/api/getgsshop',function(data){
    var html=template('shop-tpl',data.result);
    $('.popshop').html(html);
  
    $('.popshop li:nth-child(1) i').show();

});


$.get('http://139.199.192.48:9090/api/getgsshoparea',function(data){
    var html=template('area-tpl',data.result);
    $('.poparea').html(html);
 
    $('.poparea li:nth-child(1) i').show();
});


$.get('http://139.199.192.48:9090/api/getgsproduct',{shopid:1,areaid:1},function(data){

    var html=template('cd-list-tpl',data.result);
    $('.bd').html(html);
});

$(document).on('click','.popshop li',function(){

    $('.popshop li i').hide();
    $(this).children(1).show();

    var data={
        shopid:$(this).attr('data-id'),   
        areaid:$(this).attr('data-id')
    }
    $.get('http://139.199.192.48:9090/api/getgsproduct',data,function(data){
        var html=template('cd-list-tpl',data.result);
        $('.bd').html(html);
    });
});

$(document).on('click','.poparea li',function(data){
   
    $('.poparea li i').hide();
    $(this).children(1).show();

    var data={
        shopid:$(this).attr('data-id'),  
        areaid:$(this).attr('data-id')
    }
    $.get('http://139.199.192.48:9090/api/getgsproduct',data,function(data){
        var html=template('cd-list-tpl',data.result);
        $('.bd').html(html);
    });
});