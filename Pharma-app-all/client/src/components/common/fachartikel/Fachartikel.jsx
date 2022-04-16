import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Fachartikel.css';
import {Link} from 'react-router-dom';




function Fachartikel (){
    const [wirkstoffeList, setWirkstoffeList] = useState([]);
    const [refer, setRefer] = useState([]);
    const [inter, setInter] =useState([]) ;
    const [protokol, setProtokol]=useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/lese").then((response)=>{
            setWirkstoffeList(response.data)
        }); 
      },[wirkstoffeList.wirkstoffName]);
      useEffect(()=>{
        Axios.get("http://localhost:3001/api/leseRefer").then((response)=>{
            setRefer(response.data)
        }); 
      },[]);
      useEffect(()=>{
        Axios.get("http://localhost:3001/api/leseInter").then((response)=>{
           setInter(response.data)
        }); 
      },[]);
     
      useEffect(()=>{
        Axios.get("http://localhost:3001/api/leseProto").then((response)=>{
           setProtokol(response.data)
        }); 
      },[]);
      const fachartikelLesen_h =(hilfStoffName)=>{
        Axios.post(`http://localhost:3001/api/lesenhf/${hilfStoffName}`)
      } ;
      const fachartikelLesen =(stoffName)=>{
        Axios.post(`http://localhost:3001/api/lesenww/${stoffName}`)
      } ;

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
           {wirkstoffeList.map((val)=>{
            return ( <section className="stoffTitel" key={val.wirkstoffName}>
                    <h1 className="Stoff"> {val.wirkstoffName}</h1>
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
                   
                    <p className="element"> Gruppe: </p>
                    <p className="beschreibung2"> {val.gruppe} </p>
                    <hr className="Seperator2" />
                    <section className="ReferListe">
                           <p className="elementRef"> Komaptible Hilfsstoffe </p> 
                          
                           <table>
                               <thead>
                               <tr>
                                <th> Hilfsstoffe</th>
                                 <th>Art</th>
                                 </tr>
                                 </thead>
                                  <tbody>
                        { 
                        refer.map((referVal)=>{
                                return( 
                                  <tr key={referVal.hilfsstoffName}>
                              <td>   <Link to="/Fachartikelh"  onClick={
                    ()=> fachartikelLesen_h(referVal.hilfsstoffName)
                } className="linkItem">
                     {referVal.hilfsstoffName}
                </Link>
                                  </td>
                                 <td>{referVal.art}</td>
                                 </tr>  
                            )
                        })}
                                 </tbody>   </table>
                                
                      </section>
                    <p className="element"> Wirkung: </p>
                    <p className="beschreibung2"> {val.wirkung} </p>
                    <hr className="Seperator2" />
                    
                    <p className="element"> Mol Mass: </p>
                    <p className="beschreibung2"> {val.molekularerGewicht} g/mol</p>
                    <hr className="Seperator2" />
                    <p className="element"> Aspect Ratio: </p>
                    <p className="beschreibung2"> {val.aspect_ratio} </p>
                    <hr className="Seperator2" />
                    <p className="element"> Mol-Größe: </p>
                    <p className="beschreibung2"> {val.molekularerGroesse} nm </p>
                    <hr className="Seperator2" />

                      <section className="InterListe" >
                           <p className="element"> Interaktive Wirkstoffe: </p>
                        {inter.map((interVal)=>{
                            return(
                                <section className="EinzelInter" key={interVal.wirkstoff1}>
                                    <Link to="/Fachartikel"  
                                     className="linkItem"
                                     onClick={()=>{fachartikelLesen(interVal.wirkstoff2); window.location.reload(); }}>
                     <p className="beschreibung2"> {interVal.wirkstoff2} </p>
                </Link>
                                 <hr className="Seperator2" />
                                    </section>
                            )
                        }) 
                        }
                      </section>
                    </section> 
                      </section>);
              
            })
            }; </section> 
            <hr className="EndSeperator"/> 
             
            <section className="literaturTeil" >
              <p className="element"> Litratur: </p>
                        {inter.map((interVal)=>{
                            return(
                                  <section key={interVal.wirkstoff1}>
                                 <p className="beschreibung2"> {interVal.literatur} </p>
                                    </section>
                            )
                        }) 
                        } 
                        {
                            wirkstoffeList.map((stoval)=>{
                                return(
                                   <section key={stoval.wirkstoffName}>
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
export default Fachartikel;

