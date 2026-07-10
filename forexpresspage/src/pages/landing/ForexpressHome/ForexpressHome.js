import './ForexpressHome.css';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    tag: "Aligned incentives",
    title: "It just makes sense",
    text: "Using our product makes a lot of sense because we earn money when you use our product. This makes it easier for us to do things.",
  },
  {
    tag: "Zero cost",
    title: "It costs nothing",
    text: "Our product is a demo. That means using it is completely free until it isn't. You trade with fake money, so there is nothing to lose.",
  },
  {
    tag: "Privacy, mostly",
    title: "We don't sell your data",
    text: "When you use any of our products, you are given our absolute guarantee that we only sell half of your data to the government.",
  },
];

const TICKER = [
  ["EUR/USD", "1.0842", true],
  ["USD/JPY", "157.31", false],
  ["AUD/CAD", "0.9124", true],
  ["CHF/CNH", "8.0431", true],
  ["USD/DKK", "6.8907", false],
  ["CZK/JPY", "6.7218", true],
];

export default function ForexpressHome() {
  return (
    <div className="lp">
      <section className="lp-hero">
        <span className="lp-eyebrow">Live foreign exchange · demo trading</span>
        <h1 className="lp-title">
          Trade the world's
          <br />
          currencies with <span className="lp-title-accent">forexpress</span>
        </h1>
        <p className="lp-lede">
          A full-stack foreign exchange playground. Track live pairs, read the charts,
          and build a portfolio — all with fake money and zero risk.
        </p>
        <div className="lp-cta">
          <Link to="/signup">
            <button className="lp-btn lp-btn-primary">Create free account</button>
          </Link>
          <Link to="/overview">
            <button className="lp-btn lp-btn-ghost">View live markets →</button>
          </Link>
        </div>

        <div className="lp-ticker" role="list">
          {TICKER.map(([pair, price, up]) => (
            <div className="lp-tick" role="listitem" key={pair}>
              <span className="lp-tick-pair">{pair}</span>
              <span className="lp-tick-price">{price}</span>
              <span className={up ? "lp-tick-delta up" : "lp-tick-delta down"}>
                {up ? "▲" : "▼"} {up ? "0.32%" : "0.18%"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-features">
        {FEATURES.map((f) => (
          <article className="lp-card" key={f.title}>
            <span className="lp-card-tag">{f.tag}</span>
            <h2 className="lp-card-title">{f.title}</h2>
            <p className="lp-card-text">{f.text}</p>
          </article>
        ))}
      </section>

      <section className="lp-band">
        <div className="lp-band-inner">
          <div>
            <h2 className="lp-band-title">Ready to place your first trade?</h2>
            <p className="lp-band-text">Sign up in seconds. No card, no risk, no real money.</p>
          </div>
          <Link to="/signup">
            <button className="lp-btn lp-btn-primary">Get started</button>
          </Link>
        </div>
      </section>

      <footer className="lp-footer">
        <span className="lp-brand-mark" aria-hidden="true" />
        <span>forexpress</span>
        <span className="lp-footer-dim">— a demo project. Not financial advice.</span>
      </footer>
    </div>
  );
}
