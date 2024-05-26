import type {RouteProp} from '@react-navigation/native';

export type MainStackParamList = {
  AllCryptoCurrencies: undefined;
  CryptoCurrencies: undefined;
  CryptoDetails: {
    id: string;
    name: string;
    symbol: string;
    price_1hr: string;
    price_1day: string;
    price_7day: string;
    market_cap: string;
    price: string;
  };
  WatchList: undefined;
};

export type DetailsScreenRoute = RouteProp<MainStackParamList, 'CryptoDetails'>;
