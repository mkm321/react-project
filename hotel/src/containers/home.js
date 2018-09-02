import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getHotels } from '../actions';
import Header from '../components/header';
import Search from './search';
import Display from '../components/display';

class home extends Component {

	componentDidMount() {
		this.props.getHotels();
	}

	render() {
		return (
			<div>
		        <Header/>
		        <Search/>
				<div className="scroll">
		        	<Display {...this.props}/>
				</div>
	      	</div>
		);
	}
}

const mapStateToProps = state => {
	let { 
		available,
		todayList,
		partiallyAvailable, 
		notAvailable,
		hotelName
	} = state.hotels;
	
	return { 
		available,
		todayList,
		partiallyAvailable, 
		notAvailable,
		hotelName
	};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({
    getHotels
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(home);