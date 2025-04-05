/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import RootStack from './src/navigation/RootStack';
import Toast from 'react-native-toast-message';
import {useNetInfo} from '@react-native-community/netinfo';

function App() {
  const netInfo = useNetInfo();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (netInfo.isConnected === false && !hasShownToast.current) {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Please check your connection.',
        position: 'bottom',
        visibilityTime: 3000,
      });
      hasShownToast.current = true;
    }

    if (netInfo.isConnected === true) {
      hasShownToast.current = false;
    }
  }, [netInfo.isConnected]);
  return (
    <>
      <RootStack />
      <Toast />
    </>
  );
}

export default App;
