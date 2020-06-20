import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [ url, setUrl ] = useState("https://api.nationalize.io?");
  const [ parameters, setParameters ] = useState([ { "name": "Jonh" },{ "name[]": "Michael" }, {key: "123"} ])
  const [ answerFetch, setAnswerFetch ] = useState("inicialValue");

  const fullAdress = (url, searchParams) => {
    let queryParams = "";

    searchParams.map( (param, index) => {
        const key = Object.keys(param)[0];
        queryParams += `${key}=${param[key]}`;
        if(index < searchParams.length - 1) queryParams += '&';            
    });

    console.log(url + queryParams);
    return url + queryParams;
}

  const getAnswerFetch = async (currentUrl, currentParameters) => {
    let response = await fetch( fullAdress(currentUrl, currentParameters) );
    let result = await response.json();
    console.log( JSON.stringify(result) );
    setAnswerFetch( JSON.stringify(result) );
  }

  getAnswerFetch(url, parameters);

  return (
    <div className="App">
      <header className="App-header">
        <h1> { answerFetch } </h1>
      </header>
    </div>
  );
}

export default App;
