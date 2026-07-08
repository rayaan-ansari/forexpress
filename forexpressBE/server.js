import express from 'express';
import apiOne from './marketBE/curAPI.js';
import apiTwo from './userBE/forexAPI.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(apiOne);
app.use(apiTwo);

app.listen(3001, () => {
  console.log('Both APIs running on port 3001');
});