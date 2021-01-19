import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import firebase, {messaging} from 'react-native-firebase';
import {sendNotification} from '../actions/actions/notification';
import {connect} from 'react-redux';

const Login = ({navigation, sendNotification}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    const token = await firebase.messaging().getToken();

    console.log(token);
    sendNotification(title, body, '5f4868845779dadbe9c222a5');
  };

  const continueHanlde = () => {
    AsyncStorage.setItem('id', '5f4868845779dadbe9c222a5');
    navigation.navigate('EmployeeList', {name: name});
  };

  const testNotification = async () => {
    const token = firebase.messaging().getToken();

    console.log(token);

    /*
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
    */
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <View style={{marginHorizontal: 32}}>
        <View></View>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={title}
          onChangeText={title => setTitle(title)}></TextInput>
        <Text style={styles.header}>Mensaje</Text>
        <TextInput
          value={body}
          style={styles.input}
          placeholder="Texto"
          onChangeText={val => setBody(val)}></TextInput>
        <View style={{alignItems: 'flex-end', marginTop: 100}}>
          <TouchableOpacity
            style={styles.continue}
            onPress={onSubmit}></TouchableOpacity>
        </View>

        <View style={{alignItems: 'flex-end', marginTop: 64}}>
          <TouchableOpacity
            style={styles.continue}
            onPress={continueHanlde}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F3',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#514E5A',
  },
  input: {
    borderRadius: 30,
    borderColor: '#BAB7C3',
    height: 50,
    marginTop: 32,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    fontWeight: '600',
    color: '#514E5A',
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: '#9075E3',
  },
});

Login.propTypes = {
  sendNotification: PropTypes.func.isRequired,
};

export default connect(null, {sendNotification})(Login);
