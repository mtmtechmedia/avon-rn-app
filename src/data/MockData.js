import {Dimensions} from 'react-native';
export const DEFAULT_HEIGHT = Dimensions.get('window').height;
export const DEFAULT_WIDTH = Dimensions.get('window').width;

export const settingRow = [
  {
    title: 'Other Setting',
    data: [
      {
        title: 'Others',
        show: 'Others',
        image: require('../img/setting/lock_green.png'),
        detail: true,
        last: true,
      },
    ],
  },
  {
    title: 'Account Setting',
    data: [
      {
        title: 'Language',
        show: 'en',
        detailList: ['en', 'zhtw', 'zhcn'],
        image: require('../img/setting/global_green.png'),
        detail: true,
      },
      {
        title: 'Privacy',
        show: 'Passward Reset',
        image: require('../img/setting/person_green.png'),
        detail: true,
      },
    ],
  },
];
