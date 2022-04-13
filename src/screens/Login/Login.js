/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ion from 'react-native-vector-icons/FontAwesome';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {DEFAULT_WIDTH} from '../../data/MockData';
import {saveToStorage, fetchLists} from '../../reducers/reducer_main';

const Login: () => Node = props => {
  const app_dark_set = useMappedState(state => state.login.isDarkMode);

  const slides = [
    {
      key: '1',
      title: 'Welcome',
      text: 'It will be your best holiday portal!!! \n Trust me!!!',
      image: require('../../img/intro/WelcomePage-2.png'),
    },
    {
      key: '2',
      title: 'The Best Management Portal',
      text: 'You can easily find where to go!',
      image: require('../../img/intro/WelcomePage-2.png'),
    },
    {
      key: '3',
      title: 'Key Features in App',
      text: 'You can find more detail in every list.',
      image: require('../../img/intro/WelcomePage-2.png'),
    },
  ];

  const all_ListsGetParse = useMappedState(state => state.login.fetchLists);
  const disPatch = useDispatch();

  // for app intro slider
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: '#000000',
          },
        ]}>
        <ImageBackground
          source={require('../../img/bg/loginPage_bg.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            width: DEFAULT_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={item.image} style={styles.image} />
          <View
            style={{
              marginTop: 40,
              marginBottom: 20,
              width: 290,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </ImageBackground>
      </View>
    );
  };

  const _onDone = () => {
    // console.log('進入_onDone');
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="arrow-right" //"arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      // <View style={styles.buttonCircle}>
      //     <Ion
      //         name="check"
      //         color="rgba(255, 255, 255, .9)"
      //         size={24}
      //     />
      // </View>
      <View
        style={{
          marginRight: 45,
          marginTop: -85,
          width: 269,
          height: 60,
          // backgroundColor: '#4AE8DE',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../img/btn/intro_btn_bg.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            width: 269,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              fontFamily: 'PingFang SC',
              color: 'white',
              textAlign: 'center',
            }}>
            Start
          </Text>
        </ImageBackground>
      </View>
    );
  };

  const loadAll = useCallback(() => {
    disPatch(fetchLists());
  }, [all_ListsGetParse]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      loadAll();
    });

    Ion.loadFont();

    // for test
    // disPatch(saveToStorage('all_lists', []));

    if (
      all_ListsGetParse !== '' &&
      all_ListsGetParse !== null &&
      all_ListsGetParse.length > 0
    ) {
      props.navigation.replace('IndexScreen');
    }

    return unsubscribe;
  }, [loadAll]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={app_dark_set ? 'light-content' : 'dark-content'} />

      {showRealApp == true ? (
        <View style={styles.container}>
          <ImageBackground
            source={require('../../img/bg/loginPage_bg.png')}
            resizeMode="cover"
            style={{
              flex: 1,
              width: DEFAULT_WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={require('../../img/bg/galaxy_bg.png')}
              resizeMode="cover"
              style={{
                flex: 1,
                width: DEFAULT_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginLeft: 130,
                  marginRight: 130,
                  marginTop: 180,
                  marginBottom: 250,
                }}>
                <Image
                  source={require('../../img/intro/Logo_general.png')}
                  style={{width: 132, height: 132}}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: 53,
                  marginRight: 53,
                  marginTop: 58,
                  width: 269,
                  height: 60,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  props.navigation.replace('IndexScreen');
                }}>
                <ImageBackground
                  source={require('../../img/btn/intro_btn_bg.png')}
                  resizeMode="cover"
                  style={{
                    flex: 1,
                    width: 269,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      fontFamily: 'PingFang SC',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Start Quick!!!
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 115, marginRight: 115, marginTop: 19}}
                onPress={() => {
                  console.log('info link');
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: 'PingFang SC',
                    color: '#6FFFEE',
                    textDecorationLine: 'underline',
                  }}>
                  more info
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </ImageBackground>
        </View>
      ) : (
        <AppIntroSlider
          renderItem={item => _renderItem(item)}
          data={slides}
          onDone={() => setShowRealApp(true)}
          keyExtractor={item => item.title}
          renderDoneButton={() => _renderDoneButton()}
          renderNextButton={() => _renderNextButton()}
          showNextButton={false}
          // showDoneButton={false}
          dotStyle={{
            marginTop: -330,
            backgroundColor: 'rgba(172, 172, 172, 0.8)',
          }}
          activeDotStyle={{marginTop: -330, backgroundColor: '#6FFFEE'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', //'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    marginTop: -90,
    // marginBottom: 28
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#C4C4C4',
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'PingFang SC' : 'sans-serif-thin',
    width: 280,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'PingFang SC' : 'sans-serif-thin',
  },
});

export default Login;
