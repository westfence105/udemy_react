import axios from 'axios';

const GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";

export const geocode = (place) =>
    axios.get( GEOCODE_ENDPOINT, { params: { address: place } } )
         .then( results => {
        //    console.log( results );
            const status = results.data.status;
            const result = results.data.results[0];
            if( typeof( result ) === 'undefined' ){
                return { status };
            }
            else {
                return {
                    status,
                    address: result.formatted_address,
                    location: result.geometry.location,
                };
            }
          })
;
