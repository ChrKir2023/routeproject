import React, { useState, useRef, useForm, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import RouteAdd from "../routeadd/RouteAdd";
import PointAdd from "../pointadd/PointAdd";
import DisplayUserRoute from "../displayuserroute/DisplayUserRoute";
import SearchElementsByDistance from "../searchelembydistance/SearchElementsByDistance";
import AuthService from "../../services/auth.service";
import ReactDOM from "react-dom/client";

function ControlledTabs() {
  const [key, setKey] = useState('home');
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);
  const [status,setStatus] = useState(null);
  
   useEffect(() => {
	
    // invalid url will trigger an 404 error
	const searchrender = ReactDOM.createRoot(document.getElementById('displaysearch'));
	searchrender.render(<SearchElementsByDistance refresh={true} lat={lat} lng={lng} />);
	const routerender = ReactDOM.createRoot(document.getElementById('insertroutepoint'));
	routerender.render(<RouteAdd />);
	const pointrender = ReactDOM.createRoot(document.getElementById('displayroute'));
	pointrender.render(<DisplayUserRoute />);
	
	},[]); 	
  
    //Define the functionality of the tabs 




  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Εισαγωγή διαδρομής και σημείων">
	    <div id="insertroutepoint"></div>
        
      </Tab>
      <Tab eventKey="profile" title="Αναζήτηση διαδρομών χρήστη">
	    <div id="displayroute"></div>
       
      </Tab>
      <Tab eventKey="contact" title="Αναζήτηση σημείων διαδρομών σε απόσταση">
	    <div id="displaysearch"></div>
        
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;