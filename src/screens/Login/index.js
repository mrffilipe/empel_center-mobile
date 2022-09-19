import  React, {useState} from 'react';
import {ScrollView ,View, Text, Image} from "react-native";
import styles from "./styles";
import InputText from "../../components/Form/InputText";
import ButtonSubmit from "../../components/Form/ButtonSubmit";
import Logo from "../../assets/images/logoempel.png";
import {validateEmail} from "../../services/tools";
import {useMainContext} from "../../contexts/mainContext";

export default function Login({navigation}) {

    const {login} = useMainContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalid, setInvalid] = useState(null);

    const signIn = async()=>{
        if(!validateEmail(email))
            return setInvalid({input:email,message:"E-mail invalido!"});
            
        await login(email, password);
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Image
                    style={styles.tinyLogo}
                    source={Logo}/>

                
                <View style={styles.form}>

                    <Text style={styles.text}>Login</Text>

                    <InputText
                        label="E-mail"
                        type="email"
                        value={email}
                        setValue={setEmail}
                        invalid={email === invalid?.input ? invalid?.message : null}
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

                </View>
            </View>
        </ScrollView>
    )
}
