import { combineReducers } from 'redux';
import hotels from './hotels_reducer';

const rootReducer = combineReducers({
	hotels
});

export default rootReducer;