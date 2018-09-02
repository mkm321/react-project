import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const createStoreMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreMiddleware(reducers)}>
		<App/>
	</Provider>, document.getElementById('root'));
registerServiceWorker();