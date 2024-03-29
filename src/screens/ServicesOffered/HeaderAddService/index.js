import React, {useState} from 'react'
import AddService from "../AddService"; 
import { useAuthContext } from 'contexts/authContext';
import { useMainContext } from 'contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderAddService(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddService, setIsOpenAddService] = useState(false); 
    const {getServices} = useMainContext();
    
    return (
        <>
            <AddService isOpen={isOpenAddService} close={()=>setIsOpenAddService(false)} getData={getServices}/>
            <HeaderButton {...props} onPress={()=> hasPermission() ? setIsOpenAddService(true) : null} />
        </>

    )
}