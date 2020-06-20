import {useState, useEffect} from 'react';

const useFetch = (configurationParam, inicialValue) => {
    const [configuration, setConfiguration] = useState(configurationParam);
    const [ answerFetch, setAnswerFetch ] = useState(inicialValue);
    const [ status, setStatus ] = useState("inactive");

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
        setStatus("Fetching");
        try{
            let response = await fetch( fullAdress(currentUrl, currentParameters) );
            if(!response.ok) throw Error(response.statusText);

            let result = await response.json();
            console.log( JSON.stringify(result) );
            setStatus("Data Fetch");
            setAnswerFetch( JSON.stringify(result) );
        }
        catch (err){
            setStatus("Data not Fetch");
            setAnswerFetch(`Error fetching: ${err.message}`);
        }      
      }
    
    useEffect(() => {
        getAnswerFetch(configuration.url, configuration.parameters);
    }, [ configuration ]);

    return [ answerFetch, status, setConfiguration ];
}

export default useFetch;