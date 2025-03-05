import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowWallpaperScreen from '../screen/ShowWallpaperScreen';
import SearchScreen from '../screen/SearchScreen';
import LikeScreen from '../screen/LikeScreen';

const Stack = createNativeStackNavigator();
const LikeStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name='LIKE_SCREEN' component={LikeScreen}/>
      <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaperScreen}/>
    </Stack.Navigator>
  )
}

export default LikeStack