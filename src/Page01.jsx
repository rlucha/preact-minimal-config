import { h, render, Component } from 'preact';

class Page01 extends Component {
    render(props) {
        console.log("props here", props)
        return <span onClick={() => console.log("hey")}>Hey {props.providers}</span>;
    }
}

export default Page01