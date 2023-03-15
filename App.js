import React, {useEffect} from 'react';
import {UIManager, Platform} from 'react-native';
import {store, persistor} from './src/config/reduxConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import RouteState from './src/config/RouteState';

export default App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RouteState />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
