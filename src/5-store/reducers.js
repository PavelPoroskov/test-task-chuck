import { combineReducers } from 'redux';

import jokeGet from './modules/jokeGet';
import jokeList from './modules/jokeList';

export const rootReducer = combineReducers({
  jokeGet,
  jokeList,
});
