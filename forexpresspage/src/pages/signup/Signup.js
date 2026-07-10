import './App.css';
import stockImg from './images/lgsuStock.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {

  const [stat, setStat] = useState('');
  const isOk = stat === "Confirmed! Return to home and Log in.";

  async function sendData(url, user, pass){

    console.log("sending data...");

    try {
      // Send the GET request using fetch
      const response = await fetch(url, {
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
      if(data.message == "Sign up successful"){
        setStat("Confirmed! Return to home and Log in.");
      }
      else{
        setStat("Username or password taken.");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSignup = (e) => {
    console.log("inside sign up");

    e.preventDefault();
    var username = document.getElementById('uname').value;
    var password = document.getElementById('pword').value;

    const url = "https://limpness-blemish-oblong.ngrok-free.dev/api/signUser";

    sendData(url, username, password);
  }

  return (
    <div className="auth">
      <div className="auth-panel">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-mark" aria-hidden="true" />
          <span>forexpress</span>
        </Link>

        <div className="auth-card">
          <form onSubmit={(e) => handleSignup(e)}>
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Start trading with a risk-free demo portfolio in seconds.</p>

            {stat && <p className={isOk ? "auth-ok" : "auth-error"}>{stat}</p>}

            <label htmlFor="uname" className="auth-label">Username <span className="auth-hint">(max 16 characters)</span></label>
            <input type="text" placeholder="Choose a username" id="uname" name="username" className="auth-input" maxLength="16" />

            <label htmlFor="pword" className="auth-label">Password <span className="auth-hint">(max 16 characters)</span></label>
            <input type="password" placeholder="Choose a password" id="pword" name="password" className="auth-input" maxLength="16" />

            <button type="submit" className="auth-button">Sign up</button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <Link to="/" className="auth-home">← Back to home</Link>
          </form>
        </div>
      </div>

      <div className="auth-visual">
        <img src={stockImg} className="auth-visual-img" alt="Trading floor" />
        <div className="auth-visual-overlay">
          <p className="auth-visual-quote">“Join thousands of traders learning the markets — without risking a cent.”</p>
          <p className="auth-visual-meta">Free forever · fake money · real charts</p>
        </div>
      </div>
    </div>
  );
}

export default App;
