import { Component , useState } from "react";

function Delete(props) {
	
   const [routeId, setRouteId] = useState(props.routeId); 
  
  function handleClick() {
	  
    const API_URL = "http://localhost:8080/api/add";

	console.log('Route id is:',props.routeId); 
	let wsDelete = 'delete/'+props.routeId;
	console.log(wsDelete);
	let response;
    
	// Simple DELETE request with fetch
    fetch(wsDelete, {  // Enter your IP address here
	  method: 'DELETE', 
	  headers: { 'Content-Type': 'application/json' },
	  mode: 'cors'
	   // body data type must match "Content-Type" header
	}).catch(function(error) {
        console.log(error);
    });
	
  }	
  
  return (
    <form>
      
	<div class="container bg-light">
        <div class="col-md-12 text-center">
            <button onClick={handleClick}>Διαγραφή διαδρομής</button>
        </div>
    </div>
	  
	  
    </form>
  )
}


export default Delete;
