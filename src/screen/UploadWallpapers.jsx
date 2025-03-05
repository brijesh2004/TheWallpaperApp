import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { pick, types } from '@react-native-documents/picker';
import axios from 'axios';
import { baseUrl } from '../utils/constData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadWallpapers = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategories, setShowCategories] = useState(false);
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setShowCategories(false);
    };

    const pickWallpapers = async () => {
        try {
            const [pickResult] = await pick({
                type: [types.images]
            });
            console.log("PickResult", pickResult.uri);
            setUri(pickResult.uri);
        }
        catch (error) {
            console.log("Error While Picking the File", error);
        }
    };


    const submitWallpaper = async () => {
        try {
            if(!name){
                Alert.alert("Name Not Found" , 'Please Enter the Wallpaper Name');
                return;
            }
            if(!selectedCategory){
                Alert.alert('Select Category' , 'Please Select Category Before Submitting');
                return;
            }
            if (!uri) {
                Alert.alert('Select Image' , 'Please Select Image');
                return;
            }
    
            const formData = new FormData();
            formData.append("category", selectedCategory);
            formData.append("name", name);
            formData.append("image", {
                uri: uri,
                name: `wallpaper_${Date.now()}.jpg`, // Ensure a unique filename
                type: "image/jpeg", // Adjust based on actual file type
            });
    
            const token = await AsyncStorage.getItem("wallhubToken");
    
            const res = await axios.post(`${baseUrl}/api/wallpapers`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": token,
                },
            });
    
            console.log("Upload Success", res.data);
            selectedCategory(null);
            setName('');
        } catch (error) {
            console.log("Error while submitting wallpaper:", error.response?.data || error.message);
        }
    };

    const categories = ["Nature Wallpaper", "Dark Wallpaper", "Love Wallpaper", "God Wallpaper"];

    return (
        <View style={styles.container}>


            <TextInput style={styles.inputText} value={name} onChangeText={(value) => setName(value)} placeholder='Enter the Wallpaper Name' placeholderTextColor={'white'} />
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowCategories(!showCategories)}
            >
                <Text style={styles.selectButtonText}>
                    {selectedCategory || "Select a Category"}
                </Text>
            </TouchableOpacity>

            {showCategories && (
                <FlatList
                    style={styles.categoryList}
                    data={categories}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.categoryItem}
                            onPress={() => handleSelectCategory(item)}
                        >
                            <Text style={styles.categoryText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Choose Wallpapers button appears immediately after */}
            <Button title="Choose Wallpapers" onPress={pickWallpapers} />

            <Button title='Submit' onPress={submitWallpaper}/>
            <Text style={{ color: 'white' }}>Choosed Wallpaper</Text>
            {uri !== '' && <Image
                source={{ uri: uri }}
                width={'100%'}
                height={400}
            />}
        </View>
    );
};

export default UploadWallpapers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121928',
    },
    selectButton: {
        padding: 10,
        backgroundColor: '#87CEEB',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    selectButtonText: {
        fontSize: 16,
        color: '#121928',
        fontWeight: 'bold',
    },
    categoryList: {
        maxHeight: 200,
        marginBottom: 10,
    },
    categoryItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginVertical: 5,
        borderRadius: 5,
    },
    categoryText: {
        fontSize: 14,
    },
    inputText: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    }
});
