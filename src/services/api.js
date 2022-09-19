import AsyncStorage from '@react-native-async-storage/async-storage';
const ApiPath = "http://192.168.2.108:4000/";
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
    method = 'POST',
    formData = false,
})=>{
    
    if(!formData)
        body = JSON.stringify(body);

    try{
        const URL = await fetch(ApiPath+route,{
            method: method,
            body: body,
            headers:headers
        });

        if(URL.status < 400){
            const responseJson = await URL.json();
            var response = await responseJson;
            
            return response;
        }

        return {error: URL.status};
    }catch(err){
        return {error: err.message};
        // "Network request failed"
    }
}



let authProps = {
    email: String,
    password: String,
}
const Auth = async(obj = authProps)=>{
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


const PVFormProps = {
    name:String,
    cpf_cnpj:String,
    phone:String,
    email:String,
}

const PVFormRegister = async(obj = PVFormProps)=>{
    return new Promise(async(resolve)=>{
            let res = await request({
                route:"auth",
                body:obj,
            });
            if(!res.error)
                TOKEN = res.token;

            setTimeout(()=>{
                resolve(res)
            },2000);

       
    })
}

const PropsFile = {
    uri:String,///caminho do arquivo
    type: String,///'image/jpeg'
    name:String,///image.jpg
}

const uploadTest = async(file = PropsFile)=>{
    return new Promise(async(resolve)=>{
        let res = await request({
            route:"newProduct",
            body:file,
            headers:{},
            formData:true
        });
        if(!res.error)
            TOKEN = res.token;

        resolve(false)
    })
}


module.exports = {
    PVFormRegister,
    Auth,
    uploadTest
}