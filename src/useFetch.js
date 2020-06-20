import {useState, useEffect} from 'react';

const useFetch = (configurationParam, inicialValue) => {
    const [configuration, setConfiguration] = useState(configurationParam);
    const [ answerFetch, setAnswerFetch ] = useState(inicialValue);
    const [ status, setStatus ] = useState("inactive");

    const fullAdress = (url, searchParams) => {
        let queryParams = "";
    
        searchParams.foreach( (param, index) => {
            const key = Object.keys(param)[0];
            queryParams += `${key}=${param[key]}`;
            if(index < searchParams.length - 1) queryParams += '&';                        
        });
    
        return url + queryParams;
    }   
    
    useEffect(() => {
        const getAnswerFetch = async (currentUrl, currentParameters) => {
            setStatus("Fetching");
            try{
                const adress = fullAdress(currentUrl, currentParameters);
                if (configuration.logResponses) console.log( "Adress fetching: ", adress );
                let response = await fetch( adress );
                if(!response.ok) throw Error(response.statusText);
    
                let result = await response.json();
                if (configuration.logResponses) console.log( "Raw Fetch: ", result );
                setStatus("Data Fetch");
                setAnswerFetch( JSON.stringify(result) );
            }
            catch (err){
                setStatus("Data not Fetch");
                if (configuration.logResponses) console.log( "Fetch error: ", err.message );
                setAnswerFetch("");
            }      
          }

        getAnswerFetch(configuration.url, configuration.parameters);
        
    }, [ configuration ]);

    return [ answerFetch, status, setConfiguration ];
}

export default useFetch;