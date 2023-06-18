import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import { Routes, Route, Link, BrowserRouter, Router, useRoutes, useNavigate } from "react-router-dom";
import axios from "axios";

const required = (value) => {
  console.log(value);
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Η τιμή του πεδίου είναι απαραίτητη και πρέπει να είναι μεγαλύτερη από 0!
      </div>
    );
  }
};


function SearchElementsByDistance(props){
	
  const API_URL = "http://localhost:8080/api/add";
  
  
  const [status,setStatus] = useState(null);
  const [distance,setDistance] = useState(0);

  const user = AuthService.getCurrentUser();
  const userid = user.id;
 
  const form = useRef();
  const checkBtn = useRef();
  /*const isSearchVisible = props.isSearchVisible;*/
  /*const isDisplayed = false;*/
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [points, setPoints] = useState([]);
  const [error, setError] = React.useState(null);
  const [moreurl,setMoreUrl] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [data, setData] = useState();
  
  const findPointsByDistance = (e) => {
	   e.preventDefault();
	  
      console.log(distance);
	  if (distance!=0){

		  const partial = `${API_URL}/pointwithindist?lat=`+latitude+`&longit=`+longitude+`&distance=`+(distance/100);
		  console.log(partial);
		  const addvar = `${API_URL}/pointwithindist?lat=37.9842&longit=23.7353&distance=40`; 
			axios.get(partial,{
			  headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
			}}).then((response) => {
			  setPoints(response.data);
			  }).catch(error => {
				setError(error);
			});
	  } 
	  
  } 	
  
  const clearData = (e) => {
    e.preventDefault();
    setDistance(0);
	setPoints([]);
  };
  
  const onChangeDistanceValue = (e) => {
    const distanceVal = e.target.value;
		setDistance(distanceVal);
  };
     
	useEffect(() => {
     navigator.geolocation.getCurrentPosition(position => {
       const {latitude, longitude} = position.coords;
             setLatitude(position.coords.latitude);
			 setLongitude(position.coords.longitude);
       // use the latitude and longitude to get the user's address
       fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBL21-yQPILxZ8MeGJmixApPzE3OZpf27A`)
         .then(response => response.json())
         .then(data => {
           setUserAddress(data.results[0].formatted_address);
         });
     });
	 
	 console.log(latitude);
	 console.log(longitude);
	 console.log(userAddress);
	 
   }, []);
		
	  
  //console.log(`${API_URL}/pointwithindist?lat=10.46&longit=16.3&distance=40`); 
  
   const removePoint = (id) => {

		axios.delete(`${API_URL}/deletepoint`,{
		  params: {
			pointid:id
			}})
				.then((response) => {
				console.log(response.data);
			}).catch(error => {
			console.log(error);
		});

		const newPoints = points.filter(
		  (point) => point.id !== id
		);
		setPoints(newPoints);
	  };
	
  if (error) return `Error: ${error.message}`; 
  if (props.refresh){
    
	  return (
	  
	   <div className="App">
	   
	    <Form onSubmit={findPointsByDistance} ref={form}>
		  <div>
			  <div className="form-group">
                <label htmlFor="routename">Επιλογή απόστασης</label>
                <Input
                  type="text"
                  className="form-control"
                  name="distance"
                  value={distance}
                  onChange={onChangeDistanceValue}
				  validations={[required]}
                />
              </div>
			  &nbsp;
			  <div>
				  <div className="form-group" style={{float: 'left'}}>
					<button className="btn btn-primary btn-block">Αναζήτηση διαδρομών</button>
				  </div>
				  <div className="form-group" style={{float: 'right'}}>
					<button text-align="left" className="btn btn-primary btn-block" onClick={clearData}>Καθαρισμός δεδομένων</button>
				  </div>
			  </div>
			</div>
			&nbsp;
			&nbsp;
			&nbsp;
			&nbsp;
			&nbsp;
		    <div>
			&nbsp;
			&nbsp;
			&nbsp;
				<h4>Συντεταγμένες που βρίσκεται ο χρήστης {latitude} || {longitude}</h4>
				<ol>
				  {points.map(point => (
					<li>
						<div class="container" style={{borderRadius:'5px'}}>
						      <div class="row">
									<div class="col-sm">
										  {point.pointname}
									</div>
									<div class="col-sm">
									  {point.description}
									</div>
									<div class="col-sm">
									  {point.latitude} {point.longitude}
									</div>
									<div class="col-sm">
									  {point.category}
									</div>
									<BrowserRouter>
									      <Link to={`/map/${point.id}/${point.longitude}/${point.latitude}`} className="col-sm" target="_blank" rel="noopener noreferrer">
											Χάρτης σημείου
										  </Link>
									</BrowserRouter>  
									<div class="col-sm">
										 {/*<button className="bi bi-trash" className="custom-btn" onClick={() => removePoint(point.id)}>Διαγραφή
										 </button>*/}
										 <a href='#' onClick={() => removePoint(point.id)}> Διαγραφή </a>
								    </div>
							   </div>
						</div>
					</li>
				  ))}
				</ol>
			</div>
        	
        </Form> 
	    
		</div>	
     
		);
  }
};

export default SearchElementsByDistance;