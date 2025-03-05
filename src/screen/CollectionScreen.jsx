import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CategoryCard from '../components/CategoryCard'
import data from '../data/category.json';
import { baseUrl } from '../utils/constData';
import axios from 'axios';

const CollectionScreen = () => {
  const [collection, setCollection] = useState([]);

  const fetchCategory = async () => {
    try {
      const url = `${baseUrl}/api/wallpapers/category`;
      const res = await axios.get(url);
      const data = res.data.categories;
      setCollection(data);
    }
    catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.heading}>Collections</Text>
      <FlatList
        data={collection}
        renderItem={({ item, index }) => <CategoryCard item={item} index={index} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 250
        }}
      />


    </View>
  )
}

export default CollectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121928',
    paddingHorizontal: 20,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700'
  }
})