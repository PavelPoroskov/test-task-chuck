import { applyMiddleware, createStore } from 'redux'
import {enableBatching} from 'redux-batched-actions'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {apiChuck} from '8-remote/apiChuck';

import { rootReducer } from './reducers'
import { rootSaga } from './sagas'

export function configureStore() {

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['jokeList']
  }  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  const sagaMiddleware = createSagaMiddleware({
    context: {
      apiChuck
    }
  })

  const store = createStore(
    enableBatching(persistedReducer),
    applyMiddleware(sagaMiddleware)
  );
  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
