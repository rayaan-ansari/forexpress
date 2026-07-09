import './App.css';

import TopBar from './pages/landing/TopBar/TopBar.js';
import Overview from './pages/overview/Overview.js';
import ForexpressHome from './pages/landing/ForexpressHome/ForexpressHome.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import Profile from './pages/Profile/Profile.js';
import Card from './pages/Home/src/Card.js'

import { useState, useEffect } from 'react';

function App() {

  const currencyComparisons = [["AUD", "CAD"], ["CHF", "CNH"], ["CZK", "JPY"], ["USD", "EUR"],
                            ["CAD", "CHF"], ["USD", "DKK"], ["CZK", "AUD"], ["CNH", "USD"],
                            ["DKK", "CAD"], ["USD", "CNH"]];

  const [navVisibility, setNavVisibility] = useState(true);
  const [topButtons, setTopButtons] = useState([["signup", "Sign up"], ["login", "Log in"]]);
  const [username, setUsername] = useState('');
  const loc = useLocation();

  useEffect(() => {
    if(loc.pathname == '/login' || loc.pathname == '/signup') setNavVisibility(false);
    else if(loc.pathname == '/overview') {
      setTopButtons([["balance", "Balance"]]);
      setNavVisibility(true);
    }
    else if(loc.pathname == '/'){
      setTopButtons([["signup", "Sign up"], ["login", "Log in"]]);
      setNavVisibility(true);
    }
    else if(loc.pathname == '/balance'){
      setTopButtons([["overview", "Overview"]]);
      setNavVisibility(true);
    }
    else if(loc.pathname.substring(1, 5) == 'card'){
      setTopButtons([["balance", "Balance"], ["overview", "Overview"]]);
      setNavVisibility(true);
    }
  }, [loc.pathname])

  return (
    <div className="App">
      <div style={navVisibility ? {} : {display: 'none'}}>
        <TopBar buttonData={topButtons} />
      </div>

      <Routes>
        <Route path="/" element={<ForexpressHome />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overview/*" element={<Overview currencyComparisons={currencyComparisons} />} />
        <Route path="/balance" element={<Profile username={username} />} />
        {currencyComparisons.map((entry) => (
          <Route path={`/card${entry[0]}${entry[1]}`} element={<Card cur1={entry[0]} cur2={entry[1]} username={username} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
