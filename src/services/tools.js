import * as RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import VMasker from 'vanilla-masker';

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


export const formatDate = (date = new Date(),dateTime = false, full = false)=>{
    date = new Date(date);
    let year = date.getFullYear().toString();
    let formatedDate = `${leftPad(date.getDate(),2)}/${leftPad(date.getMonth() + 1,2)}/${ full? year :year[2]+year[3]}` 
    let time = `${date.getHours()}:${leftPad(date.getMinutes(),2)}`;

    if(dateTime)
        return formatedDate+" "+time

    return formatedDate
}

const verifyFildsClientProps = {
    setInvalid:Function, 
    name:String, 
    cpfCnpj:String,
    phoneNumber:String,
    email:String,
}

export const verifyFildsClient = ({
    setInvalid, 
    name, 
    cpfCnpj,
    phoneNumber,
    email,
} = verifyFildsClientProps)=>{

    let cpfCnpjUnmask = cpfCnpj.replace(/\./g,"").replace(/\//g,"").replace(/\-/g,""); 
    if(name && name.split(" ").length < 2 || name && !name.split(" ")[1]){
        setInvalid({input:name, message:"Inserir nome e sobrenome!"});
        return false;
    }

    if(cpfCnpj && cpfCnpjUnmask.length !== 11 && cpfCnpjUnmask.length !== 14){
        setInvalid({input:cpfCnpj, message:"CPF ou CNPJ invalido!"});
        return false;
    }

    if(phoneNumber && phoneNumber.length < 15) {
        setInvalid({input:phoneNumber, message:"Telefone invalido!"});
        return false;
    }

    if(email && !validateEmail(email)){
        setInvalid({input:email,message:"E-mail invalido!"});
        return false;
    }

    return true;
}

export const limitText = (value = "",limit = 20) =>{
    if(value.length > limit)
        return value.substring(0,limit - 3)+"...";

    return value;  
}

export const toNumber = (val = "") =>{
    val = val.toString();
    let res = parseFloat(val.replace(/\./g,"").replace(/,/g,"."));
    
    return res ? res : 0;
}

export const toMoney = (val,fixed = 2, defoultResponse = "")=>{
    if(typeof val === "number"){
        return VMasker.toMoney(val.toFixed(fixed));
    }else{
        return defoultResponse;
    }
} 

export const toBrNumberFormat = (val,fixed = 0, defoultResponse = "")=>{
    if(typeof val === "number"){
        return fixed? val.toFixed(fixed).replace(".",',') : val.toString().replace(".",',');
    }else{
        return defoultResponse;
    }
} 

export const splitName = (fullName)=>{
    var firstName =  fullName.split(" ")[0];
    var lastName = fullName.split(firstName)[1];

    if(lastName[0] === " "){
        lastName = lastName.replace(" ","");
    }

    return {firstName, lastName};
}

export const renameFile = ({file, newName})=> {
    return {
        name: encodeURIComponent(newName),
        filename: encodeURIComponent(newName),
        uri: file.uri,
        type: file.type
    }
}

export const updateProgress = ({bites,fileName, setProgress})=>{

    if(!bites.total)
        return;
    let percentage = (bites.loaded / bites.total) * 100;

    if(typeof percentage === "number"){
        setProgress(
            {
                name:fileName,
                progress:parseInt(percentage),
            }
        );
    }
}