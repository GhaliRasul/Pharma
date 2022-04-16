import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Hilfsstoffe.css';
import {Link} from 'react-router-dom';
import PageTitle from "../pageTitle";

function Hilfsstoffe (){
    const [hilfsstoffe, sethilfsstoffe] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/his").then((response)=>{
            sethilfsstoffe(response.data)
        }); 
      },[]);
      
     const fachartikelLesen_h =(hilfStoffName)=>{
        Axios.post(`http://localhost:3001/api/lesenhf/${hilfStoffName}`)
      } ;
      function capitalizeFirstLetter(string) {
          if(string) { 
        return string.charAt(0).toUpperCase() + string.slice(1);}
        return string ;
      }
      function pageTitle (){
        const arrP =[];
        hilfsstoffe.map((val)=>{
            arrP.push(val.art)
        });
        return arrP[arrP.length-1];
      }
      
    return (
        <section>
    <PageTitle title= { capitalizeFirstLetter(pageTitle())  } ></PageTitle>
       <section className="GesamtListHilf">
            
           {hilfsstoffe.map((val)=>{
            return ( <section key={val.hilfsstoffName}> 
                   
                <section className="EinzelStoff">
                <Link to="/Fachartikelh"  onClick={
                    ()=> fachartikelLesen_h(val.hilfsstoffName)
                } className="linkItem">
                    <h1 className="StoffName"> {val.hilfsstoffName} </h1> 
                </Link>
              <p className="beschreibung"> {val.beschreibung} </p>
                  </section> <section>
                  <hr className="Seperator" />
                      </section>
                      </section>);
              
            })
            }; </section> 
            </section>);
        }
export default Hilfsstoffe;