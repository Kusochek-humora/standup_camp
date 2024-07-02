
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import csso from 'gulp-csso';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import prefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import rigger from 'gulp-rigger';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import ssi from 'gulp-ssi';
import sync from 'browser-sync';
import uglify from 'gulp-uglify';

// Html

export const buildHtml = () => {
	return gulp.src([
		'src/**/*.html'
	])
		.pipe(plumber())
		.pipe(ssi({ root: './src' }))
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream());
};

// Scripts

export const buildJs = (done) => {
	gulp.src([
		'src/js/vendor/*.js',
		'node_modules/swiper/swiper-bundle.js',
		'node_modules/mixitup/dist/mixitup.min.js',
		'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
		'node_modules/vanilla-masker/build/vanilla-masker.min.js',
		// 'node_modules/cleave.js/dist/cleave.min.js',
		// 'node_modules/cleave.js/dist/addons/cleave-phone.kz.js',

	])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(sync.stream());

	gulp.src('src/js/main.js')
		.pipe(plumber())
		.pipe(rigger())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(sync.stream());

	done();
};

// Styles

export const buildCss = (done) => {
	gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/swiper/swiper-bundle.css',

	])
		.pipe(prefixer())
		.pipe(csso())
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(sync.stream());

	gulp.src('src/scss/main.scss')
		.pipe(plumber())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(replace('(/images/', '(../images/'))
		.pipe(prefixer())
		.pipe(csso())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css'))
		.pipe(sync.stream());

	done();
};

//Fonts

export const buildFont = () => {
	return gulp.src('src/fonts/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/fonts'))
		.pipe(sync.stream({
			once: true
		}));
};

//Images

export const buildImage = (done) => {
	gulp.src('src/images/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/images'))
	// .pipe(sync.stream());

	done();
};

// Paths

export const fixPath = () => {
	const buildVersion = Date.now();

	return gulp.src('dist/*.html')
		.pipe(plumber())
		.pipe(replace('="/', '="'))
		.pipe(replace('"\\/img', '"img'))
		.pipe(replace('.js">', '.js?=' + buildVersion + '">'))
		.pipe(replace('.css">', '.css?=' + buildVersion + '">'))
		.pipe(gulp.dest('dist'));
};

// All

export const buildAll = gulp.series(
	gulp.parallel(
		buildHtml,
		buildJs,
		buildCss,
		buildFont,
		buildImage
	),
	fixPath
);

// Server

export const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'dist'
		}
	});
};

// Watch

export const watch = () => {
	gulp.watch('src/**/*.html', gulp.series(buildHtml, fixPath));
	gulp.watch('src/scss/*.scss', gulp.series(buildCss));
	gulp.watch('src/js/**/*.js', gulp.series(buildJs));
	gulp.watch('src/fonts/**/*', gulp.series(buildFont));
	gulp.watch('src/images/**/*', gulp.series(buildImage));
};

// Dev

// noinspection JSUnusedGlobalSymbols
export const dev = gulp.series(
	buildAll,
	gulp.parallel(
		watch,
		server,
	),
);

// Default

// noinspection JSUnusedGlobalSymbols
export default gulp.series(
	buildAll
);
