// Get that preact import outside with commonchunks
// Generate this entry points on the fly via a function passed to webpack on require...

import { render, h } from 'preact';
import Page02 from './Page02';

const container = document.querySelector('#app');

setTimeout(() => {
  render(<Page02 myprop={"Hello world in page 02 From CLIENT"} />, document.body, container);  
}, 200);
