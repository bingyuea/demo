var gulp = require('gulp');
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    // minifyImage = require("gulp-imagemin"),
    // pngquant = require('minifyImage-pngquant'), //png图片压缩插件
    rename = require("gulp-rename"),
    concat = require("gulp-concat");
    
gulp.task('serve', function() {
    browserSync.init({
        server: '../flexbileTemplet'
    });
    gulp.watch("dist/css/*.scss", ['sass']).on('change', reload);
    // gulp.watch("lib/**.js", ['miniJs']).on('change', reload);
    gulp.watch("dist/templet/*.html", ['miniHtml']).on('change', reload);
});
// js
/*gulp.task('miniJs', function () {
    gulp.src('dist/lib/!**.js')  //要合并的文件
    .pipe(concat('script.js'))  // 合并匹配到的js文件并命名为
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream: true}));
});*/

// html
gulp.task('miniHtml', function () {
    return gulp.src('dist/templet/*.html') // 要压缩的html文件
    .pipe(gulp.dest('build/tep'))
    .pipe(reload({stream: true}));
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src('dist/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'], // 主流浏览器的最新两个版本
            cascade: false // 是否美化属性值
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest("build/css"))
        .pipe(reload({stream: true}));
});
// img
// gulp.task('miniImage', function () {
//     return gulp.src('dist/img/*')
//         .pipe(minifyImage({
//             progressive: true,
//             use: [pngquant()] //使用pngquant来压缩png图片
//         }))
//         .pipe(gulp.dest('build/img'));
// });

gulp.task('default', ['serve']);
