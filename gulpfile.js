import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import minify from 'gulp-minify';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';
import ghPages from 'gulp-gh-pages';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



gulp.task('less', function () {
    return gulp.src('src/styles/style.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/script.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('library1', function () {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('library2', function () {
    return gulp.src('src/js/jquery-ui.min.js')
        .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('library3', function () {
    return gulp.src('src/js/parallax.min.js')
        .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('library4', function () {
    return gulp.src('src/js/slick.min.js')
        .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('library5', function () {
    return gulp.src('src/js/wow.min.js')
        .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('images', function () {
    return gulp.src('public/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images/'));
});

gulp.task('fonts', function () {
    return gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('dist/public/fonts/'));
});

gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
    gulp.watch('src/js/*.js', gulp.series('js'));
    gulp.watch('index.html', gulp.series('html'));
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('srcData', gulp.series('less', 'js', 'html', 'library1', 'library2', 'library3', 'library4', 'library5'));

gulp.task('staticData', gulp.series('images', 'fonts'));

gulp.task('default', gulp.series('srcData', 'staticData', 'watch'));