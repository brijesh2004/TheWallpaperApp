import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("UPLOAD_WALLPAPER");
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goToWallpaper} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Upload Your Wallpaper</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#121928',
        alignItems:'center'
    },
    goToWallpaper:{
        color:'white',
        fontSize:16,
        marginTop:20,
        backgroundColor:'blue',
        borderRadius:10,
        padding:10,
    },
    buttonText:{
        color:'white',
        fontSize:16,
        padding:5,
    }
})