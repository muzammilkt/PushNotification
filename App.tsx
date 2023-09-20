import React, { useEffect } from 'react';

import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigations from './src/routes';
// registerTranslation('en', en)

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigations />
    </GestureHandlerRootView>
  )
}
