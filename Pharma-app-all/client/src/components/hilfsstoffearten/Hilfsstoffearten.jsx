import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Hilfsstoffearten.css';
import {Link} from 'react-router-dom';

function Hilfsstoffearten (){
    const [arten, setArten] = useState([]); //art sind gedacht
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/hilfsstoffearten").then((response)=>{
            setArten(response.data)
        }); 
      },[]);
      
    const artHilfsstoffe =(artName)=>{ //artnameveriable senden
        Axios.post(`http://localhost:3001/api/arths/${artName}`)
      } ;
  

      function testsyno(x) {
        let result ='keine' ;
        if (x) {
          result = x;
        } 
        return result;
      }
    return (
       <section className="GesamtListArt">
        {arten.map((val)=>{
            return ( <section key={val.artName} > 
            <section className="EinzelArt"  >
                    <Link to="/Hilfsstoffenlist"  onClick={
                    ()=> artHilfsstoffe(val.artName)
                } className="linkItem">
                    <h1 className="ArtName"> {val.artName} </h1> 
                </Link>
               
              <p className="beschreibungArt"> {val.beschreibung} </p>
              <p className="elementArt"> Beispiel: </p>
              <p className="beschreibungArt" >{testsyno(val.beispiel)}</p>
              <p className="elementArt"> Literatur: </p>
              <p className="beschreibungArt"> {val.literatur}</p>
                  
                  <hr className="Seperator" />
                      </section>
                      </section>);
              
            })
            };
         </section> );
}
export default Hilfsstoffearten;

