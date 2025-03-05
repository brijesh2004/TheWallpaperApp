// check the permission do we have permission
// then , we will download the file in the app directory
// copy to media directory

import { useState } from "react";
import ReactNativeBlobUtil from "react-native-blob-util"
import { requestWriteExternalStoragePermission } from "../utils/helper";
import { Alert } from "react-native";

export const useDownloadFile = ()=>{
    let dirs = ReactNativeBlobUtil.fs.dirs;
    const folderPath = dirs.DownloadDir+"/wallpapers";
    const [downloading , setDownloading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const downloadFile = async (url , fileName)=>{
        if(!url){
            reutrn;
        }
        const isAlowed = await requestWriteExternalStoragePermission();
        if(!isAlowed){
            Alert.alert(
                'Permission Required',
                "please grant storage permission to download wallpapers",
            );
            return;
        }

        try{
          setDownloading(true);
          const res = await ReactNativeBlobUtil.config({
            path:`${folderPath}/${fileName}.png`,
            fileCache:true,
            appendExt:"png",
            addAndroidDownloads:{
                notification:true,
                title:'Great! Download Sucess!',
                description:"An image file Downloaded",
                mediaScannable:true
            }
          }).fetch("GET" ,url)
          .progress((received , total)=>{
            const progressPercentage = Math.floor((received/total)*100);
            setPercentage(progressPercentage);
          })
          .then(async (res)=>{
            let result = await ReactNativeBlobUtil.MediaCollection.copyToMediaStore({
                name:fileName,
                parentFolder:"wallpapers",
                mimeTypes:"image/png"
            } , "Download" , res.path())

            Alert.alert("Wallpaper Downloaded" , 
            "Your Wallpaper has been downloaded successfully",
            [
                {
                    text:"Dismiss",
                    style:'cancel',
                }
            ] , {cancelable:true}
        );
          })
        }
        catch(error){
           console.log("error: " , error);
        } finally{
            setDownloading(false);
        }
    }
  return {
    downloading,
    percentage,
    downloadFile,
  }
}