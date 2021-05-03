import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from './hooks/useToken';

const AppContext = React.createContext({
    plans: [],
    setPlans: () => {}
});

function AppContextProvider({ children }) {

    // Sets up the app to fetch the articles from a REST API.
    // UpdatedPlans event = added an event?
    const [plans, setPlans] = useState([]);
    // const token = useToken();

    // useEffect( () => {
    //     const fetchData = async() => {
    //             // returns plan names
    //           const result = await axios.get("/api/plans", {
    //               headers: {
    //                   "Authorization": `Bearer ${token}`
    //               }
    //           });
    //           console.log("USe effect app context request",result.data);
    //     };
    //     fetchData();
    // },[])

    // The context value that will be supplied to any descendants of this component.
    const context = [plans, setPlans];

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};