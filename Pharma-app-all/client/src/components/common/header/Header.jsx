import React from "react";
import { Navbar } from "..";
import './Header.css';

function Header (){

    return (
        <section>
          <section className="header-top__logo">
          <a href="/" className="header-logo">Pharmakologie</a>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar />
            </section>
            <hr className="header-top__seperator" />
            </section>
        </section>
    )
}

export default Header;