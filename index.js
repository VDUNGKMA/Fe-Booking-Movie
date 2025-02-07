// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

/** 
 * @format
 */
import 'react-native-gesture-handler'; // Import gesture handler at the top for older versions of React Native

import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import {
    LogBox
} from 'react-native';

if (__DEV__) {

    
} else {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
    LogBox.ignoreAllLogs(true);
}
// Wrap App in GestureHandlerRootView
const RootApp = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
    </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootApp);
