import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loading....</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#121928',
    },
    header:{
        color:'white',
        fontSize:30,
    }
})