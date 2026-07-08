import './Pair.css';
import {useState, useEffect} from 'react';
import ChartMaker from './ChartMaker.js'
function Pair({cur1, cur2}){
    const [currentPrice, setCurrentPrice] = useState(0);
    useEffect(() => {
        async function runEffect(){
            const url = "http://localhost:3001/api/getData/Top/" + cur1 + "/" + cur2;
            //console.log(url);

            var data = await fetch(url);
            //console.log("data : " + data);
            if (!data.ok) {
                throw new Error('Network response was not ok');
            }
            data = await data.json();
           // console.log("topData : " + data);
            data = await data.data;
            //console.log(data);
            data = JSON.parse(data);
            //console.log(data);
            data = data[0];
            //console.log(data);
            //console.log(data.price);
            setCurrentPrice(data.price);
        }
        runEffect();
        //console.log("overall final : " + currentPrice);
    }, [cur1, cur2]);
    return(
        <a href="https://www.w3schools.com">
          <div className="pair">
            <div className="meta">
                <p>{cur1} / {cur2}</p>
                <p>Price : {currentPrice}</p>
            </div>
                <ChartMaker time={"NowData"} cur1={cur1} cur2={cur2} className="chart" />
            <div className="line"></div>
          </div>
        </a>
    );
}
export default Pair;