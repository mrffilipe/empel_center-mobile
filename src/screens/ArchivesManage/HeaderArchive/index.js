import React, {useState} from 'react'
import AddArchive from "../AddArchive"; 
import { useAuthContext } from 'contexts/authContext';
import { useMainContext } from 'contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderArchive(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddArchive, setIsOpenAddArchive] = useState(false); 
    const {getArchives} = useMainContext();
    
    return (
        <>
            <AddArchive isOpen={isOpenAddArchive} close={()=>setIsOpenAddArchive(false)} getData={getArchives}/>
            <HeaderButton {...props} onPress={()=> hasPermission() ? setIsOpenAddArchive(true) : null} />
        </>

    )
}