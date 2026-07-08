import './App.css';
import stockImg from './images/lgsuStock.jpg'

import { useNavigate } from 'react-router-dom';
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
          'Content-Type': 'application/json'
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
    <div className="login-total">
      <div className="login-half">
        <div className="login-cont">
          <form onSubmit={(e) => handleLogin(e)}>

            <p className="login-text">Log in</p> <br />

            <p className="error-text">{error}</p>

            <label htmlFor="uname" className="uname">Enter Username (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter username here..." id="uname" name="username" className="uname-text" maxlength="16"></input> <br />

            <label htmlFor="pword" className="pword">Enter Password (max 16 characters)</label> <br />
            <input type="password" placeholder="Enter password here..." id="pword" name="password" className="pword-text" maxlength="16"></input> <br />

            <button type="submit" className="login-button">Log in</button>

          </form>
        </div>
      </div>
      <img src={stockImg} className="stock" alt="could not find image" />
    </div>
  );
}

export default App;
