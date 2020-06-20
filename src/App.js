import React, {useState, useEffect} from 'react';
import './App.css';
import useFetch from './useFetch';

function App() {

  const myConfiguration = {
    url: "https://api.nationalize.io?",
    shouldRun: true,
    parameters : [ { "name": "Jonh" },{ "name[]": "Michael" }, {key: "123"} ],
    propertiesWhenOK: ['name'],
    propertiesWhenError: ['message'],
    logResponses: true,
  }

  const [ answerHook, status,  setConfiguration ] = useFetch(myConfiguration, "test");

  const changeConfiguration = () => {
    myConfiguration.parameters = [ ];
    //myConfiguration.url = "https://api.nationalize.io";
    console.log("teste");
    setConfiguration(myConfiguration);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2> {status} </h2>
        <h1> { answerHook } </h1>
        <button onClick={changeConfiguration}>Change parameter</button>
      </header>
    </div>
  );
}

export default App;
