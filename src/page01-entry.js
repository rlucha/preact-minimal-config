// Get that preact import outside with commonchunks
// Generate this entry points on the fly via a function passed to webpack on require...

import { render, h } from 'preact';
import Page01 from './Page01';
require('preact/debug');

const container = document.querySelector('#app');

setTimeout(() => {
  render(<Page01 myprop={"Hello world in page 01"} />, document.body, container);  
}, 200);

