import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from "../data/images.json";
import ImageCard from '../components/ImageCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../utils/constData';

const CollectionDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [categoryData , setCategoryData] = useState([]);
    const item = route.params.item;
    const handleBackPress=()=>{
     navigation.goBack();
    } 

   const fetchCategoryData =async()=>{
      const token = await AsyncStorage.getItem("wallhubToken");
      const res = await axios.get(`${baseUrl}/api/wallpapers?category=${item}`
        ,
        {
          headers:{
            'x-access-token':token,
          }
        }
      );
      console.log("red->" , res.data);
      setCategoryData(res.data.wallpapers);
   }

   useEffect(()=>{
       fetchCategoryData();
   } , []);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.backIconContainer}
      onPress={handleBackPress}>
       <Ionicons name={"chevron-back"} color={'white'} size={30}/>
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.subheader}>Unlimited listed wallpapers from {item.name} collection</Text>
      </View>
      <FlatList
        data={categoryData}
        renderItem={({item})=> <ImageCard item={item}/>}
        keyExtractor={(item)=>item._id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom:200,
        }}
      />
    </View>
  )
}

export default CollectionDetailsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#121928',
        padding:20,
    },
    backIconContainer:{
        height:40,
        width:40,
        backgroundColor:'#414753',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    header:{
        color:'white',
        fontSize:22,
        fontWeight:'600',
        marginVertical:10,
    },
    subheader:{
        color:'#cccc',
        fontSize:14,
    }
})