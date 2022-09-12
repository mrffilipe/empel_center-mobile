import styles from "./styles";
import Select from "../../../components/Form/Select";
import React, {useState} from "react";
import {View, Text, Pressable, Linking} from "react-native";
import AllClear from "../../../components/AllClear";
import VMasker from "vanilla-masker";
const props = {
    data:[{
        id:Number,
        name:String,
        email:String,
        phone:Number,
        permission:String,
    }],
    permission:[],
    setData:Function
}
export default function Table({data, permission, setData} = props) {
    const [userSelected, setUserSelected] = useState(null);
    const [isOpenConfirm, setIsOpenConfirm] = useState(null);
    const changePermision = (val,key)=>{
        if(!data)
            return;
        let arr = [...data];
        arr[key].permission = val;
        setData(arr);
    } 

    const Link = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button style={[styles.h5,styles.h5_content,styles.right]} title={children} onPress={handlePress} />;
      };

    const desableAcess = (name,id)=>{
        const confirmed = ()=>{
            //desabilitar conta
        }

        setIsOpenConfirm({message:`Desativar acesso do ${name}?`,next:confirmed})
    }

    const activateAcess = (name,id)=>{
        const confirmed = ()=>{
            //abilitar conta
        }

        setIsOpenConfirm({message:`Ativar acesso do ${name}?`,next:confirmed})
    }

    const link = ({url})=> {
        Linking.canOpenURL(url).then((supported) => {
            console.log(supported)
          return Linking.openURL(url);
        });
    }

    return (
        <View style={[styles.container]}>
            {/* <Text style={styles.title}>{title}</Text> */}

            <View style={[styles.list]}>
                {data.length ?
                    data.map((val,key)=>{
                        return(
                            <View
                            key={key} 
                            style={[styles.list_wrap,styles.info]}>

                                <View style={val.active?[styles.info]:[styles.info,styles.info_desabled]}>
                                    <View style={styles.table_wrap}>
                                        {/* GRUPO A */}

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Nome: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val.name}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Email: </Text>
                                            <Pressable onPress={()=>link({url:"mailto:"+val.email})}>
                                                <Text style={[styles.h5,styles.h5_content,styles.right]}>{val.email}</Text>
                                            </Pressable>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Telefone: </Text>
                                            <Pressable onPress={()=>link({url:"tel:+55"+val.phone})}>
                                                <Text style={[styles.h5,styles.h5_content,styles.right]}>{VMasker.toPattern(val.phone, "(99) 9999-9999")}</Text>
                                            </Pressable>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>PERMIÇÃO: </Text>

                                            {val.active ?
                                                <View style={[styles.select_wrap]}>
                                                    <Select
                                                        value={val.permission}
                                                        setValue={changePermision}
                                                        values={permission}
                                                        labelTop={false}
                                                        name={key}
                                                        style2={styles.select}
                                                    />  
                                                </View>
                                                :
                                                <Text style={[styles.h5,styles.h5_content,styles.right]}>{"Nenhuma"}</Text>
                                            }
                                        </View>

                                        <View style={styles.text_wrap}>
                                            {val.active
                                                ? 
                                                <Pressable style={styles.btn} onPress={()=>desableAcess(val.name,val.id)}>
                                                    <Text style={styles.btn_text}>{"Desativar Acesso"}</Text>
                                                </Pressable>
                                                : 
                                                <Pressable style={[styles.btn,styles.btn_activete]} onPress={()=>activateAcess(val.name,val.id)}>
                                                    <Text style={styles.btn_text}>{"Ativar acesso"}</Text>
                                                </Pressable>
                                            }
                                        </View>

                                    </View>

                                </View>
                            </View>
                        )
                    })
                    :<AllClear msg={"Sem informações aqui!"}/>
                }

            </View>
        </View>
    )
}

