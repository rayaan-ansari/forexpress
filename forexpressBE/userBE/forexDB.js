const currencies = ["AUD", "CAD", "CHF", "CNH", "CZK", "DKK", "USD", "EUR"];
const currencyComparisons = [["AUD", "CAD"], ["CHF", "CNH"], ["CZK", "JPY"], ["USD", "EUR"],
                            ["CAD", "CHF"], ["USD", "DKK"], ["CZK", "AUD"], ["CNH", "USD"],
                            ["DKK", "CAD"], ["USD", "CNH"]];

import mysql from 'mysql2/promise';

let con;

main();

async function main(){
  con = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Calculator21!",
    database: "users"
  });
  
  await testQuery(); 
}

async function testQuery(){
  // signUp('rayaan', 'rayaan21');
  //  await updateBalance('rayaan', "USD", 10);
  // await updateHistory('rayaan', 2024, 11, 27, 20, 41, "USD", "DKK", 80);
}

/*
  check if username exists, validates username password combination
*/

async function validateUser(username, password){

  const [rows, fields] = await con.execute('SELECT password FROM data WHERE username = \'' + username + '\'');
  
  if(rows.length == 1){
    if(password == rows[0].password){
      console.log("Correct Password");
      return 2;
    }
    else{
      console.log("Wrong Password");
      return 1;
    }
  }
  else{
    console.log("No username found. " + username + " " + password);
    return 0;
  }
}

/*
  authenticates user. If authenticated, returns history
*/

async function signUp(username, pass){
  var emptyBalance = [];

  for(var i = 0; i < currencies.length; i++){
    emptyBalance.push([currencies.at(i), 0]);
  }

  emptyBalance = JSON.stringify(emptyBalance);
  const emptyHistory = JSON.stringify([]);

  console.log('insert into data values (\'' + username + '\',' + '\'' + pass + '\',' + '\'' + emptyHistory + '\',' + '\'' + emptyBalance + '\')' );
  con.execute('insert into data values (\'' + username + '\',' + '\'' + pass + '\',' + '\'' + emptyHistory + '\',' + '\'' + emptyBalance + '\')' );
}

async function login(username, password){
  if(await validateUser(username, password) == 2){
    console.log("Authentication succeeded.");
    var userHistory = await getHistory(username);
    console.log("History : " + userHistory);
    var balance = await getBalance(username);
    console.log("balance : " + balance);
    return true;
  }
  else{
    console.log("Authentication failed.");
    return false;
  }
}

/*
  get balance of user
*/

async function getBalance(username){
  try{
    const [rows, fields] = await con.execute('SELECT balance FROM data WHERE username = \'' + username + '\'');
    // console.log(rows);
    // console.log(rows[0]);
    // console.log(rows[0].balance);
    const newRows = await rows[0].balance;
    return newRows;
  } catch(err){
    console.log("ERROR : " + err);
  }
}

async function updateBalance(username, cur, amt){
    var balance = await getBalance(username);
    //balance = "\'" + balance + "\'";
    balance = JSON.parse(balance);
    cur = cur.toUpperCase();
    var res = "";

    console.log("BALANCE : " + balance);
    console.log(balance[0][0] + " ABC " + balance[0][1]);

    for(var i = 0; i < balance.length; i++){
      console.log(cur + " / " + balance.at(i).at(0));
      if(cur == balance.at(i).at(0)){
        console.log("MADE IT : " + balance[i][1] + " / " + amt);

        if(balance[i][1] + amt >= 0){
          balance[i][1] += amt;
          res = "success";
        }
        else{
          res = "not enough currency"
        }
      }
    }

    console.log(username + " / " + cur + " / " + amt);

    const newBalance = await JSON.stringify(balance);
    //console.log("NEW BALANCE : " + newBalance);
    const query = 'update data set balance = \'' + newBalance + '\' where username = \'' + username + '\'';
    console.log(query);

    await con.execute(query);

    return res;
}

/*
  get history from user
*/

async function getHistory(username){
  try{
    const [rows, fields] = await con.execute('SELECT history FROM data WHERE username = \'' + username + '\'');
    console.log(rows);
    const newHist = await rows[0].history;
    console.log(newHist);
    return newHist;
  } catch(err){
    console.log("ERRORSSS : " + err);
  }
}

async function updateHistory(username, year, month, day, hour, minute, cur1, cur2, amt){
  var oldHistory = await getHistory(username);
  oldHistory = await JSON.parse(oldHistory);
  const entry = [year, month, day, hour, minute, cur1, cur2, amt];
  await oldHistory.push(entry);
  const newHistory = await JSON.stringify(oldHistory);
  console.log(newHistory);
  const query = 'update data set history = \'' + newHistory + '\' where username = \'' + username + '\'';
  console.log(query);
  await con.execute(query);
}

export { login, getHistory, getBalance, validateUser, signUp, updateBalance, updateHistory };
