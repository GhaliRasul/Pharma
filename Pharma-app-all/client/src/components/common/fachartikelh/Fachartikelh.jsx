import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Fachartikelh.css';
import {Link} from 'react-router-dom';




function Fachartikelh (){
    const [hilfsstoff, setHilfsstoff] = useState([]);
    const [protokol, setProtokol]=useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/einzelH_Stoff").then((response)=>{
            setHilfsstoff(response.data)
        }); 
      },[]);  

      useEffect(()=>{
        Axios.get("http://localhost:3001/api/leseProtoH").then((response)=>{
           setProtokol(response.data)
        }); 
      },[]);
      function testsyno(x) {
        let result ='keine' ;
        if (x) {
          result = x;
        } 
        return result;
      }
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      function datumFun (d){
         return d.slice(0,10)+' '+d.slice(11,19) ;
      }
    return (
        <section className="listUndLiteratur">
       <section className="GesamtList2">
           {hilfsstoff.map((val)=>{
            return ( <section className="stoffTitel" key={val.hilfsstoffName}>
                    <h1 className="Stoff"> {val.hilfsstoffName}</h1>
                    <section className ="strBild"> 
                    <img src={val.strukturBild}  alt="struktur" width="700" height="700"/> 
                      </section>
                     
                    <section className="EinzelStoff">
                    <p className="element"> Beschreibung: </p>
                    <p className="beschreibung2"> {val.beschreibung} </p>
                    <hr className="Seperator2" />
                    <p className="element"> Struktur und Eigenschaften: </p>
                    <p className="beschreibung2"> {val.strukturEigenschaften} </p>
                    <hr className="Seperator2" />
                    <p className="element"> Synonyme: </p>
                    <p className="beschreibung2"> {testsyno(val.synonme)} </p>
                    <hr className="Seperator2" />
                    <p className="element"> Art: </p>
                    <p className="beschreibung2"> {val.art} </p>
                    <hr className="Seperator2" /> 
                    <p className="element"> Mol Mass </p>
                    <p className="beschreibung2"> {val.molekularerGewicht} g/mol </p>
                    <hr className="Seperator2" />
                    <p className="element"> Aspect Ratio </p>
                    <p className="beschreibung2"> {val.aspect_ratio} </p>
                    <hr className="Seperator2" />
                    <p className="element"> Mol-Größe </p>
                    <p className="beschreibung2"> {val.molekularerGroesse} nm </p>
                    <hr className="Seperator2" />
                    </section> 
                      </section>);
            })}; 
            
            </section> 
            <hr className="EndSeperator"/> 
             <section className="literaturTeil" >
               <p className="element"> Litratur: </p>
                         {
                             hilfsstoff.map((stoval)=>{
                                 return(
                                    <section key={stoval.hilfsstoffName}>
                                     <p className="beschreibung2"> {stoval.literatur} </p>
                                      </section>
                                 )
                             })
                         }
                         {
                           protokol.map((val)=>{
                             return (
                               <section key={val.protokolId}> 
                               <p>Autor: { capitalizeFirstLetter (val.Titel)} {capitalizeFirstLetter(val.nachname)}
                               {' '}  Letzte Aktulisierung: {datumFun(val.datum)} </p>
                               </section>
                             )
                           })
                         }
                         </section>
                        </section>
            );
        }
export default Fachartikelh;

