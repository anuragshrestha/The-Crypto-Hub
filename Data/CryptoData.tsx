export interface Crypto {
  data: [CryptoData];
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  price: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_1day: string;
  price_7day: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
}
