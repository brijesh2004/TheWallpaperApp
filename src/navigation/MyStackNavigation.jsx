import React from 'react'
import HomeScreen from '../screen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowWallpaperScreen from '../screen/ShowWallpaperScreen';

const Stack = createNativeStackNavigator();
const MyStackNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name='HOME_SCREEN' component={HomeScreen}/>
      <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaperScreen}/>
    </Stack.Navigator>
  )
}

export default MyStackNavigation
