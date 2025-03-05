import { Alert, Linking, PermissionsAndroid, Platform } from "react-native"

export const requestWriteExternalStoragePermission = async()=>{
    if(Number(Platform.Version)<33){
        return true;
    }
  // ask permission 
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title:"Storage Permission",
            message:"This app needs access to your storage to save wallpapers",
        },
    );

    if(granted===PermissionsAndroid.RESULTS.DENIED){
       Alert.alert(
        'Permission Required',
         'This App needs access to your storage to download wallpapers',
         [
            {text:'Cancel', style:'cancle'},
            {
                text:'Ask Permission Again',
                onPress:()=>requestWriteExternalStoragePermission(),
            }
         ]
        
        );
    }

    if(granted===PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
        Alert.alert(
            'Permission Required',
            'Please enable storage permission in your device setting to download the wallpapers',
            [
                {
                    text:'Cancel',
                    style:'cancel'
                },
                {
                    text:'Open Setting',
                    onPress:()=>Linking.openSettings(),
                }
            ]
        );
    }

    if(granted===PermissionsAndroid.RESULTS.GRANTED){
        console.log("write storage permission granted");
        return true;
    }
};