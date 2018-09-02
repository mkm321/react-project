import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css';

const Search = ({ available, todayList, partiallyAvailable, notAvailable, hotelName }) => {
    function fun(list, buttonClassName, buttonText) {
        if(list !== undefined) {
            return list.map(hotel => {
                if(hotel.data().name.match(new RegExp(hotelName, 'i'))) {
					
					var sr="../../images/"+hotel.data().logo;
                    return (
                        <div className="Inside-display" key={hotel.data().name}>
                            <div className="HotelLogo">
                                <img className="LogoImg" src={sr} alt={hotel.data().altLogo} />
                            </div>
                            <div className="HotelNameRatings">
                                 <div className="HotelName">{hotel.data().name}</div>
                                 <div className="HotelAddress">{hotel.data().address}</div>
                                 <div className="rating">
                                    <StarRatingComponent
                                        name={"star rating"}
                                        value={hotel.data().rating}
                                        starCount={5}
                                        starColor={"#ffb400"}
                                        size={40}
                                        emptyStarColor={"FFFFFF"}
                                        editing={false}
                                        />
                                 </div>
                            </div>
                            <div className="buttons">
                                <button className={buttonClassName}>{buttonText}</button>
                            </div>
                        </div>
                    );
                }    
            });
        }   
    }

    if(available === undefined && partiallyAvailable === undefined && notAvailable === undefined && todayList === undefined) {
        return (
            <ActivityIndicator
                number={7}
                duration={200}
                activeColor="#0070BF"
                borderWidth={2}
                borderRadius="50%"
                diameter={25}
                />
        );
    } else {
        return (
            <div>
                {fun(available, "available-button", "Book Now")}
                {fun(todayList, "available-button", "Book Now")}
                {fun(partiallyAvailable, "partially-available-button", "Partially Available, Book partially!")}
                {fun(notAvailable, "not-available-button", "Not Available")}
            </div>
        );
    }
}

export default Search;