import geolib from 'geolib';

import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = '1072125610216347307'

export const searchHotelByLocation = location => {
    const params = {
                    applicationId: RAKUTEN_APP_ID,
                    datumType: 1,
                    latitude: location.lat,
                    longitude: location.lng,
                };
    return Rakuten.Travel.simpleHotelSearch(params)
                         .then( (result) => {
                             console.log(result);
                             return result.data.hotels.map( (hotel) => {
                                 const info = hotel.hotel[0].hotelBasicInfo;
                                 const minCharge = info.hotelMinCharge;
                                 const distance = geolib.getDistance(
                                                     { latitude: location.lat,  longitude: location.lng },
                                                     { latitude: info.latitude, longitude: info.longitude }
                                                );
                                 return {
                                     id: info.hotelNo,
                                     name: info.hotelName,
                                     url: info.hotelInformationUrl,
                                     thumbUrl: info.hotelThumbnailUrl,
                                     price: minCharge,
                                     reviewAverage: info.reviewAverage,
                                     reviewCount: info.reviewCount,
                                     distance: distance,
                                 };
                             });
                         })
};
