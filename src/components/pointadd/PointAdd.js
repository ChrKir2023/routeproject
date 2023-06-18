import React, { useState, useRef, useForm, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import SearchElements from "../searchelements/SearchElements";
import SearchElementsByDistance from "../searchelembydistance/SearchElementsByDistance";
import ReactDOM from "react-dom/client";
import Select, { AriaOnFocus } from "react-select";
import UploadImageComponent from "../filehandling/UploadImageComponent";

import PointService from "../../services/point.service";

const required = (value) => {
  if (!(value !== "")
	  || !(value === "") && (value.length < 6 || value.length > 40)) {
    return (
      <div className="alert alert-danger" role="alert">
        Παρακαλώ τοποθετήστε τιμή!
      </div>
    );
  }
};


const vPointName = (value) => {
 if (!(value === "") && (value.length < 6 || value.length > 40)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ο αριθμός των ψηφίων πρέπει να είναι μεγαλύτερος από 6.
      </div>
    );
  }
};

function PointAdd(props){
  
  const form = useRef();
  const checkBtn = useRef();
  
  const isDisplayed = props.isDisplayed;
  const routenameid = props.routeid;

  const [pointname, setPointname] = useState("");
  const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");
  {/*const [file, setFile] = useState("");*/}
  const [file, setFile] = useState('');
  const [message, setMessage] = useState("");
  const [pointmessage, setPointmessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const formRef = useRef(null);
 
  const currentUser = AuthService.getCurrentUser();
  const [lat,setLat] = useState(null);
  const [lng,setLng] = useState(null);
  const [distance,setDistance] = useState(null);
  const [status,setStatus] = useState(null);
  const [searchvisible, setSearchvisible] = useState(false);
  const [searchElements, setSearchElements] = useState(true);

  const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const options = [
    { label: 'Αρχαία', value: 'Αρχαία' },
    { label: 'Θρησκευτική', value: 'Θρησκευτική' },
    { label: 'Ιστορική', value: 'Ιστορική' },
  ];

  const onFocus: AriaOnFocus<ColourOption> = ({ focused, isDisabled }) => {
    const msg = `Έχετε επιλέξει την επιλογή ${focused.label}${
      isDisabled ? ', disabled' : ''
    }`;
    setAriaFocusMessage(msg);
    return msg;
  };
  
  const styles = {
	  fontFamily: "sans-serif",
	  textAlign: "center"
	};

  const onChangePointName = (e) => {
	setPointmessage("");  
    const pointname = e.target.value;
		setPointname(pointname);
	};

   const onChangeCategory = (selectedOption) => {
		 setCategory(selectedOption);
   };
	
   const onChangeDescription = (e) => {
		 const description = e.target.value;
		 setDescription(description);
   };	  

   {/*const onFileChange = (e) => {
		 const file = e.target.file;
		 setFile(file);
   };*/}
	
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

   const pointProps = {
		lat : lat,
		lng : lng,
		distance: "50" 
	}; 
	
	const resetForm = () => {
		setPointname(null);
	    setDescription(null);
	}
	
	function clearFields(event) {
	   // we have to convert event.target to array
	   // we use from method to convert event.target to array
	   // after that we will use forEach function to go through every input to clear it
	   Array.from(event.target).forEach((e) => (e.value = ""));
   }

  useEffect(() => {
    // invalid url will trigger an 404 error
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

  },[lat,lng]); 	
  
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
 
  const handlePointAdd = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(true);
	setPointmessage("");

    form.current.validateAll();
	
	console.log(pointname);
	console.log(routenameid);

	let categoryVal = category.value;
	
	console.log(lat);
	console.log(lng);
	
	if (pointname === ""){
		 setPointmessage("Παρακαλώ τοποθετήστε τιμή!");
	} else {	

		if (checkBtn.current.context._errors.length === 0) {
			
			const data = new FormData();
			
			data.append(
				"file",
				file,
				);
			
			
		PointService.PointAdd(pointname,description,lat,lng,categoryVal,1,routenameid,currentUser.id).then(
			(response) => {
			  setMessage(response.data.message);
			  setSuccessful(true);
			  setPointname("");
			  setDescription(""); 
			  setCategory("");

			  console.log(routenameid);
			  const searchrender = ReactDOM.createRoot(document.getElementById('displaysearch'));
			  searchrender.render(<SearchElements refresh="true" routeid={routenameid} />);

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
		  
		}
	}	
	
  };
   
	  return (
	    
		<div id="div2" className="col-md-12">
			
			<Form onSubmit={handlePointAdd} ref={form}>
			  
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
					  validations={[vPointName]}
					/>
					{pointmessage && (
						
						  <div className="alert alert-danger" role="alert">
							Παρακαλώ τοποθετήστε τιμή!
						  </div>
						  
					  )}
					<label htmlFor="description">Περιγραφή</label>
					<Input
					  type="text"
					  className="form-control"
					  name="description"
					  value={description}
					  onChange={onChangeDescription}
					/>
					&nbsp;
						<div>
							<label style={style.label} id="aria-label" htmlFor="aria-example-input">
								Επιλέξτε την κατηγορία σημείου
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
					
				  </div>
					
					
				  <div className="form-group">
					<button className="btn btn-primary btn-block">Προσθήκη σημείου</button>
				  </div>
				  <hr/>
				</div>
			 
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
			  <div id='displaysearch'></div>
			  <div id='displaymap'></div>
			</Form>
			
		  
		</div>
		);
  	
};

export default PointAdd;