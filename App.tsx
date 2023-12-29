import React from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
