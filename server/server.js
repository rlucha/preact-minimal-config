import './patchPreact'
import render from 'preact-render-to-string';
import { h } from 'preact';
/** @jsx h */

const register = require('babel-register');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static')
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const viewpath = path.join(__dirname, '../src');

app.use(koaStatic('./public/'));

// Register live babel transpiling
register({
  presets: [ 'es2015', 'react' ],
  extensions: [ '.jsx' ],
  plugins: [["transform-react-jsx", { "pragma" : "h"}]],
  only: /src/
});

var Page = require('../src/Page.jsx').default

// on a particular route, we have to build it and provide some diffing
// add preact everywhere on the commons bundle...

// Things to consider in the build:
// Navigate all the pages entry points and build the SSR version
// Create all the JS entry points and create the bundles per entry point
// 

router.get('/', function (ctx, next) {
  let content = render(<Page myprop={"Hello world"} />);
  ctx.body = `<!DOCTYPE html><html>
  <head>
    
  <head/>
  <body>
    <div id="app">
      ${content}
    </div>

    <script src="./page.js"></script>
  </body>
  </html>`;
});


app
.use(router.routes())
.use(router.allowedMethods());

app.listen(5000);
console.log('Listening 5000')

// TODO get react into the client too!