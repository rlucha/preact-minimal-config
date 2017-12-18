import { h, render, Component } from 'preact';

// redux connect, this should live in the component
export const mapStateToProps = (state, ownProps) => ({
    deals: state.deals
});

class Page01 extends Component {
    render({deals}) {
        console.log("props here", deals)
        return (
            <div>
                <h1>Providers</h1>
                {deals.map(p => <div onClick={() => console.log(p.title)}>{p.title}</div>)}
                </div>
        )
    }
}

export default Page01