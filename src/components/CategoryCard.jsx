import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CategoryCard = ({item , index}) => {
    const navigation = useNavigation();
    console.log("Item " , item);
    console.log("Index " , index);
    const handleNavigate = (item)=>{
        navigation.navigate('COLLECTION_DETAILS_SCREEN' , {item});
    }
  return (
    // <TouchableOpacity style={styles.container} onPress={()=>handleNavigate(item)}>
    //   {/* <Image source={{uri:item.image}} style={styles.coverImage} resizeMode="cover"/>
    //   <View style={styles.overlay}></View>
    //   <View style={styles.textContainer}>
    //   <Text style={styles.heading}>{item.name}</Text>
    //   </View> */}
    // </TouchableOpacity>
    <TouchableOpacity style={styles.container} onPress={()=>handleNavigate(item)}>
        <Text style={styles.headerText}>{item}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
        padding:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        backgroundColor:'#8395A7'
    },
    headerText:{
      color:'white',
      fontSize:30,
    }
})