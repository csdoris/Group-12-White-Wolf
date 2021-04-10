import React from 'react';
import './App.css';
import SideNav from './Components/Sidebar';
const axios = require('axios');

function App() {
    return (
        <>
            <SideNav />
            <button onClick={gettee}>click me to get</button>
        </>
    );
}

// example post to backend
const gettee = () => {
    console.log('clicked');
    axios
        .post('/', {
            firstName: 'Fred',
            lastName: 'Flintstone',
        })
        .then((result) => {
            console.log(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export default App;
