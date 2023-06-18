import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import SearchElements from "../searchelements/SearchElements";
import SearchElementsByDistance from "../searchelembydistance/SearchElementsByDistance";

import PointService from "../../services/point.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vPointName = (value) => {
 if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be greater than 6.
      </div>
    );
  }
};

function PointAdd(props){
  const form = useRef();
  const checkBtn = useRef();
  const isDisplayed = props.isDisplayed;
  const routenameid = props.routeid;
  /*const isDisplayed = false;*/
  

  const [pointname, setPointname] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
 
  const currentUser = AuthService.getCurrentUser();
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);
  const [distance,setDistance] = useState(null);
  const [status,setStatus] = useState(null);
  const [searchvisible, setSearchvisible] = useState(false);
  const [searchElements, setSearchElements] = useState(true);
  
  

  const onChangePointName = (e) => {
    const pointname = e.target.value;
	
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
	
	console.log(lat);
	console.log(lng);
	console.log(routenameid);	
	
	
	setPointname(pointname);
	};
	
   const onChangeDescription = (e) => {
		 const description = e.target.value;
		 setDescription(description);
   };	   
   
   const pointProps = {
		lat : lat,
		lng : lng,
		distance: "50" 
	}; 

    
  const handlePointAdd = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(true);

    form.current.validateAll();
	
	console.log(pointname);
	console.log(routenameid);

	
		
	
    if (checkBtn.current.context._errors.length === 0) {
      PointService.PointAdd(pointname,description,lat,lng,1,routenameid,currentUser.id).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
				error.message ||
				error.toString();

          setMessage(resMessage);
        }
      );
	  
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
	console.log(successful);
	console.log(lat);
	console.log(lng);
	console.log(routenameid);
	  
	  
    }
  };
   
	  return (
	    
		<div id="div2" className="col-md-12">
			
			<Form onSubmit={handlePointAdd} ref={form}>
			  {successful && (
				<div>
				  <hr/>
				  <div className="form-group">
					<label htmlFor="pointname">Όνομα σημείου </label>
					<Input
					  type="text"
					  className="form-control"
					  name="pointname"
					  value={pointname}
					  onChange={onChangePointName}
					  validations={[required, vPointName]}
					/>
					<label htmlFor="description">Περιγραφή</label>
					<Input
					  type="text"
					  className="form-control"
					  name="description"
					  value={description}
					  onChange={onChangeDescription}
					/>
				  </div>
					&nbsp;
				  <div className="form-group">
					<button className="btn btn-primary btn-block">Προσθήκη σημείου</button>
				  </div>
				  <hr/>
				</div>
			  )}
			{message && (
			<div className="form-group">
			  <div
				className={ successful ? "alert alert-success" : "alert alert-danger" }
				role="alert"
			  >
				{message}
			  </div>
			</div>
			  )}
			  <CheckButton style={{ display: "none" }} ref={checkBtn} />
			    <div><SearchElements refresh={true} /></div>
			   
			</Form>
			
		  
		</div>
		);
  	
};

export default PointAdd;