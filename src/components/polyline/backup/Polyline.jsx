import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import Marker from './Marker'

import './map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

/*const someCoords= [
    {lat: 38.0109488, lng: 23.644504},
    {lat: 37.993449, lng: 23.666112}
  ];*/

const someCoords = [
    { lat: 37.789411, lng: -122.422116 },
    { lat: 37.785757, lng: -122.421333 },
    { lat: 37.789352, lng: -122.415346 }
  ];

const center = {
  lat: 37.785757,
  lng: -122.421333
};
  

const Polyline = ({location, someCoords, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Χαρτης σημειου επιλογης</h2>

    <div className="google-map">
      <GoogleMapReact
           bootstrapURLKeys={{
             key: "AIzaSyBL21-yQPILxZ8MeGJmixApPzE3OZpf27A",
           }}
           center={{center}}
           defaultZoom={15}>
           <Polyline
              path={someCoords}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              geodesic={true}
              strokeWeight={2} />
           {/*<AnyReactComponent lat={37.789411} lng={-122.422116} text='My Marker' />*/}
         </GoogleMapReact>
    </div>
  </div>
)

export default Polyline
