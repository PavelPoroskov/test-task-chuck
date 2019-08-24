import { all } from 'redux-saga/effects'

import { sagaJokeGet }  from './modules/jokeGet';


export function * rootSaga () {
  yield all([
    sagaJokeGet(),
  ])
}
