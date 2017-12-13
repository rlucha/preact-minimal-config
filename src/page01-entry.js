// Get that preact import outside with commonchunks
// Generate this entry points on the fly via a function passed to webpack on require...
// get redux there
import { Provider, connect } from "preact-redux";
import { createStore } from "redux";
import { render, h } from "preact";
import Page01 from "./Page01";

require("preact/devtools");

const container = document.querySelector("#app");
const preloadedState = window.__PRELOADED_STATE__;

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// redux connect
const mapStateToProps = (state, ownProps) => ({
  msg: state.msg
});

const PageConnect = connect(mapStateToProps)(Page01);

// pass store from prerender
render(
  <Provider store={store}>
    <PageConnect />
  </Provider>,
  document.body,
  container
);
