import React, {useState} from 'react'
import AddSupplier from "../AddSupplier"; 
import { useAuthContext } from '../../../contexts/authContext';
import { useMainContext } from '../../../contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderAddSupplier(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddSupplier, setIsOpenAddSupplier] = useState(false); 
    const {getSuppliers} = useMainContext();
    
    return (
        <>
            <AddSupplier isOpen={isOpenAddSupplier} close={()=>setIsOpenAddSupplier(false)} updateSupplier={getSuppliers}/>
            <HeaderButton {...props} onPress={()=> hasPermission() ? setIsOpenAddSupplier(true) : null} />
        </>

    )
}