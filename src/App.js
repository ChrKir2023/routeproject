import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";


import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import DisplayMap from "./components/DisplayMap";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import DisplayPoints from "./components/displaypoints/DisplayPoints";
import DisplayPolyLine from "./components/DisplayPolyLine";
import UploadImageComponent from "./components/filehandling/UploadImageComponent";
import DownloadImageComponent from "./components/filehandling/DownloadImageComponent";
import HomeChatPage from "./components/chatapp/client/src/components/Home";
import ChatPage from "./components/chatapp/client/src/components/ChatPage";
import socketIO from "socket.io-client";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const socket = socketIO.connect("http://localhost:4000");

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showMapBoard, setShowMapBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    if (localStorage.getItem(currentUser)){
      localStorage.removeItem(currentUser);
    }  
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Αρχική σελίδα
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
		  

		  
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Περιεχόμενο χρήστη
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/chathome"} className="nav-link">
                Συνομιλία χρήστη
              </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Αποσύνδεση
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Σύνδεση
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
		  <Route path="/map">
				<Route path=":id/:longitude/:latitude" element={<DisplayMap />} />
		  </Route>
      <Route path="/displaypoints">
				<Route path=":routeid" element={<DisplayPoints />} />
		  </Route>
      <Route path="/polyline">
				<Route path=":routeid" element={<DisplayPolyLine />} />
		  </Route>
          <Route path="/uploadfile">
				<Route path=":routeid/:pointid" element={<UploadImageComponent />} />
		  </Route>
           <Route path="/downloadfile">
				<Route path=":routeid/:pointid" element={<DownloadImageComponent />} />
		  </Route>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/chathome" element={<HomeChatPage/>}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
       
      </div>
	</div>
	);
};

export default App;