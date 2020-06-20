import React from 'react';
import './App.css';
import useFetch from './useFetch';

function App() {

  const myConfiguration = {
    shouldRun: true,
    logResponses: true,

    url: "https://api.nationalize.io?",    
    parameters : [ { "name": "Jonh" },{ "name[]": "Michael" }, {key: "123"} ],
    
  }

  const [ answerHook, status,  setConfiguration ] = useFetch(myConfiguration);

  const changeConfiguration = () => {
    myConfiguration.parameters = [ {name: "Pedro"} ];
    myConfiguration.shouldRun = false;
    setConfiguration(myConfiguration);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2> {status} </h2>
        <h1>  </h1>
        <button onClick={changeConfiguration}>Change parameter</button>
      </header>
    </div>
  );
}

export default App;
