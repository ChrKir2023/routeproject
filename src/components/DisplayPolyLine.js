import React, { useState, useEffect, useContext, createContext, UserContext } from "react";
import { useParams, useSearchParams, useNavigate ,useLocation } from "react-router-dom";
import locationIcon from '@iconify/icons-mdi/map-marker';
import UserService from "../services/user.service";
/*import CurrentLocation from "./geolocation/CurrentLocation";*/
import RouteAdd from "./routeadd/RouteAdd";
import PointAdd from "./pointadd/PointAdd";
import SearchElements from "./searchelements/SearchElements";
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from "axios";
import MapSection from './polyline/PolylineMap'; // import the map here
import IntroSection from './intro/Intro';
import ContactSection from './contact-section/ContactSection';
import DisclaimerSection from './disclaimer/Disclaimer'
import FooterSection from './footer/Footer'


import './App.css';

const DisplayPolyLine = (props) => {
  let navigate = useNavigate();
  

  const handleBack = () => {
    navigate(-1);
  };

  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const API_URL = "http://localhost:8080/api/add";
  
    let { routeid } = useParams();

    console.log(routeid);


    const someCoords= [
    {lat: 38.0109488, lng: 23.644504},
    {lat: 37.993449, lng: 23.666112}
    ];

  const location = {
          address: '1600 Amphitheatre Parkway, Mountain View, california.',
          lat: 38.0109488,
          lng: 23.644504
      }

 
  return (

  <div> 
       <div id="div2" class="wrap-grid">
            <a href='#' onClick={() => handleBack()}> Επιστροφή στην προηγούμενη σελίδα </a>
        </div>
        <div className="App">
            <IntroSection />
            <MapSection routeid={routeid} zoomLevel={12} /> {/* include it here */}
            <DisclaimerSection />
            <FooterSection />
            
      </div>
  </div>   
  )
};

export default DisplayPolyLine;