import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Pergebnis.css';
import {Link} from 'react-router-dom';

function Pergebnis (){



let wname ='kein';
let hname ='keine';
let wges;
let hges;
let wgro;
let hgro;
let hgew;
let wgew;

const[result, setResult]= useState([]);
const[hilfsstoff,setHilfsstoff]=useState([]);
const[wirkstoff,setWirkstoff]=useState([]);
useEffect(()=>{
    Axios.get("http://localhost:3001/api/prufenresult").then((response)=>{
        if(response.data.length > 0){
            setResult(response.data)
        }
    }); 
  },[]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/philfsstoff").then((response)=>{
        if (response.data.length > 0){
             setHilfsstoff(response.data);
        } 
    }); 
  },[]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/pwirkstoff").then((response)=>{
        if (response.data.length > 0){
             setWirkstoff(response.data);
        } 
    }); 
  },[]);

  const fachartikelLesen =(stoffName)=>{
    Axios.post(`http://localhost:3001/api/lesenww/${stoffName}`)
  } ;
  const fachartikelLesen_h =(hilfStoffName)=>{
    Axios.post(`http://localhost:3001/api/lesenhf/${hilfStoffName}`)
  } ;

  const checkFunk = (()=>{
    let check = false;
         if (result.length > 0){ check=true;}
         return check ;
})
function erg(){
    if (checkFunk() === false ){
        return (<section className="EndResult">
            <h1 className="Result1" >Negative</h1>
        </section>
        )
    }
      return (
        <section className="EndResult">
        <h1 className="Result2" >Positive</h1>
    </section>
      )
            
    }

    function erg2(){
      if (checkFunk() === false ){
          return (<section className="Begrundung">
            <h1 className="StoffName">Begündung:</h1>
            <p className="beschreibung"> die beiden stoffe passen nicht zusammen,
             da sie über verschiedene Eigenschaften verfügen.
              Der Unterschied kann man über die unten gestellten Tabelle merken. </p>
              
          </section>
          )
      }
        return (
          <section className="Begrundung">
       <h1 className="StoffName">Begündung:</h1>
       <p className="beschreibung"> die beiden stoffe passen zusammen,
             da sie über gleiche bzw. ähnliche Eigenschaften verfügen.
              Die Ähnlichkeit kann man über die unten gestellten Tabelle merken. </p>
      </section>
        )
              
      }
     
      
     
    return (
        <section >
            <section className="ErgebnisPage">
              <section className="UpLine">
            {
               wirkstoff.map((val)=>{
                wname=val.wirkstoffName;
                wges=val.aspect_ratio;
                wgro=val.molekularerGroesse;
                wgew=val.molekularerGewicht;
                 return(
                  <section key={val.wirkstoffName}> 
              
                  <h1 className="P_ElementRes"> Wirkstoff </h1>
                  <Link to="/Fachartikel"  onClick={
                      ()=> fachartikelLesen(val.wirkstoffName)
                  } className="linkItem">
                      <h1 className="Stoff1">  {val.wirkstoffName} </h1> 
                  </Link> 
                 </section>)})}
                  {
              hilfsstoff.map((val)=>{
                hname=val.hilfsstoffName;
                hges=val.aspect_ratio;
                hgro=val.molekularerGroesse;
                hgew=val.molekularerGewicht;
                return(
                  <section key={val.hilfsstoffName}> 
                  
                  <h1 className="P_ElementRes"> Hilfsstoff </h1>
                  <Link to="/Fachartikelh"  onClick={
                      ()=> fachartikelLesen_h(val.hilfsstoffName)
                  } className="linkItem">
                      <h1 className="Stoff1">  {val.hilfsstoffName} </h1> 
                  </Link>
                 </section>)})}
            <h1 className="P_ElementResS"> Result: </h1>
             {erg()}
             </section>

             {
               wirkstoff.map((val)=>{
                 return(
                  <section key={val.wirkstoffName}> 
                  <section className="EinzelStoff">
                  <Link to="/Fachartikel"  onClick={
                      ()=> fachartikelLesen(val.wirkstoffName)
                  } className="linkItem">
                      <h1 className="StoffName"> {val.wirkstoffName} </h1> 
                  </Link>
                <p className="beschreibung"> {val.beschreibung} </p>
                    </section> <section>
                    <hr className="Seperator" />
                        </section>
                        </section>


                 );
               })
             }
             {
              hilfsstoff.map((val)=>{
                return(
                  <section key={val.hilfsstoffName}> 
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
                        </section>

                )
              })
             }
              {
                erg2()
              }
              <section className="BTable">
              <table>
                               <thead>
                               <tr>
                                 <th>Stoff</th>
                                <th> Wirkstoff</th>
                                 <th>Hilfsstoff</th>
                                 </tr>
                                 </thead>
                                  <tbody>
                       
                               
                                  <tr>
                                  <td>Name </td>
                                 <td>{wname}</td>
                                 <td>{hname}</td>
                                 </tr>  
                                 <tr>
                                  <td>Aspect Ratio </td>
                                 <td>{wges}</td>
                                 <td>{hges}</td>
                                 </tr> 
                                 <tr>
                                  <td>Größe </td>
                                 <td>{wgro}</td>
                                 <td>{hgro}</td>
                                 </tr> 
                                 <tr>
                                  <td>Mol Mass </td>
                                 <td>{wgew}</td>
                                 <td>{hgew}</td>
                                 </tr> 
                                 </tbody>   </table>
              </section>
             </section>
        </section>
       
      
         ); 
}
export default Pergebnis;

