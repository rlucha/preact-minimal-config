import { h, render, Component } from 'preact';

class Page02 extends Component {
    render(props) {
        console.log(props.myprop)
        return <span onClick={() => console.log("hey")}>Hey {props.myprop}</span>;
    }
}

export default Page02