import { Alert, DevSettings, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../utils/constData';
import UploadWallpapers from './UploadWallpapers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLogin, seLogin] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      console.log("clicked");
      const url = `${baseUrl}/api/users/${isLogin ? 'login' : 'register'}`;
      const res = await axios.post(url, user);
      console.log(res.data.token);
      await AsyncStorage.setItem("wallhubToken", res.data.token);
      setUser({
        name: '',
        email: '',
        password: ''
      })
      Alert.alert('Success', res.data.message, [{ text: "OK", onPress: () => DevSettings.reload() }]);
      navigation.navigate('HOME_SCREEN');
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', "Check Your Email or password");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Register'}</Text>
      {isLogin ? null : <TextInput
        value={user.name}
        style={styles.inputTextStyles}
        placeholder='Enter your Name'
        placeholderTextColor={'white'}
        onChangeText={(value) => handleChangeText('name', value)}
      />}
      <TextInput
        value={user.email}
        style={styles.inputTextStyles}
        placeholder='Enter your email'
        keyboardType='email-address'
        placeholderTextColor={'white'}
        onChangeText={(value) => handleChangeText('email', value)}
      />
      <TextInput
        value={user.password}
        style={styles.inputTextStyles}
        placeholder='Enter your password'
        secureTextEntry
        placeholderTextColor={'white'}
        onChangeText={(value) => handleChangeText('password', value)}
      />
      <TouchableOpacity style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => seLogin(!isLogin)}>
        <Text style={{ color: 'white', marginTop: 20 }}>{isLogin ? 'New User? Register' : 'Already Registered? Login'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121928",
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputTextStyles: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    padding: 10,
    width: 300,
    color: 'white',
    height: 50,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#74B9FF',
    padding: 10,
    borderRadius: 10,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
})