import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import GoogleMapReact from 'google-map-react';


import CurrentLocation from "../geolocation/CurrentLocation";
import axios from "axios";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from "react-leaflet";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = (props) => {
  
  const defaultProps = {
    center: {
      lat: 37.96075601411221,
      lng: 23.720665753571247
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
  	
};

export default GoogleMap;