 import React from "react";
 import './Navbar.css';
 import {Link} from 'react-router-dom'
 function Navbar (){
     return (
        <section className="navbar">
        <Link to="/Suchen" className="navbar-item">Suchen</Link>
        <Link to="/Wirkstoffe" className="navbar-item">Wirkstoffe</Link>
        <Link to="/Hilfsstoffearten" className="navbar-item">Hilfsstoffe</Link>
        <Link to="/KompatebilitätPrüfen" className="navbar-item">Kompatebilität Prüfen</Link>
    </section>
     )
 }

 export default Navbar;