import axios from 'axios';
import React, { useState } from 'react';

const AppContext = React.createContext({
    plans: [],
    setPlans: () => { },
    plan: null,
    setPlan: () => { }
});

function AppContextProvider({ children }) {

    const [plans, setPlans] = useState([]);
    const [APIkey, setAPIkey] = useState();
    const [plan, setPlan] = useState();

    async function updatePlanInfo(id, token) {
        const header = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const plansResponse = await axios.get(`/api/plans/${id}`, header);
        plansResponse.data.events.sort((a, b) => a.startTime > b.startTime ? 1 : -1)
        setPlan(plansResponse.data);
    }


    // The context value that will be supplied to any descendants of this component.
    const value = { plans, setPlans, APIkey, setAPIkey, plan, setPlan, updatePlanInfo };

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