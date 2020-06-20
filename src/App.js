import React, {useState, useEffect} from 'react';
import './App.css';
import useFetch from './useFetch';

function App() {
  
  const myConfiguration = {
    shouldRun: true,
    logResponses: true,

    url: "https://api.nationalize.io?",    
    parameters : [ { "name": "Jonh" } ],

    doWhenInactive: () => "",
    doWhenFetching: () => <h3>...loading</h3>,
    doWhenSuccess: (rawAnswer) => <h1> { rawAnswer.country[0].country_id } </h1>,
    doWhenFail: (error, rawAnswer) => <h1> {error.message} </h1>
  }

  const [ answerHook, setConfiguration ] = useFetch(myConfiguration);

  const changeConfiguration = () => {
    myConfiguration.parameters = [ {name: "Pedro"} ];
    //myConfiguration.shouldRun = false;
    setConfiguration(myConfiguration);
  }

  return (
    <div className="App">
      <header className="App-header">
        {answerHook}
        <button onClick={changeConfiguration}>Change parameter</button>
      </header>
    </div>
  );
}

export default App;
