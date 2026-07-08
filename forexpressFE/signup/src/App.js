import './App.css';
import stockImg from './images/lgsuStock.jpg'

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
    const data = await response.json();
    console.log('Data received:', data);

    // Display the received data on the page (for demonstration purposes)
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const handleSignup = (e) => {
  console.log("inside sign up");

  e.preventDefault();
  var username = document.getElementById('newuname').value;
  var password = document.getElementById('newpword').value;

  const url = "http://localhost:3001/api/signUser";

  sendData(url, username, password);
}

function App() {
  return (
    <div className="App">
      <div className="login-half">
        <div className="login-cont">
          <form onSubmit={(e) => handleSignup(e)}>

            <p className="login-text">Sign up</p> <br />

            <label htmlFor="uname" className="uname">Enter Username (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter username here..." id="uname" name="username" className="uname-text"></input> <br />

            <label htmlFor="pword" className="pword">Enter Password (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter password here..." id="pword" name="password" className="pword-text"></input> <br />

            <button type="submit" className="login-button">Sign up</button>

          </form>
          <div id="result"></div>
        </div>
      </div>
      <img src={stockImg} className="stock-img" alt="could not find image" />
    </div>
  );
}

export default App;
