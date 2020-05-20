import { src, dest, watch, series, parallel } from 'gulp';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var concat = require('gulp-concat');
const touch = require('gulp-touch-fd');
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
const PRODUCTION = yargs.argv.prod;

export const styles = () => {
	return src('source/dev/stylesheets/style.scss')
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(PRODUCTION, postcss([ autoprefixer, cssnano ])))
		// .pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(dest('source/stylesheets'))
		.pipe(touch());
}

export const scripts = () => {
	return src('source/dev/js/app.js')
	.pipe(gulpif(PRODUCTION, webpack(require('./webpack.prod.js'))))
	.pipe(gulpif(!PRODUCTION, webpack(require('./webpack.dev.js'))))
	.pipe(dest('source/javascripts'));
}


export const watchForChanges = () => {
	watch('source/dev/stylesheets/**/*.scss', styles);
	watch('source/dev/js/**/*.js', series(scripts, reload));
}

export const serve = done => {
	done();
};

export const reload = done => {
	done();
};

export const clean = () => del(['dist']);
export const dev = series(clean, parallel(styles, scripts), serve ,watchForChanges)
export const build = series(clean, parallel(styles, scripts))

export default dev;