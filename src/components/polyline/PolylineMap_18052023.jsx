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

const renderPolylines = (map, maps) => {
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })
    geodesicPolyline.setMap(map)


const nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: '#e4e4e4',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)


const fitBounds = (map, maps) => {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

}

/*const markers = [
    {lat: 53.42728, lng: -6.24357},
    {lat: 43.681583, lng: -79.61146},
    {lat: 25.748682620334044, lng: -80.24216662951264}
  ];*/




const markers = [
    {lat: 37.9606158, lng: 23.725764},
    {lat: 37.994537, lng: 23.649815},
    {lat: 37.99000491553684, lng: 23.652856620332944}
  ];


const center = {
  lat: 37.969206,
  lng: 23.725764
};
  

const PolylineMap = ({routeid, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Χαρτης σημειου επιλογης</h2>

    <div className="google-map">
    Hello World 
    
    <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyBL21-yQPILxZ8MeGJmixApPzE3OZpf27A'}}
        style={{height: '100vh', width: '100%'}}
        defaultCenter={center}
        defaultZoom={12}
        onGoogleApiLoaded={({map, maps}) => renderPolylines(map, maps)}>
        <Marker text={'AKROPOLI'} lat={37.9606158} lng={23.725764} />
        <Marker text={'DASOS'} lat={37.994537} lng={23.649815} />
        <Marker text={'KOUNELIA'} lat={37.99000491553684} lng={23.652856620332944} />

    </GoogleMapReact>
   

    </div>
  </div>
)

export default PolylineMap
