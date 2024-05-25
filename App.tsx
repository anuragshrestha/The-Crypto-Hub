import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import Cryptos from './screens/Cryptos';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import IconButton from './components/IconButton';
import WatchList from './screens/WatchList';
import {enableScreens} from 'react-native-screens';

enableScreens();

// creating a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// //creating a Stack Navigator
const Stack = createNativeStackNavigator();

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
        name="Crypto Currencies"
        component={Cryptos}
        options={{
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => <IconButton icon="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Watch List"
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
            name="All Crypto Currencies"
            component={TabNavigator}
            options={{
              headerShown: false,
              headerStyle: {backgroundColor: 'blue'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
