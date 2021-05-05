import React, { useState } from 'react';

const AppContext = React.createContext({
    plans: [],
    setPlans: () => {},
});

function AppContextProvider({ children }) {

    const [plans, setPlans] = useState([]);
    const [APIkey, setAPIkey] = useState();
    const [plan, setPlan] = useState();
    
    // The context value that will be supplied to any descendants of this component.
    const value = { plans, setPlans, APIkey, setAPIkey, plan, setPlan };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};