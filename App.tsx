import React from 'react';
import Root from './src/screens/Root';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import InitlProviderComp from './src/utility/InitlProviderComp';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InitlProviderComp>
            <PaperProvider theme={MD3LightTheme}>
              <StatusBar barStyle={'dark-content'} />
              <Root />
            </PaperProvider>
          </InitlProviderComp>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
