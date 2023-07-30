import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './ReduxStore/store';

const ReduxProvider = Provider

ReactDOM.render(<ReduxProvider store={store}><App /></ReduxProvider>, document.getElementById('root'));

// Before
// ReactDOM.render(<App />, document.getElementById('root'));

// After
// createRoot(document.getElementById('root')).render(<App />);