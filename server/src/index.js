import express from 'express';
import mongoose from 'mongoose';
import parser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import { Day, deleteAllDays } from './models';
import { getBitData } from './utils';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(parser.urlencoded());
app.use(parser.json());
app.use(errorHandler());

app.use(cors({ origin: true }));

app.get('/getAll', async (req, res) => {
  const days = await Day.find();

  return res.sendStatus(200).send(days);
});

app.get('/get/:date', async (req, res) => {
  const { date: dateParam } = req.params;

  const dateParsed = new Date(dateParam);

  if (!dateParam || !dateParsed || dateParsed.toString() === 'Invalid Date') {
    return res.sendStatus(400);
  }

  const day = await Day.findOne({ date: dateParsed });

  if (!day) {
    return res.sendStatus(404).send({ message: 'Date not found' });
  }

  const {
    date, open, high, low, close, openUSD, highUSD, lowUSD, closeUSD,
  } = day;

  res.send({
    date,
    ILS: [
      { name: 'open', value: open },
      { name: 'high', value: high },
      { name: 'low', value: low },
      { name: 'close', value: close },
    ],
    USD: [
      { name: 'open', value: openUSD },
      { name: 'high', value: highUSD },
      { name: 'low', value: lowUSD },
      { name: 'close', value: closeUSD },
    ],
  });
});

(async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'test',
    });

    await deleteAllDays();

    const response = await getBitData();

    const responseEntries = Object.entries(
      response['Time Series (Digital Currency Daily)'],
    );

    const mappedResponse = responseEntries.map((row) => ({
      date: row[0],
      open: row[1]['1a. open (ILS)'],
      high: row[1]['2a. high (ILS)'],
      low: row[1]['3a. low (ILS)'],
      close: row[1]['4a. close (ILS)'],
      openUSD: row[1]['1b. open (USD)'],
      highUSD: row[1]['2b. high (USD)'],
      lowUSD: row[1]['3b. low (USD)'],
      closeUSD: row[1]['4b. close (USD)'],
    }));

    await Day.insertMany(mappedResponse);
  } catch (err) {
    console.error(err.message);
  }
  app.listen(PORT, async () => {
    console.log(`app is running in port ${PORT}`);
  });
})();
