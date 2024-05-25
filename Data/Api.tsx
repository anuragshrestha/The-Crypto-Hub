import {Crypto} from './CryptoData';

const API = 'https://api.coinlore.net/api/tickers/';

const getCrypto = async () => {
  try {
    const response = await fetch(API);
    const json = (await response.json()) as Crypto;
    return json;
  } catch (error) {
    console.log(error);
  }
};

export {getCrypto};
