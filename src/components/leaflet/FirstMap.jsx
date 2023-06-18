import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import axios from "axios";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from "react-leaflet";


const FirstMap = (props) => {
  
  const form = useRef();
  const position = [props.lat, props.lng]
  
  function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
  
	  return (
	    
		<div id="div2" className="col-md-4">
			<div id="leafletmap"></div>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}>
				<TileLayer
				  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
			  </MapContainer>,
					</div>
				);
  	
};

export default FirstMap;