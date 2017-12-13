"use strict";

require("./patchPreact");

var _preactRenderToString = require("preact-render-to-string");

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _preact = require("preact");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */

var http2 = require("http2");
var fs = require("fs");

var register = require("babel-register");
var path = require("path");
var Koa = require("koa");
var koaStatic = require("koa-static");
var Router = require("koa-router");
var compress = require("koa-compress");

var app = new Koa();
var router = new Router();

var viewpath = path.join(__dirname, "../src");

app.use(koaStatic("./public/"));

app.use(compress({
  filter: function filter(content_type) {
    console.log(content_type);
    return (/text/i.test(content_type)
    );
  },
  threshold: 2048,
  flush: require("zlib").Z_SYNC_FLUSH
}));

// Register live babel transpiling
register({
  presets: ["es2015", "react"],
  extensions: [".jsx"],
  plugins: [["transform-react-jsx", { pragma: "h" }]],
  only: /src/
});

// Import all the pages automatically and create the routes
// import the common chunk also from here
var Page01 = require("../src/Page01.jsx").default;
var Page02 = require("../src/Page02.jsx").default;

// on a particular route, we have to build it and provide some diffing
// add preact everywhere on the commons bundle...

// Things to consider in the build:
// Navigate all the pages entry points and build the SSR version
// Create all the JS entry points and create the bundles per entry point
// maybe create ustyle critical css https://github.com/addyosmani/critical
// https://github.com/nrwl/webpack-plugin-critical

router.get("/page01", function (ctx, next) {
  var preloadedState = { msg: "Message coming from preloaded stuff" };
  var content = (0, _preactRenderToString2.default)((0, _preact.h)(Page01, preloadedState));
  ctx.body = "<!DOCTYPE html><html>\n  <head>\n    <link rel=\"manifest\" href=\"manifest.json\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"application-name\" content=\"localhost\">\n    <meta name=\"apple-mobile-web-app-title\" content=\"localhost\">\n    <meta name=\"msapplication-starturl\" content=\"/\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">    \n  <head/>\n  <body>\n    <div id=\"app\">\n      " + content + "\n    </div>\n    <script src=\"./commons.js\"></script>\n    <script>\n    window.__PRELOADED_STATE__ = " + JSON.stringify(preloadedState).replace(/</g, '\\x3c') + "\n    </script>    \n    <script src=\"./page01.js\"></script>\n  </body>\n  </html>";
});

router.get("/page02", function (ctx, next) {
  var content = (0, _preactRenderToString2.default)((0, _preact.h)(Page02, { myprop: "Hello world in page 02" }));
  ctx.body = "<!DOCTYPE html><html>\n  <head>\n    <link rel=\"manifest\" href=\"manifest.json\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"application-name\" content=\"localhost\">\n    <meta name=\"apple-mobile-web-app-title\" content=\"localhost\">\n    <meta name=\"msapplication-starturl\" content=\"/\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">    \n  <head/>\n  <body>\n    <div id=\"app\">\n      " + content + "\n    </div>\n    <script src=\"./commons.js\"></script>\n    <script src=\"./page02.js\"></script>\n  </body>\n  </html>";
});

app.use(router.routes()).use(router.allowedMethods());

// app.listen(5000);

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// TODO get react into the client too!
// const client = http2.connect("http://localhost");
http2.createSecureServer(options, app.callback()).listen(5000);
console.log("Listening 5000");
