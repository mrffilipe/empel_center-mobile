import React, {useState} from 'react'
import AddUser from "../AddUser"; 
import { useAuthContext } from '../../../contexts/authContext';
import { useMainContext } from '../../../contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderAddUser(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddUser, setIsOpenAddUser] = useState(false); 
    const {getUsers} = useMainContext();
    
    return (
        <>
            <AddUser isOpen={isOpenAddUser} close={()=>setIsOpenAddUser(false)} updateUsers={getUsers}/>
            <HeaderButton {...props} onPress={()=> hasPermission() ? setIsOpenAddUser(true) : null} />
        </>

    )
}