import React, {useState} from 'react'
import AddActivity from "../AddActivity"; 
import { useAuthContext } from 'contexts/authContext';
import { useMainContext } from 'contexts/mainContext';
import HeaderButton from 'components/Headers/HeaderButton';
export default function HeaderActivities(props) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddActivity, setIsOpenAddActivity] = useState(false); 
    const {getActivitys, getMyActivities} = useMainContext();
    
    return (
        <>
            <AddActivity 
                isOpen={isOpenAddActivity} 
                close={()=>setIsOpenAddActivity(false)} 
                getData={props?.myActivities ? getMyActivities : getActivitys}/>
            <HeaderButton {...props} onPress={()=> hasPermission() ? setIsOpenAddActivity(true) : null} />
        </>

    )
}