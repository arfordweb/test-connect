import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import createLogger from 'redux-logger';
import './App.css';


const DOUBLE_THE_NUMBERS = 'DOUBLE_THE_NUMBERS';

const initialState = {
  a: 1,
  b: 2,
};

const createStoreWithMiddleware = compose(applyMiddleware(createLogger()))(createStore);
const store = createStoreWithMiddleware(
  (state = initialState, action) => {
    switch (action.type) {
        case DOUBLE_THE_NUMBERS:
            return { a: state.a * 2, b: state.b * 2 };
        default:
            return state;
    }
  }
);


const doubleTheNumbers = e => {
  e.preventDefault();
  return {
    type: DOUBLE_THE_NUMBERS,
  };
};


const Beta = connect(
  ({ b }) => ({ b })
)(
  ({ a, b }) => {
    const theSum = a + b;
    console.log('Beta, a: ', a, 'b: ', b, ' a + b: ', a + b);
    return (<div>
      <div>a: { a }</div>
      <div>b: { b }</div>
      <div>a + b: { theSum }</div>
    </div>)
  }
);

const Alpha = connect(
  ({ a }) => ({ a }),
  { doubleTheNumbers }
)(
  ({ a, doubleTheNumbers }) => {
    console.log('Alpha, a: ', a);
    return (
      <div>
        <Beta a={ a } />
        <button onClick={ doubleTheNumbers }>Double them!</button>
      </div>
    );
});


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <Alpha />
        </div>
      </Provider>
    );
  }
}

export default App;
