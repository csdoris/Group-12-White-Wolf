import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={gettee}>click me to get</button>
    </div>
  );
}

// example post to backend
const gettee = () => {
  console.log("clicked");
  axios.post('/', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }).then((result) => {
    console.log(result.data);
  }).catch((err) => {
    console.log(err);
  });
}

export default App;
