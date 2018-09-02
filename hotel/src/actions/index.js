import firebase from 'firebase';
import moment from 'moment';

const config = {
    apiKey: "AIzaSyCu7m5w1sQTJY2jiIcuT5Kmn7lM5TwPgvU",
    authDomain: "comfystay-121fc.firebaseapp.com",
    databaseURL: "https://comfystay-121fc.firebaseio.com",
    projectId: "comfystay-121fc",
    storageBucket: "comfystay-121fc.appspot.com",
    messagingSenderId: "611163272406"
};
firebase.initializeApp(config);
const db= firebase.firestore();


export const handleChangeName = (name) => {
    return {
        type: 'SET_NAME',
        payload: name
    }
}

export const getHotels = () => {
    return dispatch => {
        db.collection("hotels").orderBy("name").get()
            .then(list => {
                const available = filterAvailableHotels("", moment(), moment(), list);
                const partiallyAvailable = filterPartiallyAvailableHotels("", moment(), moment(), list);
                const notAvailable = filterNotAvailableHotels("", moment(), moment(), list);
                dispatch({
                    type: "FILTER_HOTELS",
                    payload: {
                        available,
                        partiallyAvailable,
                        notAvailable,
                        list
                    }
                });
            });
    }
}

export const searchHotels = ({ fromDate, toDate }, { hotelName, list }) => {
    let todayList;
    if(hotelName === undefined)
        hotelName = "";
    if(fromDate === "" && toDate === "") {
        fromDate = toDate = moment();
        todayList = filtertodayList(hotelName, fromDate, toDate, list);
    } else {
        todayList = undefined;
    }

    const available = filterAvailableHotels(hotelName, fromDate, toDate, list);
    const partiallyAvailable = filterPartiallyAvailableHotels(hotelName, fromDate, toDate, list);
    const notAvailable = filterNotAvailableHotels(hotelName, fromDate, toDate, list);
    return {
        type: "FILTER_HOTELS",
        payload: {
          available,
          partiallyAvailable,
          notAvailable,
          todayList
        }
    };
}

const filterAvailableHotels = (name, fromDate, toDate, list) => {
    return list.docs.filter(hotel => {
        return ( 
            hotel.data().name.toLowerCase().indexOf(name.toLowerCase()) > -1 && ( 
                fromDate !== "" ? (
                  hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                  hotel.data().toDate >= toDate.format("YYYY-MM-DD")
                ) : true
            )
        );
    });
}

const filterPartiallyAvailableHotels = (name, fromDate, toDate, list) => {
    return list.docs.filter(hotel => {
        return (
            hotel.data().name.toLowerCase().indexOf(name.toLowerCase()) > -1 && (
                fromDate !== "" ? (
                    (
                        hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                        hotel.data().toDate >= fromDate.format("YYYY-MM-DD") && 
                        hotel.data().toDate < toDate.format("YYYY-MM-DD")
                    ) || (
                        hotel.data().fromDate <= toDate.format("YYYY-MM-DD") && 
                        hotel.data().toDate >= toDate.format("YYYY-MM-DD") && 
                        hotel.data().fromDate > fromDate.format("YYYY-MM-DD")
                    )
                ) : false
            )
        );
    });
}

const filterNotAvailableHotels = (name, fromDate, toDate, list) => {
    return list.docs.filter(hotel => {
        return (
            !(
                (
                    hotel.data().name.toLowerCase().indexOf(name.toLowerCase()) > -1 && (
                        fromDate !== "" ? (
                            (
                                hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                                hotel.data().toDate >= fromDate.format("YYYY-MM-DD") && 
                                hotel.data().toDate < toDate.format("YYYY-MM-DD")
                            ) || (
                                hotel.data().fromDate <= toDate.format("YYYY-MM-DD") && 
                                hotel.data().toDate >= toDate.format("YYYY-MM-DD") && 
                                hotel.data().fromDate > fromDate.format("YYYY-MM-DD")
                            ) || (
                                hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                                hotel.data().toDate >= toDate.format("YYYY-MM-DD")
                            )
                        ) : true
                    )
                ) || ( 
                    hotel.data().name.toLowerCase().indexOf(name.toLowerCase()) < 0 && ( 
                        fromDate !== "" ? (
                          hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                          hotel.data().toDate >= toDate.format("YYYY-MM-DD")
                        ) : true
                    )
                )
            )
        )
    });
}

const filtertodayList = (name, fromDate, toDate, list) => {
    return list.docs.filter(hotel => {
        return ( 
            hotel.data().name.toLowerCase().indexOf(name.toLowerCase()) < 0 && ( 
                fromDate !== "" ? (
                  hotel.data().fromDate <= fromDate.format("YYYY-MM-DD") && 
                  hotel.data().toDate >= toDate.format("YYYY-MM-DD")
                ) : true
            )
        );
    });
}