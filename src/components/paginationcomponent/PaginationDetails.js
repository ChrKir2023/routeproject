import React, { useState, useRef, useContext, createContext  } from "react";
import './pagination.css';
import { Routes, Route, Link, BrowserRouter, Router, useRoutes, useNavigate } from "react-router-dom";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const PaginationDetails = (props) => {


console.log(props.routeid);

const renderData = (data)=>{
    return(
      <div style={{width: 1050, padding: 0} }>
          <Container style={{
                    backgroundColor: 'white',
                    alignitems: 'left'
          }}>
            <div style={{border: '1px solid black'}}>
              <Row>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Όνομα 
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Περιγραφή
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Κατηγορία 
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Ανεβασμα Εικόνας  
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Κατέβασμα Εικόνας 
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Χάρτης σημείου 
                  </Col>
                  <Col style={{backgroundColor: 'white',textAlign:'center'}}>
                    Διαγραφή  
                  </Col>

                 </Row>
              </div>
              <div>
                <ul style={{listStyleType:'none'}}>
                    {points.map((d)=> 
                          <li key={d['_id']}> 
                                    
                                            <Row>
                                                <Col style={{
                                                backgroundColor: 'white',
                                                textAlign:'left'
                                                }}>
                                                  {d.pointName} 
                                                  </Col>
                                                <Col style={{
                                                    backgroundColor: 'white',
                                                    textAlign:'left'
                                                    }}>      
                                                  {d.description} 
                                                  </Col>
                                                    <Col style={{
                                                    backgroundColor: 'white',
                                                    }}>  
                                                  {d.category} 
                                                  </Col>
                                                <Col style={{
                                                backgroundColor: 'white',
                                                }}>
                                                  <BrowserRouter>
                                                      <Link to={`/uploadfile/${props.routeid}/${d.seqnum}`} className="col-sm" target="_parent">
                                                      Ανέβασμα εικόνας
                                                      </Link>
                                                  </BrowserRouter>  
                                                </Col>
                                                <Col style={{
                                                backgroundColor: 'white',
                                                }}>
                                                  <BrowserRouter>
                                                      <Link to={`/downloadfile/${props.routeid}/${d.seqnum}`} className="col-sm" target="_parent">
                                                      Κατέβασμα εικόνας
                                                      </Link>
                                                  </BrowserRouter>  
                                                </Col>
                                                <Col style={{
                                                backgroundColor: 'white',
                                                }}>
                                                  <BrowserRouter>
                                                      <Link to={`/map/${d.id}/${d.longitude}/${d.latitude}`} className="col-sm" target="_parent" rel="noopener noreferrer">
                                                      Χάρτης σημείου
                                                      </Link>
                                                  </BrowserRouter>  
                                                </Col>
                                                <Col style={{
                                                  backgroundColor: 'white',textAlign:'center'
                                                }}>
                                                    <a href='#' onClick={() => removePoint(d.id)}> Διαγραφή </a>
                                              </Col>
                                          </Row> 
                                    
                          </li>)
                        }
                </ul>
                </div>
          </Container> 
       </div> 
       
    )
}

  // init
  const API_URL = "http://localhost:8080/api/add";	
  const { currentPage, maxPageLimit, minPageLimit} = props;
  const totalPages = props.response.totalPages-1;
  let data = props.response.allPaginatedPoints;
  const [points, setPoints] = useState(data);

  console.log("Total Pages are:",totalPages);
  //console.log(" Data are: ",data);
    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }
   
 );

 const removePoint = (id) => {

    axios.delete(`${API_URL}/deletepoint`,{
      params: {
        pointid:id
        }})
            .then((response) => {
            console.log(response.data);
        }).catch(error => {
        console.log(error);
    });

    const newPoints = points.filter(
      (point) => point.id !== id
    );
    setPoints(newPoints);
    //ata = newPoints;
  };


    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }

    return (
        
      <div>
            <div className="mainData">
              {renderData(points)}
            </div>
            
            <ul className="pageNumbers"> 
               <li>
               <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Προηγούμενη</button>
               </li>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
                <li>
                   <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Επόμενη</button>
               </li>
            </ul>
            </div>
        
    )
}

export default PaginationDetails