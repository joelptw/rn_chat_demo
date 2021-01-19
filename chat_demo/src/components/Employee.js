import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Employee = ({navigation, employee: {_id, name, email, skills}}) => {
  const continueHandle = () => {
    navigation.navigate('Chat', {employeeId: _id});
  };

  return (
    <View style={styles.container}>
      <Text>{name} </Text>
      <Text>{email}</Text>
      <View>
        {skills.slice(0).map((skill, index) => (
          <Text key={index}>{skill}</Text>
        ))}
      </View>
      <TouchableOpacity onPress={continueHandle} style={styles.button}>
        <Text style={{color: '#FFF', marginTop: 15}}> Chat </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#28aedd',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    borderRadius: 10,
    margin: 15,
    width: 80,
    height: 50,
  },
});

Employee.propTypes = {};

export default Employee;
