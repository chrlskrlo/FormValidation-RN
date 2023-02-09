import React from 'react'
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address.'),
  password: Yup.string()
    .min(8)
    .required('Please enter your password.')
    .matches(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      'Must contain minimun 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'),
  confirmpassword: Yup.string()
    .min(8, 'Confirn Password must be 8 characters long.')
    .oneOf([Yup.ref('password')], 'Your Passwords do not match.')
    .required('Confirm password is required.'),
  mobile: Yup.string()
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits')
    .matches('^[0-9]+$', 'Must be only digits')
    .required('Please enter your mobile number.')
});

const App = () => {
  return (
    <Formik initialValues={{
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      mobile: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}
    >
      {({ values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
        isValid }) => (


        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputWrappper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Full Name'
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorTxt}>{errors.name}</Text>
              )}
            </View>


            <View style={styles.inputWrappper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Email Address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>


            <View style={styles.inputWrappper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text
                  style={styles.errorTxt}>{errors.password}</Text>
              )}
            </View>


            <View style={styles.inputWrappper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Confirm Password'
                value={values.confirmpassword}
                onChangeText={handleChange('confirmpassword')}
                onBlur={() => setFieldTouched('confirmpassword')}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <Text
                  style={styles.errorTxt}>{errors.confirmpassword}</Text>
              )}


            </View>
            <View style={styles.inputWrappper}>
              <TextInput
                style={styles.inputStyle}
                placeholder='Mobile Number'
                keyboardType='phone-pad'
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                onBlur={() => setFieldTouched('mobile')}
              />
              {touched.mobile && errors.mobile && (
                <Text
                  style={styles.errorTxt}>{errors.mobile}</Text>
              )}


            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={[styles.submitBtn,
              { backgroundColor: isValid ? '#395B64' : '#A5C9CA' }]}
            >
              <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15
  },
  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrappper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
  },
  submitBtn: {
    // backgroundColor: '#395B64',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center'
  },
  submitBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700'
  },


})