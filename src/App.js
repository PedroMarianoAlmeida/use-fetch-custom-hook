import React from 'react';
import './App.css';
import useFetch from './useFetch';

function App() {

  const myConfiguration = {
    url: "https://api.nationalize.io?",
    shouldRun: true,
    parameters : [ { "name": "Jonh" },{ "name[]": "Michael" }, {key: "123"} ],
    logResponses: true,
  }

  const [ answerHook, status,  setConfiguration ] = useFetch(myConfiguration, "test");

  const changeConfiguration = () => {
    myConfiguration.parameters = [ {name: "Pedro"} ];
    myConfiguration.logResponses = false;
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
