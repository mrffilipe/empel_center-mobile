import React, {useEffect, useState} from 'react'
import AddService from "../AddService"; 
import IPlus from "icons/plus";
import styles from './styles';
import { useAuthContext } from 'contexts/authContext';
import { useMainContext } from 'contexts/mainContext';
import {TouchableOpacity} from 'react-native';
import Header from 'components/Headers/Header';
export default function HeaderAddService(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddService, setIsOpenAddService] = useState(false); 
    const {getServices} = useMainContext();
    
    
    return (
        <Header {...props}>
            <AddService isOpen={isOpenAddService} close={()=>setIsOpenAddService(false)} getData={getServices}/>
            {hasPermission() ?
                <TouchableOpacity onPress={()=>setIsOpenAddService(true)} style={styles.btn}>
                    <IPlus style={styles.icon}/>
                </TouchableOpacity>
                :<></>
            }
        </Header>
    )
}