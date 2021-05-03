import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext({
    plans: []
});

function AppContextProvider(token, { children }) {

    // Sets up the app to fetch the articles from a REST API.
    // UpdatedPlans event = added an event?
    const [plans, setPlans] = useState([]);

    useEffect( () => {
        const fetchData = async() => {
                // returns plan names
              const result = await axios.get("/api/plans", {
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });
              console.log(result.data);
        };
        fetchData();
    },[])

    /**
     * First, uploads the given image to the server, and retrieves the URL pointing to that image.
     * Then, saves the article itself, and returns the server representation of the article which
     * will ahve the id and date assigned.
     * 
     * TODO Error handling...
     */
    async function addPlan(name) {

        const header = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const body = {
            name: name
        }
        const planResponse = await axios.post('/api/plans', body, header);
        console.log(planResponse.data)
        return planResponse.data;
    }
    
    
    async function updatePlan(id, newData) {

        const header = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const planResponse = await axios.put('/api/plans/', newData ,{
            params: {
                id: id
            }
        });
        console.log(planResponse.data)
        return planResponse.data;
    }
    
    async function deletePlan(id) {

        const header = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const planResponse = await axios.delete('/api/plans/', {
            params: {
                id: id
            }
        });
        console.log(planResponse.data)
        return planResponse.data;
    }
    // The context value that will be supplied to any descendants of this component.
    const context = {
        plans,
        addPlan,
        updatePlan,
        deletePlan
    }

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