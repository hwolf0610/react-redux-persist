import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import configureStore from "./store";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// action creator
function updateText(text) {
  return {
    type: "INPUT_UPDATE",
    text
  };
}

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const { store, persistor } = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click_default: 0,
    }
  }

  onUpdateText = e => {
    this.props.dispatch(updateText(e.nativeEvent.target.value));
  };

  render() {
    return (
      <div style={styles}>
        <Hello name="CodeSandbox" />
        <h2>Start editing to see some magic happen {"\u2728"}</h2>
        <input value={this.props.text} onChange={this.onUpdateText} />
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(this.props.foo, undefined, 2)}
        </pre>

        <button onClick={() => {
          this.setState({ click_default: this.state.click_default + 1 });
          let inCrease = this.state.click_default;

          let ReduxJson = {
            type: "CLICK_TEST",
            text: inCrease
          }
          this.props.dispatch(ReduxJson);

        }}>Click Tester</button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.inputform.text,
  foo: state.inputform.foo,
});

const ConnectedApp = connect(mapStateToProps)(App);

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedApp />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
