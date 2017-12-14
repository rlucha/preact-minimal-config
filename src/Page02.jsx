import { h, render, Component } from 'preact';

class Page02 extends Component {
    render(props) {
        return <span onClick={() => console.log("hey")}>Hey {props.myprop}</span>;
    }
}

export default Page02