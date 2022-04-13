///---------------- action --------------------///
const FETCH_LISTS = 'fetch_lists';
const SAVE_TO_STORAGE = 'save_to_storage';
const DARK_SET = 'dark_set';

import * as StorageHelper from '../helpers/StorageHelper';

export function fetchLists() {
  return async dispatch => {
    let listsGet = await StorageHelper.getMySetting('all_lists');
    let listsGetParse = JSON.parse(listsGet);
    dispatch({
      type: FETCH_LISTS,
      payload: listsGetParse,
    });
  };
}

export function saveToStorage(saveKey, saveValue) {
  return async dispatch => {
    await StorageHelper.setMySetting(saveKey, JSON.stringify(saveValue));
    dispatch({
      type: SAVE_TO_STORAGE,
    });
  };
}

export function fetchDarkModeSetting() {
  return async dispatch => {
    let darkGet = await StorageHelper.getMySetting('app_isDarkMode');
    let isDarkGetParse = JSON.parse(darkGet);
    dispatch({
      type: DARK_SET,
      payload: isDarkGetParse,
    });
  };
}

///---------------- reducer --------------------///

const initialState = {
  fetchLists: [],
  isDarkMode: true,
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        fetchLists: action.payload,
      };
    case SAVE_TO_STORAGE:
      return state;
    case DARK_SET:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
}
