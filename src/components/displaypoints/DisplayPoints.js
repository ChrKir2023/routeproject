import React, { useState, useRef, useForm, useEffect, navigate, nav} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import CurrentLocation from "../geolocation/CurrentLocation";
import SearchElementsByRouteId from "../searchelementsbyrouteid/SearchElementsByRouteId";
import SearchElementsByDistance from "../searchelembydistance/SearchElementsByDistance";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate} from "react-router-dom";
import Select, { AriaOnFocus } from "react-select";
import PointsPagination from "../paginationcomponent/Pointspagination";


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

function DisplayPoints(props){
  
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
  const [points,setPoints] = useState("");
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
  const navigate = useNavigate();

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


  const onChangePointName = (e) => {
	setPointmessage("");  
    const pointname = e.target.value;
		setPointname(pointname);
	};
	
   const onChangeDescription = (e) => {
		 const description = e.target.value;
		 setDescription(description);
   };	  

   
   const onChangeCategory = (selectedOption) => {
		 setCategory(selectedOption);
   };
   
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

   let { routeid } = useParams();
  console.log(routeid);

  useEffect(() => {
     navigator.geolocation.getCurrentPosition(position => {
       const {lat, lng} = position.coords;
        setLat(position.coords.latitude);
	    setLng(position.coords.longitude);   
     });
	 
	 /* const user = AuthService.getCurrentUser();
		const userid = user.id;
		console.log(userid); 
	 
		fetch(`http://localhost:8080/api/add/pointallbyuseridandrouteid?userid=${userid}&routesid={routeid}`)
         .then(response => response.json())
         .then(data => {
           setPoints(data);
         }).catch((e) => {
                console.error(`An error occurred: ${e}`)
         });*/

     /*const searchrender = ReactDOM.createRoot(document.getElementById('displaysearch'));
	 searchrender.render(<SearchElementsByRouteId refresh="true" routeid={routeid} />);*/

	 const pagerender = ReactDOM.createRoot(document.getElementById('pagesearch'));
	 pagerender.render(<PointsPagination routeid={routeid} />);

	 console.log(lat);
	 console.log(lng);
	 
	 
   }, []);

   const goBack = () => {
	navigate('/user')
   }
  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
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
    
  const navigateUser = () => {
    // 👇️ navigate to /
    navigate(-1);
  };

  const handlePointAdd = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(true);
	setPointmessage("");

    form.current.validateAll();
	
	console.log(pointname);
	console.log(routenameid);
	
	
	console.log(category.value);
	let categoryVal = category.value;
	console.log(categoryVal);
	console.log(lat);
	console.log(lng);
	console.log(routenameid);	
	
	if (pointname === ""){
		 setPointmessage("Παρακαλώ τοποθετήστε τιμή!");
	} else {	

		if (checkBtn.current.context._errors.length === 0) {
			
			const data = new FormData();
			
			data.append(
				"file",
				file,
				);
			
				PointService.PointAdd(pointname,description,lat,lng,categoryVal,1,routeid,currentUser.id).then(
					(response) => {
					  setMessage(response.data.message);
					  setSuccessful(true);
					  setPointname("");
					  setDescription(""); 
					  setCategory("");

					   /*const searchrender = ReactDOM.createRoot(document.getElementById('displaysearch'));
					   searchrender.render(<SearchElementsByRouteId refresh="true" routeid={routeid} />);*/

					   const pagerender = ReactDOM.createRoot(document.getElementById('pagesearch'));
					   pagerender.render(<PointsPagination routeid={routeid} />);

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
				
		    <div id="closepage">
            	 <a href='#' onClick={() => navigateUser()}> Επιστροφή στην προηγούμενη σελίδα </a>
			</div>
			
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
							Επιλέξτε κατηγορία
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
					&nbsp;
						<div className="form-group">
								<button className="btn btn-primary btn-block">Προσθήκη σημείου</button>
						</div>
							  <hr/>
				</div>
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
				<div className="form-group">
						<div id='pagesearch' class="wrap-grid"></div>
				</div>
				</Form>
		</div>
		);
  	
};

export default DisplayPoints;