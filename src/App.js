import React, { useEffect } from 'react'
import { useState } from 'react';

const App = () => {
  
  const [countries , setCountries] = useState([]) ;
  const [states, setState] = useState([]);
  const [cities , setCity] = useState([]);
  
  const [selectCountry , setSelectCountry] = useState("") ;
  const [selectState , setSelectState] = useState("") ; 
  const [selectCity , setSelectCity] = useState("");

  const API_URL = "https://crio-location-selector.onrender.com/countries";
  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {setCountries(data)})
    .catch((error) => console.error("Error fetching data:" + error))
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
    .catch((error) => console.error("Error fetching data for States:" + error))
    }
  } , [selectCountry , State_URL])

  const City_URL = `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`;
  useEffect(() => {
    if(!selectCountry || !selectState){
      return ;
    }
    fetch(City_URL)
    .then((res) => res.json())
    .then((data) => setCity(data))
    .catch((error) => console.error("Error fetching data for cities:" + error))
  } , [selectCountry, selectState , City_URL])

  
  return (
    <div>
      <h1 style={
        {
          textAlign : "center",
        }
      }> Select Location </h1>
      <div style={
        {
          display: "flex",
          justifyContent : "center",
        }
      }>
        <select name = "country" id = "country" value = {selectCountry} onChange={ (e) => {
        setSelectCountry(e.target.value)
        setState([]);
        setCity([]);
        setSelectState("");
        setSelectCity("");
        }
      } 
        style={
          {
            margin : "10px" ,
            padding : "5px" ,
            width: "200px" 
          }
        }>
          <option value = "" disabled> Select Country </option>
          {countries.map((country , index) => <option value = {country} key = {index}> {country} </option>)}
        </select>

        <select name = "states" id = "states" value = {selectState} onChange={ (e) => {
        setSelectState(e.target.value);
        setCity([]);
        setSelectCity("");
        }
      } 
      disabled = {!selectCountry}
        style={
          {
            margin : "10px" ,
            padding : "5px" ,
            width: "200px" 
          }
        }>
          <option value = "" disabled> Select State </option>
          {states.map((state , index) => <option value = {state} key = {index}> {state} </option>)}
        </select>

        <select name = "cities" id = "cities" value = {selectCity} onChange = {(e) => setSelectCity(e.target.value)} 
        disabled = {!selectState}
        style={
          {
            margin : "10px" ,
            padding : "5px" ,
            width: "200px" 
          }
        }>
          <option value = "" disabled> Select City </option>
          {cities.map((city ,index) => <option value={city} key = {index}> {city} </option>)}
        </select>
      </div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {selectCity
          ? `You selected ${selectCity}, ${selectState}, ${selectCountry}`
          : `` }
      </h2>      
    </div>
  );
};

export default App
