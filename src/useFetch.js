import {useState, useEffect} from 'react';

const useFetch = (configurationParam) => {
    const [configuration, setConfiguration] = useState(configurationParam);
    const [ answerFetch, setAnswerFetch ] = useState(null);

    const fullAdress = (url, searchParams) => {
        let queryParams = "";
    
        searchParams.map( (param, index) => {
            const key = Object.keys(param)[0];
            queryParams += `${key}=${param[key]}`;
            if(index < searchParams.length - 1) queryParams += '&';
            return ""; //Without this presents a warning, and when I changed the "map" for "foreach" doesn't work                         
        });
    
        return url + queryParams;
    }   
    
    useEffect(() => {
        const getAnswerFetch = async (currentUrl, currentParameters) => {
            if (configuration.logResponses) console.log("Status: Fetching");
            setAnswerFetch(configuration.doWhenFetching);
            let result;
            try{
                const adress = fullAdress(currentUrl, currentParameters);
                if (configuration.logResponses) console.log( "Adress fetching: ", adress );
                let response = await fetch( adress );
                if(!response.ok) throw Error(response.statusText);
    
                result = await response.json();
                if (configuration.logResponses) {
                    console.log( "Raw Fetch: ", result );
                    console.log( "Staus: Sucess");
                } 
                
                setAnswerFetch( configuration.doWhenSuccess( result ) );
            }
            catch (err){
                if (configuration.logResponses) {
                    console.log( "Fetch error: ", err.message );
                    console.log( "Staus: Fail" );
                }
                setAnswerFetch( configuration.doWhenFail( err, result ) );
            }      
          }

        if ( configuration.shouldRun ) getAnswerFetch(configuration.url, configuration.parameters);
        else {
            if (configuration.logResponses) console.log("Status: Inactive");
            setAnswerFetch( configuration.doWhenInactive() );
        }
        
    }, [ configuration ]);

    return [ answerFetch, setConfiguration ];
}

export default useFetch;