import React, {useState} from 'react';
import AddCustomer from "../AddCustomer"; 
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderAddCustomer(props) {
    const [isOpenAddCustomer, setIsOpenAddCustomer] = useState(false); 

    
    return (
        <>
            <AddCustomer isOpen={isOpenAddCustomer} close={()=>setIsOpenAddCustomer(false)}/>
            <HeaderButton {...props} onPress={()=> setIsOpenAddCustomer(true)} />
        </>

    );
}