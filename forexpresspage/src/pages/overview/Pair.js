import './Pair.css';
import {useState, useEffect} from 'react';
import ChartMaker from './ChartMaker.js'
function Pair({cur1, cur2}){
    const [currentPrice, setCurrentPrice] = useState(0);
    useEffect(() => {
        async function runEffect(){
            const url = "https://limpness-blemish-oblong.ngrok-free.dev/api/getData/Top/" + cur1 + "/" + cur2;

            var data = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
            if (!data.ok) {
                throw new Error('Network response was not ok');
            }
            data = await data.json();
            data = await data.data;
            data = JSON.parse(data);
            data = data[0];
            setCurrentPrice(data.price);
        }
        runEffect();
    }, [cur1, cur2]);
    return(
        <div className="mkt-card">
            <div className="mkt-top">
                <span className="mkt-pair">{cur1}<span className="mkt-slash">/</span>{cur2}</span>
                <span className="mkt-price">{currentPrice}</span>
            </div>
            <ChartMaker time={"NowData"} cur1={cur1} cur2={cur2} />
            <div className="mkt-foot">
                <span className="mkt-tag">FX pair</span>
                <span className="mkt-view">View pair →</span>
            </div>
        </div>
    );
}
export default Pair;
