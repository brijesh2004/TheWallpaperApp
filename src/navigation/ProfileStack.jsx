import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screen/ProfileScreen';
import UploadWallpapers from '../screen/UploadWallpapers';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name='PROFILE_SCREEN' component={ProfileScreen}/>
      <Stack.Screen name='UPLOAD_WALLPAPER' component={UploadWallpapers}/>
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})