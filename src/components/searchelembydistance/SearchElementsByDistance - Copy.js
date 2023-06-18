import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import axios from "axios";


function SearchElementsByDistance(props){
	
  const API_URL = "http://localhost:8080/api/add";
  
  
  const [status,setStatus] = useState(null);
  const [distance,setDistance] = useState(40);
 
  const form = useRef();
  const checkBtn = useRef();
  /*const isSearchVisible = props.isSearchVisible;*/
  /*const isDisplayed = false;*/
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [points, setPoints] = useState([]);
  const [error, setError] = React.useState(null);
  const [moreurl,setMoreUrl] = useState(null);
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);
  
  
   React.useEffect(() => {
	   
	if (!navigator.geolocation){
			setStatus("Geolocation is not supported by your browser");
		} else {
			
		    setStatus("Locating...");
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setStatus(null);
					setLat(position.coords.latitude);
					setLng(position.coords.longitude);
				    },
					() => {
						setStatus("Unable to retrieve your location");
					  }
					);  
				}
				
		
	console.log(`value of lat is `+props.lat);
	console.log(`value of lng is `+props.lng);
				
	
	const partial = `${API_URL}/pointwithindist?lat=`+lat+`&longit=`+lng+`&distance=40`;
	
	console.log(`partial is `+partial);
	
	const addvar = `${API_URL}/pointwithindist?lat=${lat}&longit=${lng}&distance=${distance}`; 
    
	console.log(addvar);	
    // invalid url will trigger an 404 error
    axios.get(`${API_URL}/pointwithindist?lat=10.46&longit=16.3&distance=40`,{
	//axios.get(partial,{
		  headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
		}}).then((response) => {
      setPoints(response.data);
	  }).catch(error => {
		  setError(error);
		});
	  }, []); 	
	  
  //console.log(`${API_URL}/pointwithindist?lat=10.46&longit=16.3&distance=40`); 	  
	
  if (error) return `Error: ${error.message}`; 
  if (props.refresh){
    
	  return (
		<div className="App">
		  <div>
				
			</div>
			<div>
			<h2>POINTS using distance {lat} and {lng}</h2>
			<ol>
			  {points.map(point => (
				<li>
					<div>
					  <div align="left">{point.id}</div>
					  <div>{point.description}</div>
					  <div>{point.latitude}</div>
					  <div>{point.longitude}</div>
					</div>
				</li>
			  ))}
			</ol>
			</div>
			
      </div>
		);
  }
};

export default SearchElementsByDistance;