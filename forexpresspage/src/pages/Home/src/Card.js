import './App.css';
import { useState } from 'react';
import ChartMaker from './ChartMaker.js';


export default function Card({cur1, cur2, username}) {

  const [time, setTime] = useState("NowData");
  const [tradeStatus, setTradeStatus] = useState('');

  const handleBuy = async e => {

    e.preventDefault();
    var cur1 = document.getElementById('curOne').value;
    var cur2 = document.getElementById('curTwo').value;
    var amt = document.getElementById('newAmount').value;
    console.log(cur1 + " / " + cur2 + " / " + amt);

    var url = `https://limpness-blemish-oblong.ngrok-free.dev/api/getData/Top/${cur1}/${cur2}`;
    console.log(url);
    var response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    var oldData = await response.json();
    console.log(oldData);
    var hist = oldData.data;
    hist = JSON.parse(hist);
    hist = hist[0]

    console.log(hist);

    const cost = Math.floor(amt * hist.price * 100) / 100;

    console.log(hist.price + " " + cost);

    // Charge cur2 first; only grant cur1 if payment actually succeeds.
    url = `https://limpness-blemish-oblong.ngrok-free.dev/api/updateBalance/${username}/${cur2}/${cost}/sell`;
    console.log(url);
    response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    const sellStat = await response.json();

    if(sellStat.message != "sent balance update"){
      console.log("Not enough money in wallet");
      setTradeStatus("Not enough " + cur2 + " to complete this trade.");
      return;
    }

    url = `https://limpness-blemish-oblong.ngrok-free.dev/api/updateBalance/${username}/${cur1}/${amt}/buy`;
    console.log(url);
    response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    const buyStat = await response.json();

    if(buyStat.message == "sent balance update"){
      console.log("success");
      setTradeStatus("Bought " + amt + " " + cur1 + " for " + cost + " " + cur2 + ".");
    }
    else{
      console.log("buy leg failed after payment succeeded");
      setTradeStatus("Trade failed unexpectedly after payment. Contact support.");
    }
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
        <p className="trade-status">{tradeStatus}</p>
      </div>
      <div className="curs">
        <p>{cur1} / {cur2}</p>
      </div>
      <div className="chart-ops">
        <div className="buttons">
          <button onClick={(e) => handlePriceChange(e, "NowData")}>Now</button>
          <button onClick={(e) => handlePriceChange(e, "DayData")}>Day</button>
          <button onClick={(e) => handlePriceChange(e, "WeekData")}>Week</button>
          <button onClick={(e) => handlePriceChange(e, "MonthData")}>Month</button>
          <button onClick={(e) => handlePriceChange(e, "YearData")}>Year</button>
        </div>
        <div className="chart-maker">
          <ChartMaker time={time} cur1={cur1} cur2={cur2} />
        </div>
      </div>
    </div>
  );
}

