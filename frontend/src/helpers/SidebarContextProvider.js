import React, { useContext, useEffect } from 'react';

import { useState } from 'react';
import { AppContext } from '../AppContextProvider';
import FetchWeatherInfo from '../ExternalAPI/OpenWeatherMapAPI';
import getWeatherForTime from './getWeatherForTime';

// Create the context
const SidebarContext = React.createContext([]);

/**
 * Wraps the given child components in an SidebarContext.Provider.
 */
function SidebarContextProvider({ children }) {
    // Stateful value initialization
    const [isOpen, setIsOpen] = useState();
    const [weatherInfo, setWeatherInfo] = useState([]);

    const { plan } = useContext(AppContext);

    useEffect(() => {
        if (plan && plan.events) {
            retrieveWeatherInformation(plan)
        }
    }, [plan])

    function retrieveWeatherInformation(plan) {
        console.log("retrieveWeatherInformation", plan)
        let newWeathers = {};
        const events = plan.events;
        Promise.all(events.map(async (event, index) => {
            //This part effs with the setting of the state
            const result = await FetchWeatherInfo(null, event.lat, event.lng);

            const weather = getWeatherForTime(result, events[index]);
            newWeathers[event._id] = weather;
            console.log("map", newWeathers);
        })).then(() => {
            setWeatherInfo(newWeathers);
            console.log("weatherInfoUpdate", newWeathers);
        });
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        isOpen,
        setIsOpen,
        weatherInfo,
        setWeatherInfo
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <SidebarContext.Provider value={context}>{children}</SidebarContext.Provider>
    );
}

export { SidebarContext, SidebarContextProvider };
