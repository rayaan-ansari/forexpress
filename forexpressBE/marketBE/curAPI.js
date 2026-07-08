import { getTop, getNowData, getDayData, getWeekData, getMonthData, getYearData, getFiveYearsData } from './curDB.js';
import express from 'express';
const router = express.Router();

const functionsMap = {
    getTop : getTop,
    getNowData : getNowData,
    getDayData: getDayData,
    getWeekData: getWeekData,
    getMonthData: getMonthData,
    getYearData: getYearData,
    getFiveYearsData: getFiveYearsData
};

router.get('/api/getData/:func/:cur1/:cur2', async (req, res) => {
    //console.log("Data get works");
    var cur1 = req.params.cur1;
    var cur2 = req.params.cur2;
    var func = req.params.func;
    var dataTop;

    func = "get" + func;

    //console.log(cur1 + " " + cur2 + " " + func);
    if (functionsMap[func]) {
        dataTop = await functionsMap[func](cur1, cur2);
    } else {
        console.error(`Function ${func} does not exist`);
    }
   //console.log(dataTop);
    res.status(244).send({
        data : JSON.stringify(dataTop)
    });
});

export default router;