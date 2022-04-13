import reducer from './reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(reducer, applyMiddleware(thunk));

  return store;
}
