import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import socketIO from "socket.io-client"
import '../index.css'
import AuthService from "../../../../../services/auth.service"

const socket = socketIO.connect("http://localhost:4000");
const Home = () => {
    const navigate = useNavigate()
    //const [userName, setUserName] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        //localStorage.removeItem("userName")
        
        const user = AuthService.getCurrentUser();
        
        console.log(user);
        console.log(localStorage.getItem("userName"));
        console.log(socket.id);
        const socketid = socket.id;
        //socket.disconnect()
        let userName = user.username
        console.log("within case where userName is in localstorage")
        
        localStorage.setItem("userName", user.username)
        socket.emit("newUser", {userName, socketID: socket.id})
         
        
        navigate("/chat")
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Είσοδος στην εφαρμογή συνομιλίας</h2>
        <button className='home__cta'>Συνομιλία</button>
    </form>
  )
}

export default Home