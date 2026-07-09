
// db has x tables for each of x currency comparisons
// should be able to get stock price / yr / mo / da / hr / mi

const currencies = ["AUD", "CAD", "CHF", "CNH", "CZK", "DKK", "USD", "EUR"];
const currencyComparisons = [["AUD", "CAD"], ["CHF", "CNH"], ["CZK", "JPY"], ["USD", "EUR"],
                            ["CAD", "CHF"], ["USD", "DKK"], ["CZK", "AUD"], ["CNH", "USD"],
                            ["DKK", "CAD"], ["USD", "CNH"]];

import mysql from 'mysql2/promise';

let con;

function generateRandomChange(){
    return Math.random() / 10;
}

main();

export async function resetIncrement(cur1, cur2){
    var x = cur1 + cur2;
    con.execute('ALTER TABLE ' + x + ' DROP entryNumber');
    con.execute('ALTER TABLE ' + x + ' AUTO_INCREMENT = 1');
    con.execute('ALTER TABLE ' + x + ' ADD entryNumber int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST');
}

export async function createTables(){
    for(var i = 0; i < 10; i++){
        con.execute('create table ' + currencyComparisons.at(i).at(0) + currencyComparisons.at(i).at(1) + ' (entryNumber int NOT NULL AUTO_INCREMENT,year varchar(4),month varchar(2),day varchar(2),hour varchar(2),minute varchar(2),price varchar(15), PRIMARY KEY (entryNumber))')
    }
}

export async function testQuery(){
    
    //resetIncrement("tester", "");

    //insertPrice("2024", "11", "22", "18", "45", "4", "tes", "ter");
    // insertPrice("2024", "11", "22", "19", "45", "5", "USD", "DKK");
    // insertPrice("2024", "11", "22", "20", "45", "6", "USD", "DKK");
    
    // getTop("USD", "DKK");

    // getIndexFromTop("USD", "DKK", 2);
}

export async function main(){
  con = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Calculator21!",
    database: "currencies"
  });  
  //var arr = await getNowData("tes", "ter");
  //console.log(arr);
}                            

export async function insertPrice(year, month, day, hour, minute, price, cur1, cur2){
    // console.log('insert into ' + cur1 + cur2 + ' (year,month,day,hour,minute,price) values (\'' + year + '\',' + '\'' + month + '\',' + '\'' + day + '\',' + '\'' + hour + '\',' + '\'' + minute + '\',' + '\'' + price + '\')');
    await con.query('insert into ' + cur1 + cur2 + ' (year,month,day,hour,minute,price) values (\'' + year + '\',' + '\'' + month + '\',' + '\'' + day + '\',' + '\'' + hour + '\',' + '\'' + minute + '\',' + '\'' + price + '\')');
}

async function getHistory(cur1, cur2, index){

}

export async function getSize(cur1, cur2){
    const data = await con.execute('SELECT COUNT(*) FROM ' + cur1 + cur2);
    var size = data[0][0]['COUNT(*)'];
    return size;
}

export async function getIndexFromTop(cur1, cur2, indexFromTop){
    var size = await getSize(cur1, cur2);
    var index = size - indexFromTop + 1;
    //console.log(size + " " + indexFromTop + " " + index);

    if(index > 0){
        const topPrice = await con.execute('select * from ' + cur1 + cur2 + ' where entryNumber = ' + index);
        //console.log(topPrice);
        return topPrice;
    }
    else{
        //console.log("This index is less than 1");
    }
}

export async function getData(cur1, cur2, numEntries, dif){
    var data = [];
    var size = await getSize(cur1, cur2);
    for(var i = 0; i < numEntries && i * dif + 1 <= size; i++){
        var rowData = await getIndexFromTop(cur1, cur2, 1 + i * dif);
        data.push(rowData[0][0]);
        //console.log(data);
    }
    return data;
}

export async function getTop(cur1, cur2){
    return await getData(cur1, cur2, 1, 1);
}
export async function getNowData(cur1, cur2){
    return await getData(cur1, cur2, 180, 2);
}
export async function getDayData(cur1, cur2){
    return await getData(cur1, cur2, 24, 60);
}
export async function getWeekData(cur1, cur2){
    return await getData(cur1, cur2, 24 * 7, 480);
}
export async function getMonthData(cur1, cur2){
    return await getData(cur1, cur2, 30 * 24, 1440);
}
export async function getYearData(cur1, cur2){
    return await getData(cur1, cur2, 24 * 365, 21600);
}
export async function getFiveYearsData(cur1, cur2){
    return await getData(cur1, cur2, 60, 43200);
}

