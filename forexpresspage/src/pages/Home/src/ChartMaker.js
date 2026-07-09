import NewChart from './NewChart.js';
import React from 'react';
import './ChartMaker.css'
import {useState, useEffect, useRef} from 'react';
const INFINITY = Number.POSITIVE_INFINITY;
export default function ChartMaker({time, cur1, cur2}){
    const [pot, setPot] = useState();
    const [label, setLabel] = useState([1, 2, 3, 4, 5]);
    const [data, setData] = useState([2, 4, 6, 8, 10]);
    const [lineColor, setLineColor] = useState('rgba(0, 0, 255, 1)');
    const [low, setLow] = useState(INFINITY);
    const [high, setHigh] = useState(0);

    const fetchHistory = async () => {
        const url = `https://limpness-blemish-oblong.ngrok-free.dev/api/getData/${time}/${cur1}/${cur2}`;
        console.log(url);
        const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        var oldData = await response.json();
        console.log(oldData);
        var hist = await oldData.data;
        hist = await JSON.parse(hist);
        console.log("FINAL DATA : " + hist);
        if(Array.isArray(hist)){
          console.log("YAY!");
        }
        else{
          console.log("NO :(");
        }
        var labels = [];
        var newData = [];
        for(var i = 0; i < hist.length; i++){
            labels.push(i);
            newData.push(hist[i].price);
            console.log("ENTRY : " + i);
            console.log("DATA : " + hist[i].price)
        }
        console.log(labels);
        console.log(newData);
        await setLabel(labels);
        await setData(newData);

        if(newData[0] <= newData[newData.length - 1]) setLineColor('rgba(0,255,0,1)');
        else setLineColor('rgba(255,0,0,1)');

        var highT = 0, lowT = INFINITY;

        for(var i = 0; i < newData.length; i++){
            if(newData[i] > highT) highT = newData[i];
            if(newData[i] < lowT) lowT = newData[i];
        }

        setHigh(highT);
        setLow(lowT);

        console.log(high + " : " + low);

        console.log("test:" + labels + " " + newData);
    };

    useEffect(() => {
        fetchHistory();
    }, [time, cur1, cur2]);

    useEffect(() => {
        setChartData({
            labels: label,
            datasets: [
                {
                    backgroundColor: 'rgba(30, 30, 30 0.8)',
                    borderColor: lineColor,
                    borderWidth: 2,
                    data: data,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
            ],
        });
    }, [data, label, time, cur1, cur2]);

    const [chartData, setChartData] = useState({
            labels: label,
            datasets: [
                {
                    backgroundColor: 'rgba(30, 30, 30 0.8)',
                    borderColor: lineColor,
                    borderWidth: 2,
                    data: data,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
            ],
        });
    
      const [chartOptions, setChartOptions] = useState({
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x:{
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
      });
    
    return (
        <div id="chartContainer">
            <div id="chartMeta">
                <p className="hi">High : {high}</p>
                <p className="lo">Low : {low}</p>
                <p>Current: {data[data.length - 1]}</p>
            </div>
            <div className="chart">
                <NewChart data={chartData} options={chartOptions} width={50} height={30} />
            </div>
        </div>
    );
}