import * as RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export const validateEmail = (email) => { //validar email
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

export const leftPad = (value, totalWidth, paddingChar) => {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};

const fileProps = {
    uri:String
}

export const storageFile = (file = fileProps)=>{
    return new Promise(async(resolve)=>{
        const dirHome = Platform.select({
            ios: `${RNFS.DocumentDirectoryPath}`,
            android: `${RNFS.DocumentDirectoryPath}`
        });
        const dirPicutures = `${dirHome}/pictures`;

        let fileName = `${new Date().getTime()}.jpg`
        const imagePath = `${dirPicutures}/${fileName}`;
        
        try{
            RNFS.mkdir(dirPicutures);
            if(Platform.OS === 'ios') {
                RNFS.copyAssetsFileIOS(file.uri, imagePath, 0, 0)
                    .then(res => {
                        resolve({uri:"file://"+imagePath,fileName});
                    })
                    .catch(err => {
                        resolve(false);
                    });
            } else if(Platform.OS === 'android') {
                RNFS.copyFile(file.uri, imagePath)
                    .then(res => {
                        resolve({uri:"file://"+imagePath,fileName});
                    })
                    .catch(err => {
                        resolve(false);
                    });
            }
        }catch(err){
            resolve(false);
        }   
    })
}


export const deleteFile = (file = fileProps)=>{
    return new Promise(async(resolve)=>{
        try{
            let exists = await RNFS.exists(file.uri);
            if(exists){
                // exists call delete
                await RNFS.unlink(file.uri);
                resolve(true);
            }else{
                resolve(true);
            }
        }catch(e){
            resolve(false);
        }
    })
}