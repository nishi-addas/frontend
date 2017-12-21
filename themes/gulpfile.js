// Gulp.js configuration
var gulp    = require('gulp'),
    postcss = require('gulp-postcss'),
    sftp    = require('gulp-sftp');

// apply PostCSS plugins
gulp.task('css', function() {
    return gulp.src('./src/base.css')
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-custom-properties'), //変数
            require('postcss-custom-selectors'), //変数
            require('postcss-sassy-mixins'), //Mixin
            require('postcss-advanced-variables'), // $varによる変数宣言と、条件式(@eachや@for)を変換
            require('postcss-conditionals'), // @if文
            require('postcss-nested'), //ネスト
            require('postcss-custom-media'), //メディアクエリ
            require('postcss-calc'), //calc関数
            require('postcss-selector-not'), //「:not」
            require('postcss-flexbugs-fixes'), //flexプロパティのバグ
            require('postcss-selector-matches'), //「:matches」
            require('postcss-color-function'), //色の関数
            require('postcss-sorting'), //プロパティのソート
            // require('postcss-sort-style-rules'), //セレクタのソート
            require('css-mqpacker')({ sort: true }), //メディアクエリをひとまとめに
            require('autoprefixer')({ browsers: ['last 2 versions'] }), //ベンダープレフィックス
            require('cssnano') //minifyする
        ]))
        .pipe(gulp.dest('./addas/css/'));
});
gulp.task('up', function() {
    return gulp.src('./addas/css/base.css')
        .pipe(sftp({
            "host": "addas.sakura.ne.jp",
            "port": 22,
            "user": "addas",
            "pass": "4ywst3fy57",
            "remotePath": "/home/addas/www/template/wp-content/themes/addas/css/"
        }));
});