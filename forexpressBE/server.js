import express from 'express';
import apiOne from './marketBE/curAPI.js';
import apiTwo from './userBE/forexAPI.js';
import cors from 'cors';

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection (request failed, server stays up):', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception (request failed, server stays up):', err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(apiOne);
app.use(apiTwo);

app.listen(3001, () => {
  console.log('Both APIs running on port 3001');
});