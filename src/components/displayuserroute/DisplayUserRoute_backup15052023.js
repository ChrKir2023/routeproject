import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import { Routes, Route, Link, BrowserRouter, Router, useRoutes, useNavigate } from "react-router-dom";
import axios from "axios";
import Delete from "../deletecontroller/Delete";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Η τιμή του πεδίου είναι απαραίτητη και πρέπει να είναι μεγαλύτερη από 0!
      </div>
    );
  }
};


function DisplayUserRoute(props){
	
  const API_URL = "http://localhost:8080/api/add";
  
  
  const [status,setStatus] = useState(null);
  const [distance,setDistance] = useState(0);
 
  const form = useRef();
  const checkBtn = useRef();
  /*const isSearchVisible = props.isSearchVisible;*/
  /*const isDisplayed = false;*/
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = React.useState(null);
  const [moreurl,setMoreUrl] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [data, setData] = useState();
  	
     
	useEffect(() => {
		const user = AuthService.getCurrentUser();
		const userid = user.id;
		console.log(userid); 

       fetch(`http://localhost:8080/api/add/routebyuserid?userid=${userid}`)
         .then(response => response.json())
         .then(data => {
           setRoutes(data);
         }).catch((e) => {
                console.error(`An error occurred: ${e}`)
         });
   }, []);
  
	
  if (error) return `Error: ${error.message}`; 
  
    
	  return (
	  
	   <div className="App">
	       <div>
				<h4>Διαδρομές του χρήστη</h4>
				<ol>
				  {routes.map(route => (
					<li>
						<div class="container">
							  <div class="container">
									<div class="row">
									  <div class="col-sm">
										  {route.routename}
									   </div>
								       <div class="col-sm">
										   <BrowserRouter>
												  <Link to={`/displaypoints/${route.id}`} className="col-sm" target="_blank" rel="noopener noreferrer">
													Σημεία διαδρομής
												  </Link>
											</BrowserRouter> 
										</div>
										<div class="col-sm">
										<BrowserRouter>
												<Link to={`/displaypoints/${route.id}`} className="col-sm" target="_blank" rel="noopener noreferrer">
												Άνοιγμα χάρτη διαδρομής
												</Link>
										</BrowserRouter>  
										</div> 
										<div class="col-sm">{<Delete routeId = {route.id} /> }
										</div>
										<div class="col-sm">
											<button type="button" class="btn btn-light"><span class="bi bi-trash"></span></button>
										</div>
								    </div>
                              </div>
						</div>
					</li>
				  ))}
				</ol>
			</div>
        
		</div>	
     
		);
  
};

export default DisplayUserRoute;