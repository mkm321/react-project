export default function(state = {}, action) {
	switch(action.type) {
		case "SET_NAME":
			return { ...state, hotelName: action.payload }
		case "FILTER_HOTELS":
			return { ...state, ...action.payload };
		default: 
			return state;
	}
}