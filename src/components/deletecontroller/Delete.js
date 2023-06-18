import { Component , useState } from "react";
import RouteService from "../../services/route.service";
import axios from "axios";
import DisplayUserRoute from "../displayuserroute/DisplayUserRoute";



function Delete(props) {
	
   const [routeId, setRouteId] = useState(props.routeId); 
  
  function handleDelete(e) {

    e.preventDefault();
	  
	console.log(routeId);
    const API_URL = "http://localhost:8080/api/add";

	console.log('Route id is:',routeId); 
	
	axios.delete(`${API_URL}/deleteroute`,{
	  params: {
		routeid:routeId
		}})
			.then((response) => {
			console.log(response.data);
		}).catch(error => {
		console.log(error);
	});

  }
  
  return (
    <form>
      
	<div class="container bg-light">
        <div class="col-md-12 text-center">
            <button onClick={handleDelete}>Διαγραφή διαδρομής!</button>
		</div>
    </div>
	  
	  
    </form>
  )
}


export default Delete;
