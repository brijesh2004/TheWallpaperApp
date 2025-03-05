import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../data/images.json';
import ImageCard from '../components/ImageCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../utils/constData';

const LikeComponent = () => {
    const navigation = useNavigation();
    const [wallpapers , setWallpapers] = useState([]);

    const handleNavigate = ()=>{
        navigation.navigate("HOME_STACK");
    }
  //  const getWallpapersFromAsyncStorage = async()=>{
  //    let images = await AsyncStorage.getItem("images");
  //    images = images?JSON.parse(images):[];
  //    setWallpapers(images);
  //  }

   const allLikesWallpapers = async()=>{
     try{
      const token = await AsyncStorage.getItem('wallhubToken');
     const res = await axios.get(`${baseUrl}/api/wallpapers/likedwallpapers`,
      {
        headers:{
           'x-access-token':token
        }
      }
     )
     console.log("D->" , res.data.likeWallpaper);
     setWallpapers(res.data.likeWallpaper);
     }
     catch(error){
      Alert.alert("Error" , "Error while fetching the likes data");
     }
   }

   useEffect(()=>{
    allLikesWallpapers();
   },[]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={handleNavigate}>
         <Ionicons name={'chevron-back'} color={'white'} size={30}/>
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>Favorites</Text>
        <Text style={styles.subHeader}>You've marked all of these as favorites</Text>
      </View>

      <FlatList
        data={wallpapers}
        renderItem={({item})=><ImageCard item={item}/>}
        keyExtractor={(item)=>item._id.toString()}
        numColumns={2}
        contentContainerStyle={{
            paddingBottom:150
        }}
      />
    </View>
  )
}

const LikeScreen = ()=>{
  const isFocused = useIsFocused();
  return isFocused?<LikeComponent/>:null;
}

export default LikeScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor:'#121928',
        paddingHorizontal:20,
    },
    backIconContainer:{
        backgroundColor:'#414753',
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginVertical:10,
    },
    header:{
        color:'white',
        fontSize:30,
        fontWeight:'600',
    },
    subHeader:{
        color:'white',
    }
})