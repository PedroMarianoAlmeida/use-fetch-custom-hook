import {useState, useEffect} from 'react';

const useFetch = (configurationParam, inicialValue) => {
    const [configuration, setConfiguration] = useState(configurationParam);
    const [ answerFetch, setAnswerFetch ] = useState(inicialValue);

    console.log(answerFetch);

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
    
    useEffect(() => {
        getAnswerFetch(configuration.url, configuration.parameters);
    }, [ configuration ]);

    return [ answerFetch, setConfiguration ];
}

export default useFetch;