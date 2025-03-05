import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDownloadFile } from '../hooks/useDownloadFile';
//const imageURL = 'https://th.bing.com/th/id/R.985279130a230d6a77ca7b1f4a48ef6f?rik=KXIdZixtwqM94A&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2016%2f02%2fmobile-wallpaper-32.jpg&ehk=sSe3TFRVvW6yp%2fSXAnEpPXhPqeviK%2bfrjHx9R2xLqmQ%3d&risl=&pid=ImgRaw&r=0';

const ImageCard = ({ item , handleLike}) => {
  const navigation = useNavigation();
  const { downloadFile, percentage, downloading } = useDownloadFile();
  const handleNavigate = (item) => {
    navigation.navigate("SHOW_WALLPAPER_SCREEN", { item });
    // navigation.navigate('HOME_STACK', { screen: 'SHOW_WALLPAPER_SCREEN', params: { item } });
  }

  const handleDownloadFile = async (item) => {
    await downloadFile(item.image, item.name);
  }
  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigate(item)
      }}
      style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.coverImage} resizeMode="cover"
      />
      <View style={styles.iconContainer}>
        {
          item.isLike ?
            <TouchableOpacity onPress={() => { handleLike(item) }}>
              <AntDesign name={'heart'} size={30} color={"red"} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { handleLike(item) }}>
              <AntDesign name={'hearto'} size={30} color={"white"} />
            </TouchableOpacity>
        }


        <Text style={{ color: 'white' }}>{item.likesCount}</Text>
        <TouchableOpacity onPress={() => { handleDownloadFile(item) }}>
          <Feather name={'download'} size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      {downloading ? <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.5)"
        }}>
        <ActivityIndicator color={"white"} size={"large"} />
        <Text
          style={
            { color: 'white' }
          }>Progress Percentage: {percentage} %</Text>
      </View> : null}
    </TouchableOpacity>
  )
}

export default ImageCard

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '50%',
    backgroundColor: 'pink',
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  coverImage: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    height: 100,
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  }
})
