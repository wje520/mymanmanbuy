/**
 * Created by Administrator on 2017/9/8.
 */
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var cleanCss = require("gulp-clean-css");
var less = require("gulp-less");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var replace = require("gulp-html-replace");


gulp.task("html", function() {

    gulp.src(["index.html", "src/**/*.html"])
        .pipe(replace({
            //course_aside:gulp.src("src/html/common/course/aside.html")
            //参考上面结构，写HTML公共结构
            //凤文
            lv_csslink:gulp.src("src/html/BiLiAndHaiTao/commend/csslink.html"),
            lv_header:gulp.src("src/html/BiLiAndHaiTao/commend/header.html"),
            lv_search:gulp.src("src/html/BiLiAndHaiTao/commend/search.html"),
            lv_footer:gulp.src("src/html/BiLiAndHaiTao/commend/footer.html"),
            //小迪
            style: gulp.src("src/html/AKA-Xiaodi/common/style.html")
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest("dist"))
});


gulp.task("css", function() {
    gulp.src("src/**/*.less")
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/css"));
});

var arr = [
    "node_modules/art-template/lib/template-web.js",
    "node_modules/jquery/dist/jquery.js",
    "node_modules/bootstrap/dist/js/bootstrap.js",
    "node_modules/jquery-form/dist/jquery.form.min.js",
    "node_modules/jquery.cookie/jquery.cookie.js",
    "node_modules/nprogress/nprogress.js"
];

//保证JQ在最上面引用

gulp.task("js", function() {
    gulp.src(arr)
        .pipe(concat("del.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
});


var myjsList = [
    //"src/js/index.js",
    //
    //"src/js/user/login.js",
    //"src/js/user/profile.js",
    //"src/js/user/repass.js",
    //
    //"src/js/teacher/add.js",
    //"src/js/teacher/edit.js",
    //"src/js/teacher/list.js",
    //
    //"src/js/course/add.js",
    //"src/js/course/list.js",
    //"src/js/course/course_edit_step1.js",
    //"src/js/course/course_edit_step2.js",
    //"src/js/course/course_edit_step3.js",
    //
    //"src/js/category/add.js",
    //"src/js/category/edit.js",
    //"src/js/category/list.js"
    //参考上面结构，写自己的模块路径。
    //凤文
    "src/js/BiLiAndHaiTao/bili.js",
    "src/js/BiLiAndHaiTao/productlist.js",
    "src/js/BiLiAndHaiTao/product.js",
    //阿迪
    'src/js/AKA-Xiaodi/main-part.js',
    'src/js/AKA-Xiaodi/main-edit.js',
    'src/js/AKA-Xiaodi/discount.js',
    'src/js/AKA-Xiaodi/discount-edit.js',
    //斯蒂芬
    "src/js/stephen/brand_product.js",
    "src/js/stephen/discount.js",
    "src/js/stephen/discount_nav.js",
    "src/js/stephen/tenbrand.js",
    "src/js/stephen/grade.js",
    //爱发
    "src/js/index.js",
    "src/js/page-fa/mall_nav.js",
    //家娥
    "src/js/wje/iscroll.js",
    "src/js/wje/bcj.js",
    "src/js/wje/coudanlist.js"
    
];

gulp.task("myjs", function() {
    myjsList.forEach(function(value) {
        var pathArr = value.split("/");
        var htmlName = pathArr.pop();
        pathArr.shift();
        browserify(value, { debug: true }).bundle()
            .pipe(source(htmlName)) // 把结果转换为Stream的vinyl对象，还需进一步转换为Buffer的vinyl对象
            .pipe(buffer()) // 转换后与gulp的src方法返回类型一致，这样就可以继续调用gulp方法与gulp插件了
            .pipe(gulp.dest('dist/' + pathArr.join('/')));
    });
});

gulp.task("default", ["html", "css", "js", "myjs"], function() {
    gulp.watch(["index.html", "src/**/*.html"], function() {
        gulp.run("html");
    });
    gulp.watch("src/**/*.less", function() {
        gulp.run("css");
    });
    gulp.watch(myjsList, function() {
        gulp.run("myjs");
    });
    gulp.watch(arr, function() {
        gulp.run("js");
    });
});