import  React, {useState} from 'react';
import {ScrollView ,View, Text, Image} from "react-native";
import styles from "./styles";
import InputText from "../../components/Form/InputText";
import ButtonSubmit from "../../components/Form/ButtonSubmit";
import Logo from "../../assets/images/logoempel.png";
import {validateEmail} from "../../services/tools";
import {useAuthContext} from "../../contexts/authContext";

export default function Login() {

    const {login, setCallback} = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalid, setInvalid] = useState(null);

    const signIn = async()=>{
        if(!validateEmail(email))
            return setInvalid({input:email,message:"E-mail invalido!"});
            
        let res = await login({email,password}).catch(e => e);

        if(res !== 200){
            setCallback({
                action:()=>setCallback(null),
                actionName:"Ok",
                message:res === "Unauthorized"? "E-mail ou senha inválido" : res,
                type:0,
                close: ()=>setCallback(null)
            })
        }
    };

    const checkIsValid = ()=>{
        if(!validateEmail(email) && email !== "")
                return setInvalid({input:email,message:"E-mail invalido!"});
    };


    return (
    
        <View style={styles.container}>

            <Image
                style={styles.tinyLogo}
                source={Logo}/>

            
            <View style={styles.form}>
                <ScrollView>
                    <Text style={styles.text}>Login</Text>

                    <InputText
                        label="E-mail"
                        type="email"
                        value={email}
                        setValue={setEmail}
                        invalid={email === invalid?.input ? invalid?.message : null}
                        onBlur={checkIsValid}
                    />

                    <InputText
                        label="Senha"
                        type="password"
                        value={password}
                        setValue={setPassword}
                        invalid={password === invalid?.input ? invalid?.message : null}
                    />
                    <View style={styles.btn_wrap}>
                        <ButtonSubmit value={"Entrar"} onPress={signIn} styles={styles.btn_submit}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
