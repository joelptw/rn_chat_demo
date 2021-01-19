/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import firebase, {Firebase} from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ChatScreen from './src/components/Chat';
import LoginScreen from './src/components/Login';
import EmployeeListScreen from './src/components/EmployeesList';
import EmployeeScreen from './src/components/Employee';
import Chat from './src/components/ChatComponent';

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Employee"
        component={EmployeeListScreen}
        options={{title: 'Empleados'}}
      />
      <Stack.Screen name="EmployeList" component={EmployeeListScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{user: 'me'}}
      />
    </Stack.Navigator>
  );
}

/*const RootStack2 = createStackNavigator({
  Login: LoginScreen,
  Chat: ChatScreen,
  ChatComponent: Chat,
  Emplyee: EmployeeScreen,
  EmployeeList: EmployeeListScreen,
});

let Navigation = createNavigatorFactory(RootStack2);
*/
///const styles = StyleSheet.create({});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  notificationListener() {
    firebase.notifications().onNotification(notification => {
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('firstChannel')
        .android.setPriority(firebase.notifications.Android.Priority.High);
      firebase
        .notifications()
        .displayNotification(localNotification)
        .then(() => console.log('notificacion enviada'))
        .catch(error => console.log(error));
    });
  }

  createChannel() {
    const channel = new firebase.notifications.Android.Channel(
      'firstChannel', // channelId
      'First Channel', // channel name
      firebase.notifications.Android.Importance.High, // channel importance
    ).setDescription('Used for getting notification'); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // We've the permission
      this.notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
        });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings',
        );
      }
    }
  };

  componentDidMount() {
    this.createChannel();
    this.notificationListener();
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{gestureEnabled: false}}>
            <Stack.Screen
              name="Employee"
              component={EmployeeScreen}
              options={{title: 'Empleados'}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Login'}}
            />
            <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              initialParams={{user: 'me'}}
              r
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
