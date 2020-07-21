import React from 'react'
import {
    GoogleMap,
    LoadScript,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import mapStyles from './MapStyles';
import icnLocation from '../assets/icon/location.png'

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const mapContainerStyle = {
    width: '100%',
    height: '300px',
};
export default function ViewLocation(props) {
    const { location } = props
    const libraries = ['places'];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDZuPgVRz-vmxBgoy7Ix6toOLAvZPWq0S4',
        libraries,
    });

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div>
            {/* {JSON.stringify(location)} */}
            {/* <img src={icnLocation} style={{width: '20px', height: '20px'}} /> */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={location}
                options={options}>
                {location && (
                    <Marker
                        position={{ lat: location.lat, lng: location.lng }}
                        title="My-location"
                        icon={{
                            url: icnLocation,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    )
}
