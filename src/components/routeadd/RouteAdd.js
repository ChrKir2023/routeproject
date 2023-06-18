import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import PointAdd from "../pointadd/PointAdd";
import ReactDOM from "react-dom/client";
import Select, { AriaOnFocus } from "react-select";


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
        Ο αριθμός των ψηφίων πρέπει να είναι μεγαλύτερος από 6.
      </div>
    );
  }
};

const vPointName = (value) => {
 if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ο αριθμός των ψηφίων πρέπει να είναι μεγαλύτερος από 6.
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
  const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const [category, setCategory] = useState("");

  const options = [
    { label: 'Αρχαία', value: 'Αρχαία' },
    { label: 'Θρησκευτική', value: 'Θρησκευτική' },
    { label: 'Ιστορική', value: 'Ιστορική' },
  ];

  const onChangeRouteName = (e) => {
    const routename = e.target.value;
		setRoutename(routename);
  };

  const onFocus: AriaOnFocus<ColourOption> = ({ focused, isDisabled }) => {
    const msg = `Έχετε επιλέξει την επιλογή ${focused.label}${
      isDisabled ? ', disabled' : ''
    }`;
    setAriaFocusMessage(msg);
    return msg;
  };
  

  const style: { [key: string]: CSSProperties } = {
    blockquote: {
      fontStyle: 'italic',
      fontSize: '.75rem',
      margin: '1rem 0',
    },
    label: {
      fontSize: '.75rem',
      fontWeight: 'bold',
      lineHeight: 2,
    },
  };	

  const onChangeCategory = (selectedOption) => {
		 setCategory(selectedOption);
   };
  
  const handleRouteAdd = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
	let routeid = "";

    form.current.validateAll();
	
	console.log("Category is:",category);
	let categoryVal = category.value;
   
	  if (routename.length > 6){	
		  RouteService.RouteAdd(routename,categoryVal,currentUser.id).then(
			(response) => {
			  setMessage(null);
			  setSuccessful(true);
			  setRoutenamebk(routename);
			  setRoutenameid(response.data);
			  routeid=Number(response.data);
			  console.log(routenameid);
			  console.log(routeid);
			  console.log(response.data);

			  console.log(routeid);
				setSuccessful(true);
				const pointrender = ReactDOM.createRoot(document.getElementById('pointid'));
				pointrender.render(<PointAdd routeid={routeid} succesfull={false} />);

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
						'Ο αριθμός των ψηφίων πρέπει να είναι μεγαλύτερος από 6.';
					  setMessage(resMessage);
		}	
	
	setRoutename('');

};

  return (
  <div className="col-md-12">
    
	    
        <Form onSubmit={handleRouteAdd} ref={form}>
		  {!successful &&
            (<div>
              <div className="form-group">
                <label htmlFor="routename">Όνομα διαδρομής</label>
                <Input
                  type="text"
                  className="form-control"
                  name="routename"
                  value={routename}
                  onChange={onChangeRouteName}
                />
              </div>
			  &nbsp;
			  		<div>
							<label style={style.label} id="aria-label" htmlFor="aria-example-input">
								Επιλέξτε την κατηγορία διαδρομής
							  </label>

							  {!!ariaFocusMessage && !!isMenuOpen && (
								<blockquote style={style.blockquote}>"{ariaFocusMessage}"</blockquote>
							  )}

							  <Select
								aria-labelledby="aria-label"
								ariaLiveMessages={{
									onFocus,
								}}
								inputId="aria-example-input"
								name="category"
								defaultValue={options[0]}
								onMenuOpen={onMenuOpen}
								onMenuClose={onMenuClose}
								options={options}
								onChange={onChangeCategory}
								value={category}
							  />
						</div>
						&nbsp;
			  <div className="form-group">
                <button className="btn btn-primary btn-block">Προσθήκη διαδρομής</button>
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
					<h1>H ονομασία της διαδρομής είναι: {routenamebk}</h1>
				</div>
			}
			
			<div id='pointid'></div>	
    
   </div>	
  );
};

export default RouteAdd;