import { render, h } from 'preact';
import Page from './Page';

console.log("Should rerender with Hello world2e")
const container = document.querySelector('#app');
render(<Page myprop={"Hello world2e"} />, document.body, container);