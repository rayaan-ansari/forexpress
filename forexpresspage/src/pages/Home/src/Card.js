import './App.css';
import { useState } from 'react';
import ChartMaker from './ChartMaker.js';

const TIMEFRAMES = [
  ["NowData", "Now"],
  ["DayData", "Day"],
  ["WeekData", "Week"],
  ["MonthData", "Month"],
  ["YearData", "Year"],
];

export default function Card({cur1, cur2, username}) {

  const [time, setTime] = useState("NowData");
  const [tradeStatus, setTradeStatus] = useState('');
  const [statusOk, setStatusOk] = useState(false);

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
      setStatusOk(false);
      setTradeStatus("Not enough " + cur2 + " to complete this trade.");
      return;
    }

    url = `https://limpness-blemish-oblong.ngrok-free.dev/api/updateBalance/${username}/${cur1}/${amt}/buy`;
    console.log(url);
    response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    const buyStat = await response.json();

    if(buyStat.message == "sent balance update"){
      console.log("success");
      setStatusOk(true);
      setTradeStatus("Bought " + amt + " " + cur1 + " for " + cost + " " + cur2 + ".");

      url = `https://limpness-blemish-oblong.ngrok-free.dev/api/updateHistory/${username}/${cur1}/${cur2}/${amt}`;
      console.log(url);
      await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    }
    else{
      console.log("buy leg failed after payment succeeded");
      setStatusOk(false);
      setTradeStatus("Trade failed unexpectedly after payment. Contact support.");
    }
  }

  const handlePriceChange = (e, time) => {
    console.log("Requested time change : " + time);
    setTime(time);
  }

  return (
    <div className="card">
      <header className="card-head">
        <div className="card-pairwrap">
          <span className="card-pair">{cur1}<span className="card-slash">/</span>{cur2}</span>
          <span className="card-pair-label">Foreign exchange pair</span>
        </div>
      </header>

      <div className="card-grid">
        <section className="card-chartpanel">
          <div className="card-timeframes">
            {TIMEFRAMES.map(([value, label]) => (
              <button
                key={value}
                onClick={(e) => handlePriceChange(e, value)}
                className={time === value ? "tf-btn tf-btn-active" : "tf-btn"}
              >
                {label}
              </button>
            ))}
          </div>
          <ChartMaker time={time} cur1={cur1} cur2={cur2} />
        </section>

        <aside className="card-orderpanel">
          <p className="order-title">Buy currency</p>
          <p className="order-sub">Trade {cur1} against {cur2} at the live rate.</p>

          <label htmlFor="curOne" className="order-label">Base currency</label>
          <input type="text" placeholder="Enter Base" id="curOne" name="curOne" defaultValue={cur1} className="order-input" />

          <label htmlFor="curTwo" className="order-label">Quote currency</label>
          <input type="text" placeholder="Enter Quote" id="curTwo" name="curTwo" defaultValue={cur2} className="order-input" />

          <label htmlFor="newAmount" className="order-label">Amount</label>
          <input type="text" placeholder="Enter Amount" id="newAmount" name="newAmount" className="order-input" />

          <button onClick={(e) => handleBuy(e)} className="order-button">Confirm purchase</button>

          {tradeStatus && (
            <p className={statusOk ? "order-status ok" : "order-status err"}>{tradeStatus}</p>
          )}
        </aside>
      </div>
    </div>
  );
}
