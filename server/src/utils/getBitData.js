import axios from 'axios';
import to from 'await-to-js';

export const getBitData = async () => {
  const [error, { data }] = await to(
    axios.get(
      'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=ILS&apikey=MFU1KKQS6EN5TUKL'
    )
  );

  if (error) {
    console.error('Error Fetching response', error.message);
    return false;
  }

  return data;
};
