import React,{ useEffect, useState } from 'react';
import Axios from 'axios' ;
import './Wirkstoffe.css';
import {Link} from 'react-router-dom';

function Wirkstoffe (){
    const [wirkstoffeList, setWirkstoffeList] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/wirkstoffe").then((response)=>{
            setWirkstoffeList(response.data)
        }); 
      },[]);
      
      const fachartikelLesen =(stoffName)=>{
        Axios.post(`http://localhost:3001/api/lesenww/${stoffName}`)
      } ;
      
      
      
    return (
       <section className="GesamtList">
           {wirkstoffeList.map((val)=>{
            return ( <section key={val.wirkstoffName}> 
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
                      </section>);
              
            })
            }
             </section> );
        }
export default Wirkstoffe;