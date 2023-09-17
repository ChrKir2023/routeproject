import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import PaginationDetails from "./PaginationDetails";

function Pointspagination(props) {
  const pageNumberLimit = 4;
  const [pointsData, setPointsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  let valrouteid = props.routeid;
   
  useEffect(()=>{
    setLoading(true);

    const user = AuthService.getCurrentUser();
		const userid = user.id;
    console.log(userid);
    fetch(`https://20.170.39.172:8443/api/add/pointbypageandsize?page=${currentPage}&userid=${userid}&size=5&routeid=${valrouteid}`)
        .then(response => response.json())
        .then(data => {
          setPointsData(data);
          setLoading(false);
        }).catch((e) => {
           console.error(`An error occurred: ${e}`)
        });
  },[currentPage]);

  console.log(pointsData);
  console.log(loading);
  console.log(valrouteid);
 
  const onPageChange= (pageNumber)=>{
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  }

  const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
   }
  
  const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
    }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: pointsData,
  };

  return(
    <div>
        <h4>Λίστα σημείων διαδρομής</h4>
        {!loading ? <PaginationDetails {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          routeid = {valrouteid} />
        : <div> Loading... </div>
        }
    </div>
  )
}

export default Pointspagination;
