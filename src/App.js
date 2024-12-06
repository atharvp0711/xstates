import React, { useEffect } from 'react'
import { useState } from 'react';

const App = () => {
  
  const [countries , setCountries] = useState([]) ;
  const [state, setState] = useState([]);
  const [city , setCity] = useState([]);
  
  const [selectCountry , setSelectCountry] = useState("") ;
  const [selectState , setSelectState] = useState("") ; 
  const [selectCity , setSelectCity] = useState("");

  const API_URL = "https://crio-location-selector.onrender.com/countries";
  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {setCountries(data)})
  } , [API_URL])

  const State_URL = `https://crio-location-selector.onrender.com/country=${selectCountry}/states`;
  useEffect(() => {
    if(!selectCountry){
      return ;
    }
    else{
    fetch(State_URL)
    .then((res) => res.json())
    .then((data) => {setState(data)})
    }
  } , [selectCountry , State_URL])

  const City_URL = `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`;
  useEffect(() => {
    if(!selectCountry || !selectState){
      return ;
    }
    fetch(City_URL)
    .then((res) => {res.json()})
    .then((data) => {setCity(data)})
  } , [selectCountry, selectState , City_URL])

  useEffect(() => {
    setState([]);
    setSelectState("");
    setCity([]);
    setSelectCity("");
  }, [selectCountry ,selectState]);
    
  
  return (
    <div>
      <h1 style={
        {
          textAlign : "center",
        }
      }> Select Location </h1>

      <select name = "country" id = "country" value = {selectCountry} onChange={ (e) => setSelectCountry(e.target.value)} style={
        {
          margin : "10px" ,
          padding : "5px" ,
          width: "200px" 
        }
      }>
        <option value = "" disabled> Select Country </option>
        {countries.map((country , index) => <option value = {country} key = {index}> {country} </option>)}
      </select>

      <select name = "state" id = "state" value = {selectState} onClick={ (e) => setSelectState(e.target.value)} style={
        {
          margin : "10px" ,
          padding : "5px" ,
          width: "200px" 
        }
      }>
        <option value = "" disabled> Select State </option>
        {state.map((state , index) => <option value = {state} key = {index}> {state} </option>)}
      </select>

      <select name = "city" id = "city" value = {selectCity} onClick = {(e) => setSelectCity(e.target.value)} style={
        {
          margin : "10px" ,
          padding : "5px" ,
          width: "200px" 
        }
      }>
        <option value = "" disabled> Select City </option>
        {city.map((city ,index) => <option value={city} key = {index}> {city} </option>)}
      </select>           
    </div>
  );
};

export default App
