import "./patchPreact";
import render from "preact-render-to-string";
import { h } from "preact";
/** @jsx h */

import fetch from "node-fetch";
import http2 from "http2";
import fs from "fs";

import register from "babel-register";
import path from "path";
import Koa from "koa";
import koaStatic from "koa-static";
import Router from "koa-router";
import compress from "koa-compress";
import serverpush from "koa-server-push";

const app = new Koa();
const router = new Router();

const viewpath = path.join(__dirname, "../src");

app.use(serverpush()); //Makes no difference so far Create proper manifest from webpack on each page?
app.use(koaStatic("./public/"));

app.use(
  compress({
    filter: content_type => {
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

// Create all this routes dinamically from the site.json file
// Create a component that wraps all of them

router.get("/page01", async function(ctx, next) {
  // test this page fetching resolution, maybe create a minimal resolution entry point like in nextjs
  // change this for the USDA thing?
  const preloadedState = await fetch(
    "https://assets0.uswitch.com/s3/broadband-deals/tables/january_sales.json"
  ).then(res => res.json());

  // TODO use the provider and store here
  // How to disable SSR? pass an ENV flag?
  let content = render(<Page01 {...preloadedState} />);
  ctx.body = `<!DOCTYPE html><html>
  <head>
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="localhost">
    <meta name="apple-mobile-web-app-title" content="localhost">
    <meta name="msapplication-starturl" content="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">    
  <head/>
  <body>
    <div id="app">
      ${content}
    </div>
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      "\\x3c"
    )}
    </script>    
    <script src="./commons.js"></script>
    <script src="./page01.js"></script>
  </body>
  </html>`;
});

router.get("/page02", function(ctx, next) {
  let content = render(<Page02 myprop={"Hello world in page 02"} />);
  ctx.body = `<!DOCTYPE html><html>
  <head>
    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="localhost">
    <meta name="apple-mobile-web-app-title" content="localhost">
    <meta name="msapplication-starturl" content="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">    
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
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

// TODO get react into the client too!
// const client = http2.connect("http://localhost");
// can we push redux state with http2 ???

http2.createSecureServer(options, app.callback()).listen(5000);
console.log("Listening 5000");
