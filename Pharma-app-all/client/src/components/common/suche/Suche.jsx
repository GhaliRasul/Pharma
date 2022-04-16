import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Suche.css';
import {Link} from 'react-router-dom';

function Suche (){

    const[suchbegriff,setSuchbegriff]=useState([]);
    const[ergebnis,setErgebnis]=useState([]);
    
    const[sf,setSf] = useState([]);


    
    

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/ergebnis").then((response)=>{
            if(response.data.length > 0){
                setErgebnis(response.data);
               
            } 
        }); 
      },[]);
      useEffect(()=>{
        Axios.get("http://localhost:3001/api/suchfielf").then((response)=>{
            if(response.data.length > 0){
                setSf(response.data);
            } 
        }); 
      },[]);

       const search = (()=>{
           let check = false;
                if (ergebnis.length > 0){ check=true;}
                return check ;
       });
       
       const search2 = (()=>{
        let check = false;
             if (sf.length > 0){ check=true;}
             return check ;
    });
    


    const suchKlick =(stoff)=>{ //artnameveriable senden
        Axios.post(`http://localhost:3001/api/such/${stoff}`)
      } ;

     


      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

   function linkto(x,sn){
          if(x==='Wirkstoff'){
              return ("/Fachartikel");
          }
          if(x==='Hilfsstoff'){
              return("/Fachartikelh");
          }
          if(sn==='rot'){
            return("/Fachartikelh");
        }
          
      }
      function welcheFach(x,id){
            
       if(x==='Hilfsstoff'){
           Axios.post(`http://localhost:3001/api/lesenhf/${id}`)
       }if(x==='Wirkstoff'){
        Axios.post(`http://localhost:3001/api/lesenww/${id}`)
       }
        
      }
     
 
      function erg(){
      if (search() === false ){
        if (search2() === true ){
          return ( <section>
            {sf.map((val)=>{
              return (<p className="ResulBes">Ergebnisse zu: {val.suchfield} </p> )
            })
            }
            <p className="nichts"> Leider nichts gefunden</p>
          </section>
          )
      }}
     
        return (

          <section>
            {sf.map((val)=>{
              return (<p className="ResulBes">Ergebnisse zu: {val.suchfield} </p> )
            })
            }
            
          
           { ergebnis.map((val)=>{
              
                    return(
                        <section className="reult" key={val.stoffname}>
                            <Link to={linkto(val.type,val.stoffname)}  onClick={
                    ()=>  welcheFach(val.type,val.stoffname)
                } className="linkItem">
                    <h1 className="SearchStoff"> {capitalizeFirstLetter(val.stoffname)} </h1> 
                </Link> 
                        <p className="ResulBes">{val.beschreibung} </p>
                        <p className="ResulBes">{val.type} </p>
                        <p className="ResulBes">Synonyme: {val.synononyme} </p>
                        
                       </section>
                    )})}
                    </section>
        )
              
      }
      function testsyno(x) {
        let result ='keine' ;
        if (x) {
          result = x;
        } 
        return result;
      } console.log(suchbegriff);


    return (
        <section className ="SuchenErgebnis">
            <section className="Suchen">
                <label className="SuchLabel">Stoff:</label>
                <input type="text" className="SuchInput"  
                 onChange={(e)=>setSuchbegriff(e.target.value)}
                 placeholder="bitte Stoff eingeben" ></input>
                 <button className="suchbutton" onClick={()=>{suchKlick(suchbegriff); window.location.reload(); }}>Suche</button>

            </section>
            <section>
               {erg() }
            
            </section>
              
        </section>
      
         ); 
}
export default Suche;

