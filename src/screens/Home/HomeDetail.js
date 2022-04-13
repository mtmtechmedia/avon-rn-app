/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {DEFAULT_HEIGHT} from '../../data/MockData';
import Loading from '../../components/Loading';

const HomeDetail: () => Node = props => {
  const app_dark_set = useMappedState(state => state.login.isDarkMode);

  const backgroundStyle = {
    backgroundColor: '#232228',
  };

  const playDetail =
    props.route.params.playDetail || 'Detail playDetail create error';
  const totalList =
    props.route.params.totalList || 'Detail totalList create error';
  const [market, setMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const disPatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await getAll();
    });
    return unsubscribe;
  }, []);

  const getAll = async () => {
    try {
      let result = totalList.filter(place => place.Area === playDetail[0]);
      setMarket(result);
      setIsLoading(false);
    } catch (e) {
      console.log('HomeDetail get error::::', e);
    }
  };

  const showNewsDetail = async cases => {
    try {
      const url = cases;

      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderBook = cases => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await showNewsDetail(cases.WebsiteLink);
        }}
        underlayColor="yellow">
        <View>
          <View style={styles.MainView}>
            {cases.ImageFile ? (
              <Image
                source={{url: cases.ImageFile}}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.thumbnail}></View>
            )}

            <View style={{flex: 2.5}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  color: '#FFFF',
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 8,
                  fontFamily: 'PingFang SC',
                }}>
                {cases.Caption ?? 'no Caption support'}
              </Text>

              <Text
                ellipsizeMode="middle"
                numberOfLines={2}
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: 5,
                  fontSize: 10,
                  fontWeight: '300',
                  marginBottom: 1,
                  fontFamily: 'PingFang SC',
                }}>
                {cases.StartDate ?? 0}
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 8,
                  fontWeight: '300',
                  marginBottom: 1,
                  fontFamily: 'PingFang SC',
                  paddingLeft: 50,
                }}>
                {'|'}
              </Text>
              <Text
                ellipsizeMode="middle"
                numberOfLines={2}
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 10,
                  fontWeight: '300',
                  marginBottom: 8,
                  fontFamily: 'PingFang SC',
                }}>
                {cases.EndDate ?? 0}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
              }}>
              <Text
                ellipsizeMode="middle"
                numberOfLines={3}
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 8,
                  fontFamily: 'PingFang SC',
                }}>
                ${' '}
                {cases.TicketPrice && cases.TicketPrice != ''
                  ? cases.TicketPrice
                  : 0}
              </Text>
            </View>
            <Image
              source={require('../../img/small_icon_btn/arrow_right.png')}
              style={{width: 20, height: 20}}
            />
          </View>
          {/* <View style={styles.seperator} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={app_dark_set ? 'light-content' : 'dark-content'} />
      <View style={{height: DEFAULT_HEIGHT * 0.87}}>
        <View
          style={{
            backgroundColor: '#232228',
          }}>
          <View style={{marginTop: 19, marginBottom: 12}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
                marginLeft: 8.17,
                fontFamily: 'PingFang SC',
              }}>
              {playDetail[0]}: {playDetail[1]}
            </Text>
          </View>
          {isLoading ? (
            <View>
              <Loading />
            </View>
          ) : market.length > 0 &&
            market[0] != null &&
            market[0] != undefined ? (
            <View style={{}}>
              <FlatList
                data={market}
                renderItem={cases => renderBook(cases.item)}
                keyExtractor={cases => cases.ID}
                style={{
                  backgroundColor: '#232228',
                  marginBottom: 170,
                  marginTop: 10,
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232A3C',
    padding: 8,
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    elevation: 6,
  },
  seperator: {
    height: 20,
    // backgroundColor: '#dddddd'
  },
  thumbnail: {
    width: 70,
    height: 80,
    marginRight: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
});

export default HomeDetail;
