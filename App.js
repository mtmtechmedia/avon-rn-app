/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, Image} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import configureStore from './src/store';
import {StoreContext} from 'redux-react-hook';
const store = configureStore();

import Login from './src/screens/Login/Login';
// Home tab
import Home from './src/screens/Home/Home';
import HomeDetail from './src/screens/Home/HomeDetail';
// Setting tab
import Setting from './src/screens/Setting/Setting';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tab_images = {
  image1: require('./src/img/tab/tab_home.png'),
  image2: require('./src/img/tab/tab_home_green.png'),
  image3: require('./src/img/tab/tab_setting.png'),
  image4: require('./src/img/tab/tab_setting_green.png'),
};

function LoginStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {backgroundColor: '#232A3C'},
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{}} />
    </Stack.Navigator>
  );
}

function HomeTab(props) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#232A3C'},
        headerTintColor: 'white',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{headerTitle: 'Detail'}}
      />
    </Stack.Navigator>
  );
}

function SettingTab(props) {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#232A3C'},
        headerTintColor: 'white',
        headerTitle: 'Setting',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="SettingScreen"
        component={Setting}
        options={{headerLeft: null}}
      />
    </Stack.Navigator>
  );
}

function MainIndexScreen(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        headerBackTitleVisible: false,
        headerLeft: null,
        tabBarInactiveBackgroundColor: '#21242E',
        tabBarActiveBackgroundColor: '#21242E',
        tabBarActiveTintColor: '#6FFFEE',
        tabBarInactiveTintColor: '#C4C4C4',
        tabBarStyle: {backgroundColor: '#21242E'},
        tabBarIcon: ({color, focused}) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = focused ? tab_images.image2 : tab_images.image1;
          } else if (route.name == 'Setting') {
            iconName = focused ? tab_images.image4 : tab_images.image3;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: 28,
                height: 28,
                backgroundColor: '#21242E',
              }}
            />
          );
        },
      })}>
      <Tab.Screen name={'Home'} component={HomeTab} />
      <Tab.Screen name={'Setting'} component={SettingTab} />
    </Tab.Navigator>
  );
}

const App: () => Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator presentation="modal" headerShown="false">
        <RootStack.Screen
          name="LoginStack"
          component={LoginStackScreen}
          options={{header: () => null}}
        />
        <RootStack.Screen
          name="IndexScreen"
          component={MainIndexScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default function MyApp() {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  );
}
