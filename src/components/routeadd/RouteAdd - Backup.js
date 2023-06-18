import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import PointAdd from "../pointadd/PointAdd";

import RouteService from "../../services/route.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vRouteName = (value) => {
 if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be greater than 6.
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

function RouteAdd(){
	
  const form = useRef();
  const checkBtn = useRef();

  const [routename, setRoutename] = useState("");
  const [routenamebk, setRoutenamebk] = useState("");
  const [routenameid, setRoutenameid] = useState("");
  const [pointname, setPointname] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  const onChangeRouteName = (e) => {
    const routename = e.target.value;
		setRoutename(routename);
  };
  
  const handleRouteAdd = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
	console.log("Check handleRouteAdd ");

   
	  if (routename.length > 6){	
		  RouteService.RouteAdd(routename).then(
			(response) => {
			  setMessage(null);
			  setSuccessful(true);
			  setSuccessful(true);
			  setRoutenamebk(routename);
			  setRoutenameid(response.data);
			  console.log(response.data);
			},
			(error) => {
					const resMessage =
						(error.response &&
						  error.response.data &&
						  error.response.data.message) ||
							error.message ||
							error.toString();
					  setSuccessful(false);
					  setMessage(resMessage);
				}
			);
			
		} else {
			const resMessage =
						'Should import value to field with length bigger than 6';
					  setMessage(resMessage);
		}	
	
	setRoutename('');
};

  return (
  
  <div className="container mt-3">
    <div className="col-md-12">
	    
        <Form onSubmit={handleRouteAdd} ref={form}>
		  {!successful &&
            (<div>
              <div className="form-group">
                <label htmlFor="routename">Route Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="routename"
                  value={routename}
                  onChange={onChangeRouteName}
                />
              </div>
			  
			  <div className="form-group">
                <button className="btn btn-primary btn-block">Add Route</button>
              </div>
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
			
        </Form>
			{successful && <div>
					<h1>Display value is {routenamebk}{routenameid}</h1>
				</div>
			}
		<div><PointAdd routeid={routenameid}/></div>	
      
    </div>
   </div>	
  );
};

export default RouteAdd;