function getSearch(key) { // '?cg_id=1&cg_type=op'

    var searchStr = location.search.slice(1); // 'cg_id=1&cg_type=op'

    var searchArr = searchStr.split('&'); // ['cg_id=1', 'cg_type=op']

    var searchObj = {},
        tempArr;

    for (var i = 0, len = searchArr.length; i < len; i++) {
        tempArr = searchArr[i].split('='); // ['cg_id', 1]    ['cg_type', 'op']

        searchObj[tempArr[0]] = tempArr[1]; // { cg_id:1, cg_type: 'op' }

    }
    // 传了key返回指定的值，没传返回解析好的整个对象

    return key ? searchObj[key] : searchObj;
}

function getNum(str) {
    // console.dir(/\d+/.exec(str));
    if (!str || str.length == 0) {
        return "";
    } else {
        var ret = /\d+/.exec(str);
        if (!ret) {
            return "";
        }
        return parseInt(/\d+/.exec(str)[0]);
    }
}


// $.ajax({
//     url: 'http://139.199.192.48:9090/api/getmoneyctrl',
//     type: 'get',
//     data: 'pageid=' + 1,
//     success: function(data) {

//     }
// })

$(function() {
    init();


    function init() {
        Page();
    }


    function Page() {
        /* 解析url中的id */
        /* 商品列表模版 */
        var pageid = getSearch('pageid');
        $.get('http://139.199.192.48:9090/api/getmoneyctrl', function(data) {
            //商品列表渲染
            var html = template('main-part-tpl', data.result);
            $('#getmoneyctrl').html(html);
            //总个数除以每页的个数. 使用向上取整 得到最大页数
            var pageTotal = Math.ceil(data.totalCount / data.pagesize);
            // console.log(pageTotal)
            data.pageTotal = pageTotal;
            //当前页数设置为1
            data.nowpage = 1;
            //select下拉渲染
            var html = template('main-select-tpl', data);
            $('.xd_page').html(html);

            getpage(pageTotal);

        })
    }
})



function getpage(pageTotal) {

    $('#xd-select').on('change', function() {
        var page = $("#xd-select").val();
        console.log(page)
        $.get('http://139.199.192.48:9090/api/getmoneyctrl?pageid=' + page, function(data) {
            var html = template('main-part-tpl', data.result);
            $('#getmoneyctrl').html(html)
            data.pageTotal = pageTotal;
            //当前页数设置为page
            data.nowpage = page;
            //select下拉渲染
            var html = template('main-select-tpl', data);
            $('.xd_page').html(html);
            getpage(pageTotal);
        })
    })


    //点击下一页动态渲染第二页的值.
    $('.xd-page-down').on('click', function() {
        var nextpage = $('.xd-page-down').attr('data-page')
        console.log(nextpage)
        $.get('http://139.199.192.48:9090/api/getmoneyctrl?pageid=' + nextpage, function(data) {
                var html = template('main-part-tpl', data.result);
                $('#getmoneyctrl').html(html)

                data.pageTotal = pageTotal;
                //当前页数设置为1
                data.nowpage = nextpage;

                //select下拉渲染
                console.log(data);
                var html = template('main-select-tpl', data);
                $('.xd_page').html(html);
                getpage(pageTotal);
            })
            // var index = getNum($('#getmoneyctrl').html())
            // window.location.href = location.pathname + "?pageid=" + index;
    })
    $('.xd-page-up').on('click', function() {
        var nextpage = $('.xd-page-up').attr('data-page')
        console.log(nextpage)
        $.get('http://139.199.192.48:9090/api/getmoneyctrl?pageid=' + nextpage, function(data) {
                var html = template('main-part-tpl', data.result);
                $('#getmoneyctrl').html(html)

                data.pageTotal = pageTotal;
                //当前页数设置为1
                data.nowpage = nextpage;

                //select下拉渲染
                console.log(data);
                var html = template('main-select-tpl', data);
                $('.xd_page').html(html);
                getpage(pageTotal);
            })
            // var index = getNum($('#getmoneyctrl').html())
            // window.location.href = location.pathname + "?pageid=" + index;
    })
}