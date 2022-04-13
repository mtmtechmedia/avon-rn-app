/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SectionList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {settingRow, DEFAULT_HEIGHT} from '../../data/MockData';
import {useMappedState} from 'redux-react-hook';

const Setting: () => Node = props => {
  const app_dark_set = useMappedState(state => state.login.isDarkMode);

  const backgroundStyle = {
    backgroundColor: app_dark_set ? Colors.darker : Colors.lighter,
  };

  const Item = ({cases, index}) => (
    <TouchableOpacity
      //   onPress={() => showDetail(cases)}
      disabled={true}>
      <View
        style={{
          paddingLeft: 13,
          paddingRight: 14,
          backgroundColor: 'rgba(196, 196, 196, 0.1)',
          borderTopRightRadius: index === 0 ? 10 : 0,
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderBottomRightRadius: cases.last
            ? cases.last === true
              ? 10
              : 0
            : 0,
          borderBottomLeftRadius: cases.last
            ? cases.last === true
              ? 10
              : 0
            : 0,
          alignItems: 'center',
          flexDirection: 'row',
          height:
            cases.title === 'Wallets'
              ? DEFAULT_HEIGHT * 0.055
              : DEFAULT_HEIGHT * 0.064,
          marginTop: index === 0 ? 15 : 0,
        }}>
        <Image
          source={cases.image}
          style={{marginRight: 16, width: 24, height: 24}}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            fontFamily: 'PingFang SC',
            color: '#ffffff',
            textAlign: 'left',
          }}>
          {cases.title}
        </Text>
        <View style={{flex: 1, marginRight: 6}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              fontFamily: 'PingFang SC',
              color: '#4AE8DE',
              textAlign: 'right',
            }}>
            {cases.show}
          </Text>
        </View>
        {cases.detail === true ? (
          <Image
            source={require('../../img/small_icon_btn/arrow_right.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: cases.last
            ? cases.last === true
              ? 'rgba(196, 196, 196, 0)'
              : 'rgba(196, 196, 196, 0.1)'
            : 'rgba(196, 196, 196, 0.1)',
        }}>
        <View
          style={{
            backgroundColor: cases.last
              ? cases.last === true
                ? 'rgba(172, 172, 172, 0)'
                : 'rgba(172, 172, 172, 0.3)'
              : 'rgba(172, 172, 172, 0.3)',
            height: 1,
            marginLeft: 50,
            marginRight: 21,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={app_dark_set ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: '#202734', //'#232228', //isDarkMode ? Colors.black : Colors.white,
        }}>
        <ImageBackground
          source={require('../../img/bg/main_bg.png')}
          resizeMode="cover"
          style={{flex: 1, height: DEFAULT_HEIGHT}}>
          <View
            style={{
              height: DEFAULT_HEIGHT, //* 0.7,
              marginLeft: 17,
              marginRight: 17,
              marginTop: 5,
            }}>
            <SectionList
              sections={settingRow}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => (
                <Item cases={item} index={index} />
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: 'PingFang SC',
                    color: '#979797',
                    textAlign: 'left',
                    lineHeight: 16.41,
                    marginTop: 20,
                  }}>
                  {title}
                </Text>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "turquoise",//'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  MainView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4edec', //'#008080',//'#000000',//'#00cccc',//
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  seperator: {
    height: 20,
    // backgroundColor: '#dddddd'
  },
  imageCheck: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
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
  inputText: {
    width: 350,
    height: 40,
    textAlign: 'center',
    color: 'black',
    borderColor: '#00cccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    marginLeft: 30,
  },
  sendButton: {
    width: 350,
    height: 40,
    backgroundColor: '#00cccc',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});

export default Setting;
