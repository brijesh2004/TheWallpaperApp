import { ActivityIndicator, Alert, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDownloadFile } from '../hooks/useDownloadFile';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';

const ShowWallpaperScreen = () => {
    const route = useRoute();
    const { downloading, percentage, downloadFile } = useDownloadFile();

    const item = route.params.item;
    const navigate = useNavigation();
    const handleBackPress = () => {
        navigate.goBack();
    }

    const handleDownload = (item) => {
        downloadFile(item.image, item.name)
    }
    const handleShareImage = () => {
        try {
            ReactNativeBlobUtil.fetch("GET", item.image).then((res) => {
                let status = res.info().status;
                if (status === 200) {
                    let base64Str = res.base64();
                    let options = {
                        url: `data:image/jpeg;base64,${base64Str}`,
                    };
                    Share.open(options)
                        .then((r) => {
                            console.log(r);
                        })
                        .catch((e) => {
                            e && console.log(e);
                        });
                }
            });
        }
        catch (error) {

        }
    }
    // const handleLike = async (item) => {
    //     let likedWallpapers = await AsyncStorage.getItem("images");
    //     likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
    //     let isExist = likedWallpapers.findIndex((image) => image.id === item.id);
    //     if (isExist < 0) {
    //         likedWallpapers = [item, ...likedWallpapers];
    //         await AsyncStorage.setItem("images", JSON.stringify(likedWallpapers));
    //         Alert.alert("Added To Favorites", "Your Wallpaper has been successfully added to your favorites",
    //             [
    //                 {
    //                     text: 'Dismiss',
    //                     style: 'cancel',
    //                 },
    //                 {
    //                     text: 'View Favorites',
    //                     onPress: () => {
    //                         navigate.navigate('LIKE_STACK')
    //                     }
    //                 }
    //             ]
    //         )
    //     } else {
    //         let data = likedWallpapers.filter((elem) => elem.id !== item.id);
    //         await AsyncStorage.setItem("images", JSON.stringify(data));
    //         Alert.alert("Remove from Favorite", "Removed");
    //     }
    // }
    return (
        <>
            <StatusBar hidden />
            <ImageBackground
                style={styles.container}
                source={{ uri: item.image }}
            >


                <TouchableOpacity style={styles.backIconContainer}
                    onPress={handleBackPress}>
                    <Ionicons name={'chevron-back'} color={'white'} size={30} />
                </TouchableOpacity>

                <View style={styles.iconContainer}>

                    {
                        item.isLike ?
                            <TouchableOpacity onPress={() => {Alert.alert("Not Allowed" , "Like from here is Not Allowed")}}>
                                <AntDesign name={'heart'} size={25} color={"red"} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {Alert.alert("Not Allowed" , "Like from here is Not Allowed")}}>
                                <AntDesign name={'hearto'} size={25} color={"white"} />
                            </TouchableOpacity>
                    }

                    <Text style={styles.likeText}>{item.likesCount}</Text>
                    <TouchableOpacity onPress={() => { handleDownload(item) }}>
                        <Feather name={'download'} size={25} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleShareImage() }}>
                        <FontAwesome name={'share'} size={25} color={"white"} />
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
                    <ActivityIndicator color={"white"} size={"50"} />
                    <Text
                        style={
                            { color: 'white' }
                        }>Progress Percentage: {percentage} %</Text>
                </View> : null}
            </ImageBackground>
        </>
    )
}

export default ShowWallpaperScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121928',
    },
    backIconContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#414753',
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 150,
        right: 20,
        height: 150,
        justifyContent: 'space-between'
    },
    likeText:{
        color:'white',
        textAlign:'center'
    }
})