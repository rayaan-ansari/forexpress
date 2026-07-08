import './App.css';
import stockImg from './images/lgsuStock.jpg'
import { useState } from 'react';

function App() {

  const [stat, setStat] = useState('');

  async function sendData(url, user, pass){

    console.log("sending data...");
  
    try {
      // Send the GET request using fetch
      const response = await fetch(url, {
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
    <div className="App">
      <div className="login-half">
        <div className="login-cont">
          <form onSubmit={(e) => handleSignup(e)}>

            <p className="login-text">Sign up</p> <br />

            <p style={stat == "Confirmed! Return to home and Log in." ? {color: 'green'} : {color: 'red'}}>{stat}</p>

            <label htmlFor="uname" className="uname">Enter Username (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter username here..." id="uname" name="username" className="uname-text"></input> <br />

            <label htmlFor="pword" className="pword">Enter Password (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter password here..." id="pword" name="password" className="pword-text"></input> <br />

            <button type="submit" className="login-button">Sign up</button>

          </form>
        </div>
      </div>
      <img src={stockImg} className="stock-img" alt="could not find image" />
    </div>
  );
}

export default App;
