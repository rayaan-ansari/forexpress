import './App.css';
import Pair from './Pair.js';
import { Link } from 'react-router-dom';

function Overview({currencyComparisons}) {
  return (
    <div className="ov">
      <header className="ov-head">
        <div>
          <p className="ov-eyebrow">Live markets</p>
          <h1 className="ov-title">Market overview</h1>
          <p className="ov-sub">Select a pair to view its full chart and place a trade.</p>
        </div>
        <span className="ov-live"><span className="ov-live-dot" /> Live prices</span>
      </header>

      <div className="ov-grid">
        {currencyComparisons.map((entry) => (
          <Link to={`/card${entry[0]}${entry[1]}`} className="ov-link" key={`${entry[0]}${entry[1]}`}>
            <Pair cur1={entry[0]} cur2={entry[1]} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Overview;
