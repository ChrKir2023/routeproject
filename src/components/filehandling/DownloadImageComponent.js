import React, { useState, useRef, useForm, useEffect, Component } from 'react';
import { useParams, useSearchParams, useNavigate ,useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import FileService from '../../services/FileService';
import axios from "axios";

function DownloadImageComponent() {


  const API_URL = "http://localhost:8080/file/download/";
  const [myData,setMyData] = useState(new Blob());
  const [error, setError] = useState(null);
  let { routeid, pointid } = useParams();
  const [fileData,setFileData] = useState();
  const [message, setMessage] = useState("");
  const [fileupload,setFileUpload] = useState();
  const navigate = useNavigate();

  const navigateUser = () => {
    navigate(-1);
  };

  const downloadFile = (e) => {

      e.preventDefault();
      

     //const fileName = '06391131052023_IMG_20220430_130537.jpg'; // Replace with the desired file name
     

     console.log(routeid);
     console.log(pointid);

     

      //console.log(API_URL+fileName);

      /* axios.post(API_URL+'/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
            if(res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });*/

        /*downloadRandomImage = () => {
        fetch('http://localhost:8080/api/files')
          .then(response => {
            const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
            response.blob().then(blob => {
              let url=  window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = url;
              a.download = filename;
              a.click();
            });
        });*/

        try {
        /*  const response =  axios.get(API_URL+fileName,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin" :"*",
              "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            responseType: "json",
          },);*/

         /* let myData = "";
          const [myValue,setMyValue] = useState(null);

          async function status() {
              const url = API_URL+fileName;
              const resp = await axios.get(url);
              return resp.data;
           }

           status().then(data => console.log(data));*/
         /*async function status() {
           const url = 'http://localhost:8080/file/findbyrouteidpointid';
           return axios.get(url,{responseType: "json",}).then((resp) => {
             return resp.data;
           });
         }*/


          (async () => {
              //let downloadUri;
              let fileUpload; 
                
              function finddownloaduri() {

                //File retrieved by the database

                const url = 'http://localhost:8080/file/findbyrouteidpointid';
                return axios.get(url,
                  {params: {
                    routeid:routeid,
                    pointid:pointid
                  }}).then((resp) => {
                  //return resp.data.fileDownloadUri;
                  return resp.data;
                });
              }
              
              //downloadUri = await finddownloaduri();
              fileUpload = await finddownloaduri();
              console.log(fileUpload);
              let downloadUri = fileUpload.fileDownloadUri;
              console.log(fileUpload.fileDownloadUri);
              let fileName = fileUpload.uploaderName;
              console.log(fileName);
              fileName = fileName+'.jpg';
              
             
              let data;
              function status() {

                //File retrieved by the database

                const url = API_URL;
                console.log(url);
                return axios.get(url,
                  {responseType: "blob",
                  params: {
                    downloadUri:downloadUri
                  }},).then((resp) => {
                  return resp.data;
                });
              }
              data = await status();
              console.log(data);

              const blob = new Blob([await status()]);
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = fileName; // Replace with the desired file name
              link.click();

              // Clean up the temporary URL
              window.URL.revokeObjectURL(url);


            })();

          /*

          downloadRandomImage = () => {
            fetch('http://localhost:8080/api/files')
              .then(response => {
                const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                  let url=  window.URL.createObjectURL(blob);
                  let a = document.createElement('a');
                  a.href = url;
                  a.download = filename;
                  a.click();
                });
            });
          }

          */


          //console.log(response.blob);
          //const dataPromise = promise.then((response) => response.data)
          //console.log(response.data);
          //const blob = new Blob([response.data]);
          //const blob = new Blob([response.blob]);
          //const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
          //console.log(filename);
          //console.log(blob);
          // Create a temporary URL for the blob
          //const url = window.URL.createObjectURL(blob);

          // Create a download link
          //const link = document.createElement('a');
          //link.href = url;
          //link.download = fileName; // Replace with the desired file name
          //link.click();

          // Clean up the temporary URL
          //window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading file:', error);
        }


 };


    return (
      
      <div>
        <div id="closepage">
            <a href='#' onClick={() => navigateUser()}> Επιστροφή στην προηγούμενη σελίδα </a>
        </div>
        &nbsp;
				&nbsp;
        <hr/>
        <button onClick={downloadFile}>Κατέβασμα εικόνας</button>
      </div>
    );

};

export default DownloadImageComponent;
