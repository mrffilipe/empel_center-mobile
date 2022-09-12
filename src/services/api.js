import AsyncStorage from '@react-native-async-storage/async-storage';
const ApiPath = "http://localhost:5000/api/";
var TOKEN = "";

(async()=>{//pegar token armazendo local
    try{
        let t = await AsyncStorage.getItem("@token");
        if(t)
            TOKEN = t;
    }catch(e){}
})()

const request = async ({ //fazer requisição fetch
    route = String, 
    body = Object,
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        "authorization":"Bearer "+TOKEN
    },
    method = 'POST'
})=>{
    headers = headers
    body = JSON.stringify(body);

    try{
        const URL = await fetch(ApiPath+route,{
            method: method,
            body: body,
            headers:headers
        });
        const responseJson = await URL.json();
        var response = await responseJson;
       
        return response;

    }catch(err){
        return {error: "Dessa vez foram os servidores. tente mais tarde"};
    }
}



let authProps = {
    email: String,
    password: String,
}
export const Auth = async(obj = authProps)=>{
    return new Promise(async(resolve)=>{
        let res = await request({
            route:"auth",
            body:obj,
        });
        if(!res.error)
            TOKEN = res.token;
            
        resolve(res);
    })
}