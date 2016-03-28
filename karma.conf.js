var bower = require('main-bower-files');

module.exports = function (config) {
  config.set({
    basePath: './',

    frameworks: ['jasmine'],

    files: bower('**/*.js', {
        includeDev: true
    }).concat([
      'src/*.mdl.js',
      'src/*.js',
      'test/*.spec.js'
    ]),

    preprocessors: {},

    reporters: ['progress'],

    port: 9876,

    browsers: ['Chrome']
  });
};
