import axios from 'axios';

function http(data: any) {
  axios.post(
    'https://the-crypto-hub-default-rtdb.firebaseio.com/cryptos.json',
    data,
  );
}

export default http;
