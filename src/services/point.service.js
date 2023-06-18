import axios from "axios";
import React, { useState, useRef } from "react";

const API_URL = "http://localhost:8080/api/add/";


const PointAdd = (pointname,description,latitude,longitude,category,seqnum,routeid,userid) => {
  console.log(latitude);
  console.log(longitude);  
  console.log(routeid); 
  return axios.post(API_URL + "point", {
	pointname,
	description,
	latitude,
	longitude,
	category,
	seqnum,
	routeid,
	userid
  });
};

const PointAll = () => {
  const [points, setPoints] = useState({data: []});

  return axios.get(API_URL + "pointall",)
        .then(response => {
          setPoints(response.data);
	})
};

const PointAllByUserId = (userid) => {
  const [points, setPoints] = useState({data: []});

  return axios.get(API_URL + "pointallbyuserid",
	{userid}
  )
        .then(response => {
          setPoints(response.data);
	})
};

const PointService = {
  PointAdd
};

export default PointService;