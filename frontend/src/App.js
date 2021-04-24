import React from 'react';
import './App.css';
import Home from './Pages/Home';
const axios = require('axios');

function App() {
    return (
        <>
            {/* <button onClick={gettee}>click me to get</button> */}
            <Home />
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
