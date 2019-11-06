import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { auth } from "./fire";
import WhatHue from './components/WhatHue';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    auth.signInAnonymously().then(() => {
      setLoggedIn(true);
      setIsLoggingIn(false);
    })
      .catch(err => {
        console.log(err);
        setLoggedIn(false);
        setIsLoggingIn(false);
      })
  }, []);

  if (!loggingIn && !loggedIn) return <div>An error occurred</div>

  if(!loggedIn) return <div>Loading</div>
  
  return (
    <div className="App">
      <WhatHue />
    </div>
  );
}

export default App;
