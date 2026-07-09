import NewChart from './NewChart.js';
import fetchData from './Overview.js';
import React from 'react';
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
        //console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        var oldData = await response.json();
        //console.log(oldData);
        var hist = await oldData.data;
        hist = await JSON.parse(hist);
        //console.log("FINAL DATA : " + hist);
        if(Array.isArray(hist)){
          //console.log("YAY!");
        }
        else{
          //console.log("NO :(");
        }
        var labels = [];
        var newData = [];
        for(var i = 0; i < hist.length; i++){
            labels.push(i);
            newData.push(hist[i].price);
            // console.log("ENTRY : " + i);
            // console.log("DATA : " + hist[i].price);
        }
        // console.log(labels);
        // console.log(newData);
        await setLabel(labels);
        await setData(newData);

        if(newData[0] <= newData[newData.length - 1]){
            setLineColor('rgba(0,255,0,1)')
        } else{
            setLineColor('rgba(255,0,0,1)')
        }

        var highT = 0, lowT = INFINITY;

        for(var i = 0; i < newData.length; i++){
            if(newData[i] > highT){
                highT = newData[i];
                //console.log("HIGHER THAN HIGH : " + newData[i] + " - " + highT);
            }
            else{
                //console.log("LOWER THAN HIGH : " + newData[i] + " - " + highT);
            }
            if(newData[i] < lowT){
                lowT = newData[i];
                //console.log("LOWER THAN LOW : " + newData[i] + " - " + lowT);
            }
            else{
                //console.log("HIGHER THAN LOW : " + newData[i] + " - " + lowT);
            }
        }

        setHigh(highT);
        setLow(lowT);

        //console.log(high + " : " + low);

        //console.log("test:" + labels + " " + newData);
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
        datasets: [
          {
            backgroundColor: 'rgba(30, 30, 30 0.8)',
            borderColor: 'rgba(0,255,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,0,0,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
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
            y:{
                display: false
            },
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
            <NewChart data={chartData} options={chartOptions} className="chart" width={50} height={25} />
            <div id="chartMeta">
                <p>High : {high}</p>
                <p>Low : {low}</p>
            </div>
        </div>
    );
}