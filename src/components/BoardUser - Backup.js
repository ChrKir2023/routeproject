import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
/*import CurrentLocation from "./geolocation/CurrentLocation";*/
import RouteAdd from "./routeadd/RouteAdd";
import PointAdd from "./pointadd/PointAdd";
import SearchElements from "./searchelements/SearchElements";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import AuthService from "../services/auth.service";

const BoardUser = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  const [searchvisible, setSearchvisible] = useState(false);
  const [searchElements, setSearchElements] = useState(true);
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
     
    }
  }, []);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
			  error.message ||
			  error.toString();
			setContent(_content);
      }
    );
  }, []);
  
  return (
  
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
		{currentUser && (
		     <div>
			    <RouteAdd />
			 </div>
		)}	 
		</header>
    </div>
	
  );
  
};

export default BoardUser;