import axios from "axios";

const API_URL = "http://localhost:8080/api/add/";

const RouteAdd = (routename,category,userid) => {
  return axios.post(API_URL + "route", {
    routename,
    category,
    userid
  });
};

const DeleteRoute = (routeid) => {
  return axios.delete(API_URL + "deleteroute", {
    routeid
  });
};

const RouteService = {
  RouteAdd
};

export default RouteService;