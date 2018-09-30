import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))
registerServiceWorker();
