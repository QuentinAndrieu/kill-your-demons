import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './shared/utils/useCachedResources';
import Main from './Main/Main';
import * as firebase from 'firebase';
import { FirebaseConfig } from './shared/constants/FirebaseConfig';

import 'firebase/firestore';
import { ThemeProvider } from '@react-navigation/native';

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

export default function App() {
  // Set the configuration for your app
  // TODO: Replace with your project's config object

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <Main colorScheme={'light'} />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
