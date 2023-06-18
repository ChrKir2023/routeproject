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
import MapSection from './map/Map'; // import the map here
import IntroSection from './intro/Intro';
import ContactSection from './contact-section/ContactSection';
import DisclaimerSection from './disclaimer/Disclaimer'
import FooterSection from './footer/Footer'


import './App.css';

const DisplayMap = (props) => {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const navigateUser = () => {
    // 👇️ navigate to /
    navigate(-1);
  };

  const API_URL = "http://localhost:8080/api/add";
  
   /* const location = useLocation();
    console.log(props, " props");
    console.log(location, " useLocation Hook");
    const data = location.state?.data; */
    const [point, setPoint] = useState([]);
    const [error, setError] = React.useState(null);
    let locationdata = [];
    
    
    let { id, longitude, latitude } = useParams();

    console.log(id);
    console.log(latitude);
    console.log(longitude);

    /*React.useEffect(() => {
    
        axios.get(`${API_URL}/pointbyid`,{
	      params: {
		        pointid: id
	        }})
		      .then((response) => {
                setPoint(response.data);
                console.log(response.data);
	        }).catch(error => {
		      setError(error);
		    });*/

            /*fetch(`http://localhost:8080/api/add/pointbyid/${id}`,*/
            /*fetch(`http://localhost:8080/api/add/pointbyid?pointid=${id}`,
            {headers: { 'Access-Control-Allow-Origin': '*' },
	         mode: 'cors'
            })
              .then(response => response.json())
              .then((usefulData) => {
                console.log(usefulData);
                setPoint(usefulData);
              })
              .catch((e) => {
                console.error(`An error occurred: ${e}`)
              });

	  }); */

      
      const location = {
          address: '1600 Amphitheatre Parkway, Mountain View, california.',
          lat: Number(latitude),
          lng: Number(longitude),
      } // our location object from earlier
      /*const location = {
          address: 'Athens Sintagma',
          lat: point.latitude,
          lng: point.longitude,
      } 
        */
      
       console.log("Location is:",location);

  return (

  <div> 
       <div id="div2" class="wrap-grid">
                
             {/*<button onClick={closeTab}>Επιστροφή στην προηγούμενη σελίδα</button>*/}
             <a href='#' onClick={() => navigateUser()}> Επιστροφή στην προηγούμενη σελίδα </a>

      </div>
     <div className="App">
                    <IntroSection />
                    <MapSection location={location} zoomLevel={17} /> {/* include it here */}
                    <DisclaimerSection />
                    <FooterSection />
            
      </div>
  </div>   
  )
};

export default DisplayMap;