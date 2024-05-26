import type {RouteProp} from '@react-navigation/native';

export type MainStackParamList = {
  AllCryptoCurrencies: undefined;
  CryptoCurrencies: undefined;
  CryptoDetails: {id: string};
  WatchList: undefined;
};

export type DetailsScreenRoute = RouteProp<MainStackParamList, 'CryptoDetails'>;
