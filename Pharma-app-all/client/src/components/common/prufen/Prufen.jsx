import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Prufen.css';
import {Link} from 'react-router-dom';


function Prufen (){
const[hilfsstoff1,setHilfsstoff1]=useState("");
const[wirkstoff1,setWirkstoff1]=useState("");

const prufDaten =() =>{
    Axios.post("http://localhost:3001/api/prufent",{wirkstoff:wirkstoff1,hilfsstoff:hilfsstoff1});
    setHilfsstoff1("");
    setWirkstoff1("");
};


    
      
     
    return (
        <section className ="Prufungsformat">
         <label className="StoffLabel">Wirkstoff:</label>
         <input type="text" name="Wirkstoff" className="Stoffinput" 
         onChange={(e)=>{setWirkstoff1(e.target.value)}} required></input>
         <label className="StoffLabel">Hilfsstoff:</label>
         <input type="text" name="Hilfsstoff" className="Stoffinput"
         onChange={(e)=>{setHilfsstoff1(e.target.value)}} required></input>
         <Link to="/Pergebnis"> 
            <button className="PrufButton" onClick={prufDaten }
            >Prüfen</button> </Link>
        </section>
      
         ); 
}
export default Prufen;

