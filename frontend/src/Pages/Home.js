import React, { useState, useEffect } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';

export const PlanContext = React.createContext(undefined);

function Home() {
    const [plan, setPlan] = useState(undefined);

    return (
        <div>
            <PlanContext.Provider value={[plan, setPlan]}>
                <SideNav />
                <GoogleMaps />
            </PlanContext.Provider>
        </div>
    );
}

export default Home;
