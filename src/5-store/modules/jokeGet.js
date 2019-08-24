import { takeLatest, put, call, getContext } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import {add as addJokeToList} from './jokeList'

// Actions
const GET = 'test-task-chuck/jokeGet/GET';
const GET_SUCCESS = 'test-task-chuck/jokeGet/GET_SUCCESS';
const GET_FAILURE = 'test-task-chuck/jokeGet/GET_FAILURE';

const initState = {
  loading: false,
  error: null,
}

// Reducer
export default function reducer( state=initState, action ) {
  switch (action.type) {
    case GET:
      return {
        loading: true,
        error: null,
      };
    case GET_SUCCESS:
      return initState;
    case GET_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const getJoke = () => ({ type: GET });
const getJokeSuccess = () => ({ type: GET_SUCCESS });
const getJokeFailure = (error) => ({ type: GET_FAILURE, payload: error });

// Side Effects
function * sagaWorker () {
  
  try {
    const apiChuck = yield getContext('apiChuck');
    const joke = yield call( apiChuck.getJoke )
    
    yield put(batchActions([
      getJokeSuccess(),
      addJokeToList(joke),
    ]))

  } catch (error) {

    yield put(getJokeFailure(error))    
  }
}

export function * sagaJokeGet () {
  yield takeLatest( GET, sagaWorker )
}
