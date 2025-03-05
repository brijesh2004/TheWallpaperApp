import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CollectionScreen from '../screen/CollectionScreen';
import CollectionDetailsScreen from '../screen/CollectionDetailsScreen';
import ShowWallpaperScreen from '../screen/ShowWallpaperScreen';

const Stack = createNativeStackNavigator();
const CollectionStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='COLLECTION_SCREEN' component={CollectionScreen}/>
      <Stack.Screen name='COLLECTION_DETAILS_SCREEN' component={CollectionDetailsScreen}/>
      <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaperScreen}/>
    </Stack.Navigator>
  )
}

export default CollectionStackNavigation
