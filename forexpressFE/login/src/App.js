import './App.css';
import stockImg from './images/lgsuStock.jpg'

async function fetchData(url) {
  try {
    // Send the GET request using fetch
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data received:', data);

    // Display the received data on the page (for demonstration purposes)
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
} 

const handleLogin = (e) => {
  console.log("inside log in");

  e.preventDefault();
  var username = document.getElementById('uname').value;
  var password = document.getElementById('pword').value;

  console.log(username);
  console.log(password);
  const url = 'http://localhost:3001/api/login/' + username + '/' + password;

  console.log(url);
  
  fetchData(url);
}

function App() {
  return (
    <div className="App">
      <div className="login-half">
        <div className="login-cont">
          <form onSubmit={(e) => handleLogin(e)}>

            <p className="login-text">Log in</p> <br />

            <label htmlFor="uname" className="uname">Enter Username (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter username here..." id="uname" name="username" className="uname-text"></input> <br />

            <label htmlFor="pword" className="pword">Enter Password (max 16 characters)</label> <br />
            <input type="text" placeholder="Enter password here..." id="pword" name="password" className="pword-text"></input> <br />

            <button type="submit" className="login-button">Log in</button>

          </form>
          <div id="result"></div>
        </div>
      </div>
      <img src={stockImg} className="stock-img" alt="could not find image" />
    </div>
  );
}

export default App;
