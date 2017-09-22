$(function() {

    init();
    var Data = {};

    function init() {
        getdiscount()
    }


    function getdiscount() {
        $.get("http://139.199.192.48:9090/api/getinlanddiscount", function(res) {
            Data = res;
            render();
        })

        function render() {
            //总的数量
            var total = 40;
            //已经加载的li标签个数
            var liLength = $('discount-add ul li').length;
            if (liLength >= total) {
                return;
            }
            var Newres = { result: [] };

            var length = 6;
            if (Data.result.length <= 6) {
                length = Data.result.length;
            }
            for (var i = 0; i < length; i++) {
                Newres.result.push(Data.result.shift());
            }
            var html = template('discount-tpl', Newres);
            $('#discount-add ul').append(html)
        }

        window.onscroll = function() {
            var height = $('#discount-add ul').height() - $(document.body).height();
            console.log(height)
            var distancebottom = height - $(document.body).scrollTop();
            console.log(distancebottom)
            if (distancebottom < -300) {
                render();
            }
        }
    }
})