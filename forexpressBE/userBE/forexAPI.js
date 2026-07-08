import { getHistory, getBalance, validateUser, signUp, updateBalance, updateHistory } from './forexDB.js';
import express from 'express';
const router = express.Router();

router.get('/api/getUser/:username', async (req, res) => {
    console.log("get works");
    var username = req.params.username;

    var balance = await getBalance(username);
    var history = await getHistory(username);

    console.log(history);

    //console.log("DATA : ")
    //console.log(balance + " " + history);
    res.status(244).send({
        balance : balance,
        history : history
    });
});

router.get('/api/login/:username/:password', async (req, res) => {
    var username = req.params.username;
    var password = req.params.password;

    var result = await validateUser(username, password);

    if(result == 2){
        var balance = await getBalance(username);
        var history = await getHistory(username);
        res.status(244).send({
            success : true,
            balance : balance,
            history : history
        });
    }
    else{
        res.status(300).send({ success : false, message : "Incorrect username or password" });
    }
});

router.post('/api/login', async (req, res) => {
    const {username, password} = req.body;

    var result = await validateUser(username, password);

    if(result == 2){
        var balance = await getBalance(username);
        var history = await getHistory(username);
        res.status(244).send({
            message : "Login successful",
            balance : balance,
            history : history
        });
    }
    else{
        res.status(300).send({ message : "Incorrect username or password" });
    }
});

router.post('/api/signUser', async (req, res) => {
    console.log("post works");
    
    console.log(req.body);
    const {username, password} = req.body;
    var pass = password;
    console.log(pass);
    if(await validateUser(username, pass) == 0){
        await signUp(username, pass);
        res.status(245).send({ message : "Sign up successful"});
    }
    else{
        res.status(300).send({ message : "Username or password in use"});
    }
    
});

router.get('/api/updateBalance/:user/:cur/:amt/:buysell', async (req, res) => {
    console.log("update balance works");
    var user = req.params.user;
    var cur = req.params.cur;
    var amt = req.params.amt;
    var buysell = req.params.buysell;

    amt = parseInt(amt);

    if(buysell == "sell") amt *= -1;

    var result = await updateBalance(user, cur, amt);

    if(result == "success") res.status(244).send({message : "sent balance update"})
    else res.status(300).send({message : "Not enough currency in wallet"});
});

router.get('/api/updateHistory/:user/:cur1/:cur2/:amt', async (req, res) => {
    console.log("update balance works");
    var user = req.params.user;
    var cur1 = req.params.cur1;
    var cur2 = req.params.cur2;
    var amt = req.params.amt;
    amt = parseInt(amt);

    console.log(user + " / " + cur1 + " / " + cur2 + " / " + amt)

    const date = new Date();

    console.log(date);
    let minute = date.getMinutes();
    let hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    console.log(minute, hour, day, month, year);

    await updateHistory(user, year, month, day, hour, minute, cur1, cur2, amt);

    res.status(244).send({message : "sent hist update"});
});

export default router;