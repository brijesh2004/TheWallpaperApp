import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ImageCard from '../components/ImageCard'
import data from '../data/images.json';
import axios from 'axios';
import { baseUrl } from '../utils/constData';
import AsyncStorage from '@react-native-async-storage/async-storage';
// console.log(data);

const HomeScreen = () => {

  const [wallpaper, setWallpaper] = useState([]);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('wallhubToken');
      const res = await axios.get(`${baseUrl}/api/wallpapers`,
        {
          headers: {
            'x-access-token': token
          }
        }
      );
      console.log("res", res.data.wallpapers);
      const data = res.data.wallpapers;
      setWallpaper(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleLike = async (item) => {
    const updatedWallpapers = wallpaper.map((elem) =>
      elem._id === item._id ? { ...elem, likesCount: elem.isLike ? elem.likesCount - 1 : elem.likesCount + 1, isLike: !elem.isLike } : elem
    );
    setWallpaper(updatedWallpapers);
    // call the Api to update on DataBase
    try {
      const token = await AsyncStorage.getItem("wallhubToken");
      // console.log("Token", token);
      // console.log("Token", token);
      const res = await axios.post(`${baseUrl}/api/wallpapers/likewallpaper/${item._id}`,
        {},
        {
          headers: {
            'x-access-token': token,
          }
        }
      );

      //console.log("Res->", res);
      if (res.status !== 200) {
        new Error("No Like");
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert("SomeThing Went Wrong", "Your like is Not Updated on Database");
    }

  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <FlatList data={wallpaper}
        renderItem={({ item }) => <ImageCard item={item} handleLike={handleLike} />}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
      />
      {/* <View style={styles.imageView}>
        <ImageCard/>
        <ImageCard/>
      </View> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121928',
    paddingHorizontal: 20,
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  }
})