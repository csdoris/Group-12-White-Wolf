import React, { useState, useEffect } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';

function Home() {
    return (
        <div>
            <SideNav />
            <GoogleMaps />
        </div>
    );
}

export default Home;
