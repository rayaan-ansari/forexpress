import { insertPrice } from './curDB.js';
import mysql from 'mysql2/promise';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let con;

main();

async function priceGeneratorServer(){
    
    while(true){

        for(var i = 0; i < currencyComparisons.length; i++){
            var dates = getNextDate();
            var price = generateNewPrice(price);

            var year = dates[0];
            var month = dates[1];
            var day = dates[2];
            var hour = dates[3];
            var minute = dates[4];
            var cur1 = currencyComparisons.at(i).at(0);
            var cur2 = currencyComparisons.at(i).at(1);

            insertPrice(year, month, day, hour, minute, price, cur1, cur2);
        }

        sleep(60000);

    }
}

async function main(){

    const currencyComparisons = [["AUD", "CAD"], ["CHF", "CNH"], ["CZK", "JPY"], ["USD", "EUR"],
                            ["CAD", "CHF"], ["USD", "DKK"], ["CZK", "AUD"], ["CNH", "USD"],
                            ["DKK", "CAD"], ["USD", "CNH"]];

    con = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Calculator21!",
      database: "currencies"
    });

    for(var i = 1; i < currencyComparisons.length; i++){
        const stopYear = 2024, stopMonth = 5, stopDay = 31, stopHour = 2, stopMinute = 17;
        let startYear = 2019, startMonth = 6, startDay = 16, startHour = 6, startMinute = 55;
        //console.log(startYear + " " + startMonth);
        var cur1 = currencyComparisons[i][0];
        var cur2 = currencyComparisons[i][1];
        var price = 0.5;
        var z = 0
        while(z != 10000){
            z++;
           // console.log(startYear + " " + startMonth + " " + stopYear + " " + stopMonth + " " + price);

            const arr = await getNextDate(startYear, startMonth, startDay, startHour, startMinute);
            startYear = arr[0];
            startMonth = arr[1];
            startDay = arr[2];
            startHour = arr[3];
            startMinute = arr[4];

            //console.log(cur1 + " " + cur2);

            price = await generateNewPrice(price);

            //console.log("price : " + price);

            await insertPrice(startYear, startMonth, startDay, startHour, startMinute, price, cur1, cur2);
        }

    }
}

async function genChange(price){ return (((Math.random() * 2 - 1) * (parseFloat(price) + 0.5)) / 10).toFixed(5); }

function leap(year){
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

async function getNextDate(year, month, day, hour, minute){

    //console.log(year + " " + month + " " + day + " " + hour + " " + minute);

    minute++;
    if(minute == 60){
        minute = 0;
        hour++;
    }
    if(hour == 24){
        hour = 0;
        day++;
    }
    if((    (day == 32) && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) || 
            ((day == 31) && (month == 4 || month == 6 || month == 9 || month == 11)) || 
            (day == 29 && month == 2 && !leap(year)) || 
            (day == 30 && month == 2 && leap(year))){

        day = 1;
        month++;

    }
    if(month == 13){
        month = 1;
        year++;
    }
    const dateArray = [];
    dateArray.push(year);
    dateArray.push(month);
    dateArray.push(day);
    dateArray.push(hour);
    dateArray.push(minute);

    //console.log(dateArray);
    return dateArray;
}
async function generateNewPrice(price){
    var r = await genChange(price);
    r = await parseFloat(r);
    //console.log("R : " + r);
    if(parseFloat(price) + r > 0){
        //console.log("HERE");
        price = parseFloat(price);
        price += r;
        price = price.toFixed(5);
        return price;
    }
    else return price;
}