import React, { useState, useRef, useContext, createContext  } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from 'react';
import { Marker, Popup } from 'react';
import FirstMap from "../leaflet/FirstMap";
import MapSection from '../map/Map' // import the map here
import { Routes, Route, Link, BrowserRouter, Router, useRoutes, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import DisplayMap from "../DisplayMap";

function SearchElements(props){
	
  const API_URL = "http://localhost:8080/api/add";	
	
  const form = useRef();
  const checkBtn = useRef();
  const isSearchVisible = props.isSearchVisible;
  /*const isDisplayed = false;*/
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [points, setPoints] = useState([]);
  const [error, setError] = React.useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [mappoint, setMapPoint] = useState(null);
  
  const UserContext = createContext();
  
   React.useEffect(() => {
    // invalid url will trigger an 404 error
	const user = AuthService.getCurrentUser();
	const userid = user.id;
	console.log(userid);
	console.log(props.routeid);
	
	
    axios.get(`${API_URL}/pointallbyuseridandrouteid`,{
	  params: {
		userid: userid,
		routesid: props.routeid
	}})
		.then((response) => {
		setPoints(response.data);
	}).catch(error => {
		setError(error);
	});

    },[]); 

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
		    
			<div>
			<h2>ΣΗΜΕΙΑ ΔΙΑΔΡΟΜΗΣ</h2>
			<ol>
			
			  {points.map(({ id, pointname, description, latitude, longitude }) => (
						<li>
						  <div class="container">
							  <div class="row">
								    <div class="col-sm">
									  {pointname}
									</div>
									<div class="col-sm">
									  {description}
									</div>
									<div class="col-sm">
									  {latitude}
									</div>
									<div class="col-sm">
									  {longitude}
									</div>
									<div class="col-sm">
										<BrowserRouter>
											  <Link to={`/map/${id}/${longitude}/${latitude}`} className="col-sm" target="_blank" rel="noopener noreferrer">
												Χάρτης σημείου
											  </Link>
										</BrowserRouter>  
									</div>
									<div class="col-sm">
											 {/*<button className="bi bi-trash" className="custom-btn" onClick={() => removePoint(id)}>Διαγραφή
											 </button>*/}
											 <a href='#' onClick={() => removePoint(id)}> Διαγραφή </a>
									</div>
                              </div> 
							</div>
						</li>
					))}
				</ol>
			</div>
		</div>
	  
		);
  }
};

export default SearchElements;