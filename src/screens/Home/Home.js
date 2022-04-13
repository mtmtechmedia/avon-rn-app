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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {DEFAULT_HEIGHT} from '../../data/MockData';
import {saveToStorage, fetchLists} from '../../reducers/reducer_main';
import {getList} from '../../lib/api';
import Loading from '../../components/Loading';

const Home: () => Node = props => {
  const app_dark_set = useMappedState(state => state.login.isDarkMode);

  const backgroundStyle = {
    backgroundColor: '#232228',
  };

  const [news, setNews] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalList, setTotalList] = useState([]);
  const [market, setMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const disPatch = useDispatch();
  const all_ListsGetParse = useMappedState(state => state.login.fetchLists);

  const loadAll = useCallback(() => {
    setIsLoading(true);
    disPatch(fetchLists());
  }, [all_ListsGetParse]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      loadAll();
      await getAll();
    });
    return unsubscribe;
  }, [loadAll]);

  const getAll = async () => {
    try {
      const getPlacelist = await getList();
      if (getPlacelist && getPlacelist.length != 0) {
        setTotalCount(getPlacelist.length);
        setTotalList(getPlacelist);
        splitArea(getPlacelist);
      }

      setNews('New activity is coming soon...');
      saveList(getPlacelist);
    } catch (e) {
      console.log('Home get error::::', e);
      if (
        all_ListsGetParse !== [] &&
        all_ListsGetParse !== null &&
        all_ListsGetParse.length > 0
      ) {
        setTotalCount(all_ListsGetParse.length);
        setTotalList(all_ListsGetParse);
        splitArea(all_ListsGetParse);
      } else {
        console.log('all_ListsGetParse no data:::::');
        setIsLoading(false);
      }
    }
  };

  const splitArea = requestGet => {
    const count = {};
    for (let index = 0; index < requestGet.length; index++) {
      const element = requestGet[index].Area;
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }

    let result = Object.keys(count).map(key => [key, count[key]]);
    setMarket(result);
    setIsLoading(false);
  };

  const saveList = async getList => {
    if (getList) {
      try {
        disPatch(saveToStorage('all_lists', getList));
      } catch (err) {
        console.log(`Home saveList err::: ${err}`);
      }
    }
  };

  const showTokenDetail = playDetail => {
    props.navigation.push('HomeDetail', {
      playDetail: playDetail,
      totalList: totalList,
    });
  };

  const renderBook = cases => {
    return (
      <TouchableOpacity
        onPress={() => {
          showTokenDetail(cases);
        }}
        underlayColor="yellow">
        <View>
          <View style={styles.MainView}>
            <View style={{flex: 1}}>
              <Text
                ellipsizeMode="middle"
                numberOfLines={3}
                style={{
                  color: '#FFFF',
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 8,
                  fontFamily: 'PingFang SC',
                }}>
                {cases[0] === 'null' ? 'no area support' : cases[0]}
              </Text>

              <Text
                ellipsizeMode="middle"
                numberOfLines={3}
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: 5,
                  fontSize: 10,
                  fontWeight: '300',
                  marginBottom: 8,
                  fontFamily: 'PingFang SC',
                }}>
                {cases[1] ?? 0}
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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadAll}
              tintColor={'rgba(172, 172, 172, 0)'}
            />
          }>
          <View
            style={{
              backgroundColor: '#232228',
            }}>
            <View
              style={[
                styles.container,
                {
                  marginTop: 19,
                  marginLeft: 18,
                  marginRight: 18,
                  marginBottom: 0,
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginBottom: 30,
                }}>
                <Image
                  style={{
                    width: 20.44,
                    height: 18,
                  }}
                  source={require('../../img/small_icon_btn/Notification.png')}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginLeft: 8.17,
                    fontFamily: 'PingFang SC',
                  }}>
                  {news}
                </Text>
              </View>
            </View>
            <View style={{marginBottom: 12}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginLeft: 8.17,
                  fontFamily: 'PingFang SC',
                }}>
                Total News: {totalCount}
              </Text>
            </View>
            {isLoading ? (
              <View>
                <Loading />
              </View>
            ) : market.length > 0 &&
              market[0] != null &&
              market[0] != undefined ? (
              market.map((item, index) => (
                <View key={index}>{renderBook(item)}</View>
              ))
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  MainView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232A3C',
    padding: 10,
    paddingLeft: 20,
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
});

export default Home;
