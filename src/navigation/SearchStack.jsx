import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowWallpaperScreen from '../screen/ShowWallpaperScreen';
import SearchScreen from '../screen/SearchScreen';

const Stack = createNativeStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name='SEARCH_SCREEN' component={SearchScreen}/>
      <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaperScreen}/>
    </Stack.Navigator>
  )
}

export default SearchStack