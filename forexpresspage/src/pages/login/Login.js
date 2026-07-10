import './App.css';
import stockImg from './images/lgsuStock.jpg'

import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App({setUsername}) {

  const navigate = useNavigate();
  const [validationStatus, setValidationStatus] = useState('User has not attempted validation');
  const [error, setError] = useState('');

  async function fetchData(url, user, pass) {
    try {
      // Send the GET request using fetch
      const response = await fetch(url,  {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          username : user,
          password : pass
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data);
      if(data.message == "Login successful"){
        console.log(data.message + " worked");
        setUsername(user);
        setValidationStatus("User validated");
      }
      else{
        console.log(data.message + " worked");
        setValidationStatus("Incorrect user");
        setError("Incorrect username or password");
      }
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if(validationStatus == "User validated"){
      navigate("/overview")
    }
  }, [validationStatus]);

  const handleLogin = (e) => {
    console.log("inside log in");

    e.preventDefault();
    var username = document.getElementById('uname').value;
    var password = document.getElementById('pword').value;

    console.log(username);
    console.log(password);
    const url = 'https://limpness-blemish-oblong.ngrok-free.dev/api/login';

    console.log(url);

    fetchData(url, username, password);
  }

  return (
    <div className="auth">
      <div className="auth-panel">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-mark" aria-hidden="true" />
          <span>forexpress</span>
        </Link>

        <div className="auth-card">
          <form onSubmit={(e) => handleLogin(e)}>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Log in to access your markets and portfolio.</p>

            {error && <p className="auth-error">{error}</p>}

            <label htmlFor="uname" className="auth-label">Username</label>
            <input type="text" placeholder="Enter your username" id="uname" name="username" className="auth-input" maxLength="16" />

            <label htmlFor="pword" className="auth-label">Password</label>
            <input type="password" placeholder="Enter your password" id="pword" name="password" className="auth-input" maxLength="16" />

            <button type="submit" className="auth-button">Log in</button>

            <p className="auth-switch">
              New to forexpress? <Link to="/signup">Create an account</Link>
            </p>
            <Link to="/" className="auth-home">← Back to home</Link>
          </form>
        </div>
      </div>

      <div className="auth-visual">
        <img src={stockImg} className="auth-visual-img" alt="Trading floor" />
        <div className="auth-visual-overlay">
          <p className="auth-visual-quote">“The markets never sleep — and neither does your demo portfolio.”</p>
          <p className="auth-visual-meta">Live FX data · risk-free trading</p>
        </div>
      </div>
    </div>
  );
}

export default App;
