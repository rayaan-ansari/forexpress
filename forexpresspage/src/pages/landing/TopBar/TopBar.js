import './TopBar.css';
import { Link } from 'react-router-dom';

export default function TopBar(data = [["signup", "Sign up"], ["login", "Log in"]]) {
    return (
        <header className="nav">
            <div className="nav-inner">
                <Link to="/" className="nav-brand">
                    <span className="nav-brand-mark" aria-hidden="true" />
                    <span className="nav-brand-text">forexpress</span>
                </Link>
                <nav className="nav-actions">
                    {data.buttonData.map((entry, i) => (
                        <Link to={`/${entry[0]}`} key={`${entry[0]}-${i}`}>
                            <button className={i === 0 ? "nav-btn nav-btn-primary" : "nav-btn"}>
                                {entry[1]}
                            </button>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
