import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { searchHotels, handleChangeName } from '../actions';
import 'react-datepicker/dist/react-datepicker.css';

class Search extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            fromDate: "",
            toDate: "",
            disabledfromDate: false,
            disabledToDate: true
        };
    }

    searchHotels = (event) => {
        event.preventDefault();
        if((this.state.fromDate !== "" && this.state.toDate !== "") || (this.state.name !== "" && this.state.fromDate === "" && this.state.toDate === "") || (this.state.name === "" && this.state.fromDate === "" && this.state.toDate === ""))
            this.props.searchHotels(this.state, this.props);
        else
            alert("Please select 'To-Date' ");      
    }

    handleChangeName = (event) => {
        this.props.handleChangeName(event.target.value);
    }

    handleChangefromDate = (date) => {
        this.setState({
            fromDate: date,
            toDate: "",
            disabledToDate: false
        });
    }

    handleChangeToDate = (date) => {
        this.setState({
            toDate: date, 
        });
    }

    render() {
        return (
            <form className="Inside-search" onSubmit={this.searchHotels}>
                <input 
                    type="text" 
                    className="hotelName" 
                    placeholder="Enter the name of hotel" 
                    value={this.props.hotelName}
                    onChange={this.handleChangeName}
                    />
                <div className="dateRange">
                    <DatePicker
                        className="Date"
                        placeholderText="FROM"
                        selected={this.state.fromDate}
                        onChange={this.handleChangefromDate}
                        disabled={this.state.disabledFromDate}
                        minDate={moment()}
                        maxDate={moment().add(1, "years")} 
                        />
                    <DatePicker
                        className="Date"
                        placeholderText="TO"
                        selected={this.state.toDate}
                        onChange={this.handleChangeToDate}
                        disabled={this.state.disabledToDate}
                        minDate={this.state.fromDate}
                        maxDate={moment().add(1, "years")} 
                        />
                </div>
                <button type="submit" value="Search" className="searchbutton">Search</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    let { 
        list, 
        hotelName,
        fromDate, 
        toDate 
    } = state.hotels;
    
    return { 
        list,
        hotelName, 
        fromDate, 
        toDate 
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators ({
        searchHotels,
        handleChangeName
    }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Search);