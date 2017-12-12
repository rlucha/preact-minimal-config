'use strict';

require('./patchPreact');

var _preactRenderToString = require('preact-render-to-string');

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _preact = require('preact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */

var register = require('babel-register');
var path = require('path');
var Koa = require('koa');
var koaStatic = require('koa-static');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

var viewpath = path.join(__dirname, '../src');

app.use(koaStatic('./public/'));

// Register live babel transpiling
register({
  presets: ['es2015', 'react'],
  extensions: ['.jsx'],
  plugins: [["transform-react-jsx", { "pragma": "h" }]],
  only: /src/
});

var Page = require('../src/Page.jsx').default;

// on a particular route, we have to build it and provide some diffing
// add preact everywhere on the commons bundle...

router.get('/', function (ctx, next) {
  var content = (0, _preactRenderToString2.default)((0, _preact.h)(Page, { myprop: "Hello world" }));
  ctx.body = '<!DOCTYPE html><html>\n  <head>\n    \n  <head/>\n  <body>\n    <div id="app">\n      ' + content + '\n    </div>\n\n    <script src="./page.js"></script>\n  </body>\n  </html>';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000);
console.log('Listening 5000');

// TODO get react into the client too!
