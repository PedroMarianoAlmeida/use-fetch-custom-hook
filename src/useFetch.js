import {useState, useEffect} from 'react';

const useFetch = (configurationParam) => {
    const [configuration, setConfiguration] = useState(configurationParam);
    const [ answerFetch, setAnswerFetch ] = useState(null);
    const [ status, setStatus ] = useState("inactive");

    const fullAdress = (url, searchParams) => {
        let queryParams = "";
    
        searchParams.map( (param, index) => {
            const key = Object.keys(param)[0];
            queryParams += `${key}=${param[key]}`;
            if(index < searchParams.length - 1) queryParams += '&';
            return "";                        
        });
    
        return url + queryParams;
    }   
    
    useEffect(() => {
        const getAnswerFetch = async (currentUrl, currentParameters) => {
            setStatus("Fetching");
            setAnswerFetch(configuration.doWhenFetching);
            let result;
            try{
                const adress = fullAdress(currentUrl, currentParameters);
                if (configuration.logResponses) console.log( "Adress fetching: ", adress );
                let response = await fetch( adress );
                if(!response.ok) throw Error(response.statusText);
    
                result = await response.json();
                if (configuration.logResponses) console.log( "Raw Fetch: ", result );
                setStatus("Success");
                setAnswerFetch( configuration.doWhenSuccess( result ) );
            }
            catch (err){
                setStatus("Fail");
                if (configuration.logResponses) console.log( "Fetch error: ", err.message );
                setAnswerFetch( configuration.doWhenFail( err, result ) );
            }      
          }

        if ( configuration.shouldRun ) getAnswerFetch(configuration.url, configuration.parameters);
        else {
            setStatus("Inactive");
            setAnswerFetch( configuration.doWhenInactive() );
        }
        
    }, [ configuration ]);

    return [ answerFetch, status, setConfiguration ];
}

export default useFetch;