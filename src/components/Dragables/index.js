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
    changeStatus:Function,
}
export default function Drgables({data = [], setData, status = [], navigate, children, changeStatus} = props) {

    const [dropZoneValues, setDropZoneValues] = useState([]);
    const [scrollValue, setScrollValue] = useState(0);
    const [isDragIn, setIsDragIn] = useState(false);

    const scrollRef = useRef(null);

    const setDropZoneValue = (e,statusKey) => {      //Step 1
        
        let obj = e.nativeEvent.layout;
        obj.status = statusKey;
        
        setDropZoneValues([
            ...dropZoneValues,
            obj
        ]);
    }

    const updateStatus = (index,item)=>{
        let arr = [...data];
        arr[index].status = item.status;
        let obj = arr[index];
        arr = arr.filter((val,key) => key !== index);
        arr.push(obj);
        setData(arr);
        changeStatus(item);
    }

    const onScrollHandler = (val)=>{
        setScrollValue(val);
    }


    return (

        <>
            <ScrollView ref={scrollRef} onScroll={(e)=>onScrollHandler(e.nativeEvent.contentOffset.x)}  horizontal={true}>
                <View style={[styles.container,styles.draggables]}>
                    {children}
                
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
                                    <Text style={[styles.small,styles.small_count]}>Resultados ({val.amount})</Text> 
                                </View>  
                            
                                <View style={styles.drag_wrap}>
                                    {data.map((value,index)=>{

                                        if(value.status === val.key){
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
                                                    data={data}
                                                    value={value} 
                                                    backgroundColor={styles[val?.color+"_opacity"]}
                                                />
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
