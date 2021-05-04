import React from 'react';

import { useState } from 'react';

// Create the context
const AppContext = React.createContext([]);

/**
 * Wraps the given child components in an AppContext.Provider.
 */
function AppContextProvider({ children }) {
    // Stateful value initialization
    const [planName, setPlanName] = useState();
    const [events, setEvents] = useState();
    const [APIkey, setAPIkey] = useState();

    // The context value that will be supplied to any descendants of this component.
    const context = {
        planName,
        setPlanName,
        events,
        setEvents,
        APIkey,
        setAPIkey,
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
