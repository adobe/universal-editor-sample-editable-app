// bundles all the JS and CSS files in the static build folder into the main index.html file

const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');

gulp.task('default', () => {
    return gulp
        .src('./build/*.html')
        .pipe(replace('.js"></script>', '.js" inline></script>'))
        .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
        .pipe(
            inlinesource({
                compress: false,
                ignore: ['png'],
            })
        )
        .pipe(gulp.dest('./build'));
});