import React, {useState} from 'react'
import AddService from "../../ServicesActived/AddServiceActived"; 
import { useAuthContext } from 'contexts/authContext';
import { useMainContext } from 'contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
import Header from 'components/Headers/Header';
import {TouchableOpacity, View, Text } from 'react-native';
import {colors} from "../../../styles/defount.json"
import IPlus from "icons/plus";
export default function HeaderAddService(props) {
    const [isOpenAddService, setIsOpenAddService] = useState(false); 
    const {getServices} = useMainContext();
    
    return (
        <Header {...props}>
            <AddService isOpen={isOpenAddService} close={()=>setIsOpenAddService(false)} getData={getServices}/>

            <TouchableOpacity onPress={()=>setIsOpenAddService(true)} style={{
                backgroundColor:colors.secondary,
                padding:2,
                borderRadius:5,
            }}>
                {typeof props.children === 'object'
                    ? props.children
                    : <IPlus style={{
                        fontSize:30,
                        color:"#fff",
                        fontWeight:"bold",
                        height:30,
                        width:30,
                    }}/>
                }  
            </TouchableOpacity>

        </Header>

    )
}