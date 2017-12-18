"use strict";

require("./patchPreact");

var _preactRenderToString = require("preact-render-to-string");

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _preact = require("preact");

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _http = require("http2");

var _http2 = _interopRequireDefault(_http);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _babelRegister = require("babel-register");

var _babelRegister2 = _interopRequireDefault(_babelRegister);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaCompress = require("koa-compress");

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaServerPush = require("koa-server-push");

var _koaServerPush2 = _interopRequireDefault(_koaServerPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */

var app = new _koa2.default();
var router = new _koaRouter2.default();

var viewpath = _path2.default.join(__dirname, "../src");

app.use((0, _koaServerPush2.default)()); //Makes no difference so far Create proper manifest from webpack on each page?
app.use((0, _koaStatic2.default)("./public/"));

app.use((0, _koaCompress2.default)({
  filter: function filter(content_type) {
    return (/text/i.test(content_type)
    );
  },
  threshold: 2048,
  flush: require("zlib").Z_SYNC_FLUSH
}));

// Register live babel transpiling
(0, _babelRegister2.default)({
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

// Create all this routes dinamically from the site.json file
// Create a component that wraps all of them

router.get("/page01", async function (ctx, next) {
  // test this page fetching resolution, maybe create a minimal resolution entry point like in nextjs
  // change this for the USDA thing?
  var preloadedState = await (0, _nodeFetch2.default)("https://assets0.uswitch.com/s3/broadband-deals/tables/january_sales.json").then(function (res) {
    return res.json();
  });

  // TODO use the provider and store here
  // How to disable SSR? pass an ENV flag?
  var content = (0, _preactRenderToString2.default)((0, _preact.h)(Page01, preloadedState));
  ctx.body = "<!DOCTYPE html><html>\n  <head>\n    <link rel=\"manifest\" href=\"manifest.json\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"application-name\" content=\"localhost\">\n    <meta name=\"apple-mobile-web-app-title\" content=\"localhost\">\n    <meta name=\"msapplication-starturl\" content=\"/\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">    \n  <head/>\n  <body>\n    <div id=\"app\">\n      " + content + "\n    </div>\n    <script>\n    window.__PRELOADED_STATE__ = " + JSON.stringify(preloadedState).replace(/</g, "\\x3c") + "\n    </script>    \n    <script src=\"./commons.js\"></script>\n    <script src=\"./page01.js\"></script>\n  </body>\n  </html>";
});

router.get("/page02", function (ctx, next) {
  var content = (0, _preactRenderToString2.default)((0, _preact.h)(Page02, { myprop: "Hello world in page 02" }));
  ctx.body = "<!DOCTYPE html><html>\n  <head>\n    <link rel=\"manifest\" href=\"manifest.json\">\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"application-name\" content=\"localhost\">\n    <meta name=\"apple-mobile-web-app-title\" content=\"localhost\">\n    <meta name=\"msapplication-starturl\" content=\"/\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">    \n  <head/>\n  <body>\n    <div id=\"app\">\n      " + content + "\n    </div>\n    <script src=\"./commons.js\"></script>\n    <script src=\"./page02.js\"></script>\n  </body>\n  </html>";
});

app.use(router.routes()).use(router.allowedMethods());

// app.listen(5000);

var options = {
  key: _fs2.default.readFileSync("key.pem"),
  cert: _fs2.default.readFileSync("cert.pem")
};

// TODO get react into the client too!
// const client = http2.connect("http://localhost");
// can we push redux state with http2 ???

_http2.default.createSecureServer(options, app.callback()).listen(5000);
console.log("Listening 5000");
