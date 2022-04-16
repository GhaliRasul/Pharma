import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import './App.css';
import {  Switch, Route, Link } from 'react-router-dom';
import { Header, PageTitle , Wirkstoffe ,Fachartikel,Hilfsstoffearten,Suche,
     Hilfsstoffe , Fachartikelh,Prufen ,Pergebnis} from './components/common';




function App() {
  return (
    <div className="App">
     <Header />
     <br />
          <Switch>
            <Route path="/Wirkstoffe">
             <PageTitle title="Wirkstoffe" />
             <Wirkstoffe></Wirkstoffe>
            </Route>
            <Route path="/Hilfsstoffearten">
            <PageTitle title="Arte der Hilfsstoffe" />
            <Hilfsstoffearten></Hilfsstoffearten>
            </Route>
            <Route path="/Fachartikel">
            <Fachartikel></Fachartikel>
            </Route>
            <Route path="/Hilfsstoffenlist">
              <Hilfsstoffe></Hilfsstoffe>
            </Route>
            <Route path="/Fachartikelh">
              <Fachartikelh></Fachartikelh>
            </Route>
            <Route path="/Suchen">
            <PageTitle title="Suchen" />
            <Suche></Suche>
            </Route>
            <Route path="/KompatebilitätPrüfen">
            <PageTitle title="Kompatebilität Prüfen" />
            <Prufen></Prufen>
            </Route>
            <Route path="/Pergebnis">
            <PageTitle title="Kompatebilität Prüfung" />
            <Pergebnis></Pergebnis>
            </Route>
            <Route path="/">
            <PageTitle title="Home" />
            <Suche></Suche>
            </Route>
          </Switch>
       
        
    </div>
  );
}

export default App;
