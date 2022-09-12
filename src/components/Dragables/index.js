import styles from "./styles";
import React, {useState, useEffect, useRef} from "react";
import {View, Text, ScrollView, Pressable} from "react-native";
import {colors} from "../../styles/defount.json"

import DraggableItem from "./draggableItem";


const props = {
    data:Array,
    setData:Function,
    status:Array,
    navigate:Function,
}
export default function Drgables({data = [], setData, status = [],navigate} = props) {

    const [dropZoneValues, setDropZoneValues] = useState([]);
    const [scrollValue, setScrollValue] = useState(0);
    const [isDragIn, setIsDragIn] = useState(false);

    const scrollRef = useRef();

    const setDropZoneValue = (e,statusKey) => {      //Step 1
        
        let obj = e.nativeEvent.layout;
        obj.status = statusKey;
        
        setDropZoneValues([
            ...dropZoneValues,
            obj
        ]);
    }

    const updateStatus = (index,newStatus)=>{
        let arr = [...data];
        arr[index].status = newStatus;
        setData(arr);
    }

    const saveMessage = (msg) =>{
        if(!msg){
            setNewMessageInfo(null, msg);
            return;
        }
        let arr = [...data];
        arr[newMessageInfo?.index].reminder.push({
            name: "Jonatã",
            msg:msg
        });
        // console.log(msg);
        setNewMessageInfo(null);
    }

    // const scrollValue = (e)=>{
    //     console.log(e.nativeEvent)
    // }

    return (

        <>
            {/* <AddMessage open={newMessageInfo?.id} save={saveMessage} close={setNewMessageInfo} /> */}
            <ScrollView ref={scrollRef} onScroll={(e)=>setScrollValue(e.nativeEvent.contentOffset.x)}  horizontal={true}>
            <View style={[styles.container,styles.draggables]}>
            
                {status.map((val,key)=>{
                    return(
                        <View 
                        key={key} 
                        onLayout={(e)=> setDropZoneValue(e,val.key)} 
                        style={[styles.draggable_container,{
                            backgroundColor:isDragIn ? "rgba(220,220,220,0.2)":colors.white
                            }]}>

                            <View style={styles.draggable_title}>
                                <Text style={[styles.title_status,styles[val?.color]]}>{val.name}</Text>
                                <Text style={[styles.small,styles.small_count]}>{val.amount} resultados</Text> 
                            </View>  
                        
                            <View style={styles.drag_wrap}>
                                {data.map((value,index)=>{

                                    if(value.status === val.key){
                                        // val.amount = val.amount + 1;
                                        return(
                                            <DraggableItem 
                                                key={key+"_"+index} 
                                                dropZoneValues={dropZoneValues}
                                                updateStatus={updateStatus}
                                                index={index}
                                                scrollValue={scrollValue}
                                                setIsDragIn={setIsDragIn}
                                                navigate={navigate}
                                                scrollRef={scrollRef}
                                                saveMessage={saveMessage}
                                                data={data}
                                                setData={setData}
                                                value={value} />
                                        )

                                    }
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
            </ScrollView>
        </>
    )
}
