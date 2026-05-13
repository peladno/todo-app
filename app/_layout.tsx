import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

const persistor = persistStore(store);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Slot />
      </PersistGate>
    </Provider>
  );
}
