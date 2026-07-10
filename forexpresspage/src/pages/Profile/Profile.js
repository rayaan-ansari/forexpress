import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ username }) {

  const [history, setHistory] = useState([]);
  const [userBalance, setUserBalance] = useState([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      const url = `https://limpness-blemish-oblong.ngrok-free.dev/api/getUser/${username}`;
      console.log(url);
      const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      var data = await response.json();
      var hist = await data.history;
      var bal = await data.balance;
      hist = await JSON.parse(hist);
      bal = await JSON.parse(bal);
      await setUserBalance(bal);
      await setHistory(hist);
    };

    fetchUserHistory();
  }, [username]);

  return (
    <div className="bal">
      <header className="bal-head">
        <div>
          <p className="bal-eyebrow">Portfolio</p>
          <h1 className="bal-title">
            {username ? `${username}'s balance` : "Your balance"}
          </h1>
        </div>
        <Link to="/overview">
          <button className="bal-cta">Trade markets →</button>
        </Link>
      </header>

      <Balance userBalance={userBalance} />

      <section className="bal-section">
        <h2 className="bal-section-title">Trade history</h2>
        {history.length === 0 ? (
          <div className="bal-empty">No trades yet. Head to the markets to place your first trade.</div>
        ) : (
          <div className="bal-history">
            {history.map((entry, i) => (
              <HistoricalEntry history={entry} key={i} />
            ))}
          </div>
        )}
      </section>
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

    const pad = (n) => String(n).padStart(2, '0');

    return (
      <div className="trade">
        <div className="trade-left">
          <span className="trade-badge">BUY</span>
          <span className="trade-pair">{cur1}<span className="trade-slash">/</span>{cur2}</span>
        </div>
        <span className="trade-date">{year}-{pad(month)}-{pad(day)} · {pad(hour)}:{pad(minute)}</span>
        <span className="trade-amt">{amt} {cur1}</span>
      </div>
    );
  }

  function Balance({ userBalance }) {
    return (
      <section className="bal-section">
        <h2 className="bal-section-title">Holdings</h2>
        {userBalance.length === 0 ? (
          <div className="bal-empty">No holdings to display yet.</div>
        ) : (
          <div className="bal-grid">
            {userBalance.map((entry, i) => (
              <div className="bal-card" key={i}>
                <span className="bal-card-cur">{entry[0]}</span>
                <span className="bal-card-amt">{entry[1]}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
