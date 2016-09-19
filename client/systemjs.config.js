/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var components = [
    'all',
    'button',
    'card',
    'checkbox',
    'dialog',
    'grid-list',
    'icon',
    'input',
    'list',
    'menu',
    'progress-bar',
    'progress-circle',
    'radio',
    'sidenav',
    'slider',
    'slide-toggle',
    'button-toggle',
    'tabs',
    'toolbar',
    'tooltip',
  ];
  /** User packages configuration. */
  var packages = {
    '@angular2-material/core': {
      main: './core.umd.js',
      defaultExtension: 'js'
    },
    // Set the default extension for the root package, because otherwise the demo-app can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    },
    app: {
      main: './main.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: './index.js',
      defaultExtension: 'js'
    },
    'sails.io.js': {
      main: './sails.io.js',
      defaultExtension: 'js'
    },
    'socket.io-client': {
      main: './socket.io.js',
      defaultExtension: 'js'
    },
    'ng2-material': {
      main: './index.js',
      defaultExtension: 'js'
    }
  };
  components.forEach(function (name) {
    packages[("@angular2-material/" + name)] = {
      format: 'cjs',
      main: name + ".umd.js"
    };
  });

  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular2-material': 'npm:@angular2-material',

      // other libraries
      'rxjs': 'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:client-in-memory-web-api',
      'sails.io.js': 'npm:sails.io.js',
      'socket.io-client': 'npm:socket.io-client'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: packages
  });
})(this);
