import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {getEmployees} from '../actions/actions/employees';
import Employee from './Employee';
import {connect} from 'react-redux';

const EmployeesList = ({
  navigation,
  getEmployees,
  employees: {employees, loading},
}) => {
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <View>
      {employees.length > 0 ? (
        employees.map(index => (
          <Employee
            navigation={navigation}
            key={index._id}
            employee={index}></Employee>
        ))
      ) : (
        <Text> No hay empleados </Text>
      )}
    </View>
  );
};

EmployeesList.propTypes = {
  employees: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  employees: state.employees,
});

export default connect(mapStateToProps, {getEmployees})(EmployeesList);
