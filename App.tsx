import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import IconButton from './components/IconButton';
import Cryptos from './screens/Cryptos';
import WatchList from './screens/WatchList';
import CryptoDetails from './screens/CryptoDetails';
import {MainStackParamList} from './types/navigation';

const Tab = createBottomTabNavigator<MainStackParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarIconStyle: {backgroundColor: 'purple'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: 'black',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
      }}>
      <Tab.Screen
        name="CryptoCurrencies"
        component={Cryptos}
        options={{
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => <IconButton icon="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => <IconButton icon="star" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="AllCryptoCurrencies"
            component={TabNavigator}
            options={{
              title: ' ',
              headerShown: false,
              headerStyle: {backgroundColor: 'blue'},
            }}
          />
          <Stack.Screen
            name="CryptoDetails"
            component={CryptoDetails}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: 'blue'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
