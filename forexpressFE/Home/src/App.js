import './App.css';
import { useState } from 'react';
import ChartMaker from './ChartMaker.js';


export default function App() {
  const [balance, setBalance] = useState(100, (newBalance) => {
    balance = newBalance;
    console.log({balance});
  });
  const [time, setTime] = useState("NowData");
  const [cur1, setCur1] = useState();
  const [cur2, setCur2] = useState();

  const handleBuy = async e => {

    console.log("handling buy");

    e.preventDefault();
    var cur1 = document.getElementById('curOne').value;
    var cur2 = document.getElementById('curTwo').value;
    var amt = document.getElementById('newAmount').value;

    console.log(cur1 + " / " + cur2 + " / " + amt);

    var url = 'http://localhost:3001/api/updateBalance/rayaan/' + cur1 + '/' + amt + '/buy';
    console.log(url);
    var response = await fetch(url);

    url = 'http://localhost:3001/api/updateBalance/rayaan/' + cur2 + '/' + amt + '/sell';
    console.log(url);
    response = await fetch(url);

    const stat = response.json();
    if(stat.message == "success") console.log("success");
    else console.log("Not enough money in wallet");
  }

  const handleBalanceClick = e => {
    e.preventDefault();
    setBalance(balance + 100);
  }
  async function getStock(url){
    const newData = await fetchData(url);
    return newData;
  }
  const handleStockClick = e => {
    e.preventDefault();
    const newData = getStock('http://localhost:3001/api/getData/Top/' + cur1 + '/' + cur2);
    console.log(newData);
  }

  async function fetchData(url) {
    try {
      // Send the GET request using fetch
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
    const url = 'http://localhost:3001/api/getUser/' + username + '/' + password;

    console.log(url);
    
    fetchData(url);
  }

  const handlePriceChange = (e, time) => {
    console.log("Requested time change : " + time);
    setTime(time);
  }

  return (
    <div className="App">
      <div className="buy">
        <p className="title-text">Buy currency</p>
        <label htmlFor="currency1">Base currency    </label>
        <input type="text" placeholder="Enter Base" id="curOne" name="curOne"></input> <br />


        <label htmlFor="currency2">Quote Currency   </label>
        <input type="text" placeholder="Enter Quote" id="curTwo" name="curTwo"></input> <br />


        <label htmlFor="amount">Amount    </label>
        <input type="text" placeholder="Enter Amount" id="newAmount" name="newAmount"></input> <br />

        <button onClick={(e) => handleBuy(e)} className="confirm-button">Confirm</button>
      </div>
      <div className="curs">
        <p>CHF / CNH</p>
      </div>
      <div class="chart-ops">
        <div className="buttons">
          <button onClick={(e) => handlePriceChange(e, "NowData")}>Now</button>
          <button onClick={(e) => handlePriceChange(e, "DayData")}>Day</button>
          <button onClick={(e) => handlePriceChange(e, "WeekData")}>Week</button>
          <button onClick={(e) => handlePriceChange(e, "MonthData")}>Month</button>
          <button onClick={(e) => handlePriceChange(e, "YearData")}>Year</button>
        </div>
        <div className="chart-maker">
          <ChartMaker time={time} cur1={"CHF"} cur2={"CNH"} />
        </div>
      </div>
    </div>
  );
}

