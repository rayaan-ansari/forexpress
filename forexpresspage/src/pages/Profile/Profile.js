import './App.css';
import { useState, useEffect } from 'react';

export default function Profile({ username }) {

  const [history, setHistory] = useState([2024, 5, 4, 3, 2, "DKK", "USD", 1000], (arg) => history=arg);
  const [userBalance, setUserBalance] = useState([2024, 5, 4, 3, 2, "DKK", "USD", 999], (arg) => userBalance=arg);

  useEffect(() => {
    const fetchUserHistory = async () => {
      const url = `https://limpness-blemish-oblong.ngrok-free.dev/api/getUser/${username}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      var data = await response.json();
      var hist = await data.history;
      var bal = await data.balance;
      hist = await JSON.parse(hist);
      bal = await JSON.parse(bal);
      console.log("FINAL DATA : " + hist + "  ::  " + bal + "  ::  " + bal.length);
      if(Array.isArray(hist)){
        console.log("YAY!");
      }
      else{
        console.log("NO :(");
      }
      if(Array.isArray(bal)){
        console.log("HAPPY!");
      }
      else{
        console.log("SAD :(");
      }
      await setUserBalance(bal);
      await setHistory(hist);
      console.log("test:" + history + " " + userBalance);
    };

    fetchUserHistory();
  }, [username]);

  return (
    <div>
      <Balance userBalance={userBalance}/>
      {history.map((entry) => (
        <HistoricalEntry history={entry}/>
      ))}
    </div>
  );
  
  function HistoricalEntry({ history }) {
    const year = history[0];
    const month = history[1];
    const day = history[2];
    const hour = history[3];
    const minute = history[4];
    const cur1 = history[5];
    const cur2 = history[6];
    const amt = history[7];

    return (
      <div className="trade">
        <p className="tradeType">{cur1}/{cur2}</p>
        <p className="tradeDate">{year}-{month}-{day}  {hour}:{minute}</p>
        <p className="tradeAmt"><span className="left-align">AMT:{amt}</span></p>
      </div>
    );
  }

  function Balance({userBalance}){
    return(
      <div className="balanceContainer">
        {userBalance.map((entry) => (
          <p className="balanceEntry">{entry[0]} : {entry[1]}</p>
        ))}
      </div>
    );
  }
}