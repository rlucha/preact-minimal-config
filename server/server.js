import "./patchPreact";
import render from "preact-render-to-string";
import { h } from "preact";
/** @jsx h */

const http2 = require("http2");
const fs = require("fs");

const register = require("babel-register");
const path = require("path");
const Koa = require("koa");
const koaStatic = require("koa-static");
const Router = require("koa-router");
const compress = require("koa-compress");

const app = new Koa();
const router = new Router();

const viewpath = path.join(__dirname, "../src");

app.use(koaStatic("./public/"));

app.use(
  compress({
    filter: content_type => {
      console.log(content_type);
      return /text/i.test(content_type);
    },
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
  })
);

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

router.get("/page01", function(ctx, next) {
  let content = render(<Page01 myprop={"Hello world in page 01"} />);
  ctx.body = `<!DOCTYPE html><html>
  <head>
    
  <head/>
  <body>
    <div id="app">
      ${content}
    </div>
    <script src="./commons.js"></script>
    <script src="./page01.js"></script>
  </body>
  </html>`;
});

router.get("/page02", function(ctx, next) {
  let content = render(<Page02 myprop={"Hello world in page 02"} />);
  ctx.body = `<!DOCTYPE html><html>
  <head>
    
  <head/>
  <body>
    <div id="app">
      ${content}
    </div>
    <script src="./commons.js"></script>
    <script src="./page02.js"></script>
  </body>
  </html>`;
});

app.use(router.routes()).use(router.allowedMethods());

// app.listen(5000);

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// TODO get react into the client too!
// const client = http2.connect("http://localhost");
http2.createSecureServer(options, app.callback()).listen(5000);
console.log("Listening 5000");