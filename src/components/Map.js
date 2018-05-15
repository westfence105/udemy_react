import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const InnerMap = withGoogleMap( props => (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={ props.position }
            center={ props.position }
        >
        <Marker { ...props.marker } />
        </GoogleMap>
    ));

const Map = ({ lat, lng }) => {
    const position = { lat, lng };
    return (
        <InnerMap
            containerElement={(<div/>)}
            mapElement={(<div className="map" />)}
            position={ position }
            marker={{ position }}
        />
    );
};

Map.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
};

Map.defaultProps = {
    lat: 35.685175,
    lng: 139.7527995,
};

export default Map;
