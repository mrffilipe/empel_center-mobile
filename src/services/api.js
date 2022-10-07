import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const URL = "https://empelapi.azurewebsites.net/";
var TOKEN = "";

(async()=>{//pegar token armazendo local
    try{
        let t = AsyncStorage.getItem("@token");
        if(t)
            TOKEN = t;
    }catch(e){}
})()

const handleError = (res = Object)=>{
    if(!res.response || res.response.data === undefined)
        return {error:"Dessa vez foram os servidores. tente mais tarde"};

    if(res.response.status === 404)
        return {error:"Servidor não encontrado"};
    
    if(res.response.status === 500)
        return {error:"Erro interno no servidor"};

        return res.response.data;
}


const get = async (route = "")=>{
    try{
        let res = await axios(URL+route);
        
        return res.response.data;
    }catch(err){
        return handleError(err);
    }
}

const deletar = async (route = "")=>{
    try{
        let res = await axios(URL+route);

        return res.response.data;
    }catch(err){
        return handleError(err);
    }
}

const post = async ({
    route = "",
    body = {},
}) => {
    try{
        let res = await axios.post(URL+route,body);

        return res.data;
    }catch(err){
        return handleError(err);
    }
}

const patch = async ({
    route = "",
    body = {},
}) => {
    try{
        let res = await axios.patch(URL+route,body);
        
        return res.response.data;
    }catch(err){
        return handleError(err);
    }
}




export default {
    get,
    post,
    patch,
    deletar,
}