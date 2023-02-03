import axios from 'axios';
import FileSystem from "react-native-fs";

var LogoutApi = ()=>{};

const URL = "https://api.empel.com.br/";

const setAccessToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.headers.common['Content-Type'] = `application/json;charset=utf-8`;
};

const setLogoutApi = (logout)=>{
    LogoutApi = logout;
}

const handleError = (res = Object)=>{
    console.log(res);

    if(!res.response || res.response.data === undefined)
        return {error:"Verifique sua conexão e tente novamete"};

    if(res.response.status === 404)
        return {error:"Endereço não encontrado"};

    if(res.response.status === 500)
        return {error:"Erro interno do servidor"};
        
    if(res.response.status === 401){
        LogoutApi();
        return {error:res.response.status};
    }
    
    if(res.response?.data.title)
        return {error:res.response.data.title};

    return {error:res.message};
    
}



const get = async (route = "")=>{
    try{
        let res = await axios(URL+route);
        return res.data;
    }catch(err){
        return handleError(err);
    }
}

const deletar = async (route = "")=>{
    try{
        let res = await axios.delete(URL+route);
        return res.data;
    }catch(err){
        return handleError(err);
    }
}

const post = async (
    route = "",
    body = {},
    config = {}
) => {
    try{
        let res = await axios.post(URL+route,body,config);
        return res;
    }catch(err){
        return handleError(err);
    }
}

const put = async (
    route = "",
    body = {},
    config = {}
) => {
    try{
        let res = await axios.put(URL+route,body,config);
        
        return res.status;
    }catch(err){
        return handleError(err);
    }
}


const downloadPDF = async({
    id,
    fileUri,
    progress,
    begin
})=>{
    return new Promise((resolve, reject) => {
        try{    
            FileSystem.downloadFile({
                fromUrl: 'http://192.168.2.148:4000/download_proposta?id='+id,
                toFile: fileUri,
                progress,
                headers:{}
                // progressInterval:1
            }).promise.then((r) => {
                resolve(true);
            }).catch(error => {
                reject({error:JSON.stringify(error)});
            })

        }catch(err) {
            reject(handleError(err))
        }
    });
}



export default {
    setAccessToken,
    get,
    post,
    put,
    deletar,
    downloadPDF,
    setLogoutApi
}