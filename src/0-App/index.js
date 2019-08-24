import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore } from '5-store'
import MainScreen from '1-screens/MainScreen'
import './styles.css'

const { store, persistor } = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainScreen />
      </PersistGate>
    </Provider>
  )
}

export default App
