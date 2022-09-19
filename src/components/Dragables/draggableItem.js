import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, Pressable, Image, Animated, PanResponder, useWindowDimensions} from "react-native";
import IDetails from "../../assets/icons/details";
import IUser from "../../assets/icons/user";
import IMessage from "../../assets/icons/message";
import NewMessage from "../NewMessage";
import Reminders from "./Reminder";
// import AddMessage from "../AddMessage";
// import Reminder from "./Reminder";

const props = {
    value:Object,
    dropZoneValues:Array,
    updateStatus:Function,
    scrollValue:Number,
    index:Number,
    setIsDragIn:Function,
    scrollRef:Object,
    data:Array,
    setData:Function
}
export default function Drgables({
    value,
    dropZoneValues,
    updateStatus,
    index,
    scrollValue,
    setIsDragIn,
    navigate,
    scrollRef,
    data,
    setData,
} = props) {
    const window = useWindowDimensions();
    const [msgs, setMsgs] = useState(null);
    const [pan] = useState(new Animated.ValueXY())
    const [panResponder, setPanResponder] = useState(PanResponder.create({}))

    const [newMessageInfo, setNewMessageInfo] = useState(null);
    const [readMessageId, setReadMessageId] = useState(null);

    const saveMessage = (msg) =>{
        if(!msg){
            setNewMessageInfo(null);
            return;
        }
    
        let arr = [...data];
        arr[index].reminder.push({
            id:10,
            name: "Jonatã",
            msg:msg
        });
        // console.log(msg);
        setData(arr);
        setNewMessageInfo(null);
    }

    const deleteMessage = (msgs = [])=>{
        let arr = [...data];
        arr[index].reminder = msgs;
        setData(arr)
    }

    const onDrag = ()=>{
        // if(data[index].status === 4) return; //não permitir drag no finalizado
        if(index === dropZoneValues.length - 1) return;
        setPanResponder(PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => {
                setIsDragIn(true);
                return true
            },
            onPanResponderMove: Animated.event([
              null, { dx: pan.x, dy: pan.y }
            ],
            {
                listener: (event,gesture) => {
                    if(gesture.moveX < 40){
                        scrollRef.current?.scrollTo({
                            y: 0,
                            x:scrollValue - 300,
                            animated: true,
                          });
                    }else if(gesture.moveX > window.width - 40){
                        scrollRef.current?.scrollTo({
                            y: 0,
                            x:scrollValue + 300,
                            animated: true,
                          });
                    }
                },
                useNativeDriver:true
            }),
            // adjusting delta value
            onPanResponderRelease           : (e, gesture) => {
                // count = 0;
                let res = isDropZone(gesture);
                    setIsDragIn(false);
                if(!res === false && gesture.moveX > 10)
                    updateStatus(index,res)

                Animated.spring(          //retornar a posição certa
                    pan,         
                    {
                        toValue:{
                            x:0,
                            y:0
                        },
                        useNativeDriver:false
                    }     
                ).start();
            }
        }))
  
    }

    const isDropZone = (gesture)=>{   
        var dz = dropZoneValues;
        for(var i=0; i<dz.length; i++){
            if(gesture.moveX + scrollValue > dz[i]?.x && gesture.moveX + scrollValue < dz[i]?.x + dz[i]?.width && data[index].status !== 4)
                return dz[i].status
        }

        return false;
    }

    useEffect(()=>{
        onDrag()
    },[dropZoneValues,scrollValue])
      

    const panStyle = {
        transform: pan.getTranslateTransform()
    }

    return (
        <>
        <NewMessage newMessageInfo={newMessageInfo} saveMessage={saveMessage} />
        <Reminders msgs={msgs} setMsgs={setMsgs} deleteMessage={deleteMessage} />

        <Animated.View
        {...panResponder.panHandlers}
        teste={"teste"}
        style={[panStyle]}>
            <View style={[styles.list_wrap, styles.list_wrap_draggable]}>

                <Pressable 
                android_ripple={{ color: "rgba(0, 0, 0, 0.03)"}}
                style={[styles.info,styles.info_draggable]} 
                onPress={()=>setNewMessageInfo({id:value.id})}>

                    {value.perfil
                        ? <Image
                            style={styles.tinyLogo}
                            source={url('https://lh3.googleusercontent.com/ogw/AOh-ky1c19kdtLzv9Q272rV3ZWsmdkA6dt-E14rK2iI2jg=s32-c-mo')}/>
                        : <View style={styles.img_icon_wrap}><IUser style={styles.img_icon} /></View>
                    } 
            
                    <View>
                        <View style={styles.text_wrap}>
                            <Text style={[styles.h5,styles.h5_seller]}>{value?.seller}</Text>
                        </View>

                        <View style={[styles.text_wrap,styles.text_wrap_padding]}>
                            <Text style={[styles.h5,styles.h4]}>{value?.customer}</Text>
                        </View>
                    </View>

                </Pressable>
            

                <View style={styles.actions} >
                    <View>
                        <Text style={[styles.small,styles.category]}>{value?.category}</Text>
                    </View>

                    <View>
                        <Text style={styles.small}>{value?.date}</Text>
                    </View>

                    <View style={styles.icons_wrap}>
                        {value?.reminder.length ?
                        <Pressable onPress={()=>setMsgs(value?.reminder)} style={styles.msg_ico_wrap}>
                            <IMessage style={[styles.icon,styles.icon_msg]}/>
                            <Text style={styles.msgs_count}>{value?.reminder.length}</Text>
                        </Pressable>
                        :<></>}

                        <Pressable 
                        onPress={()=>navigate({
                        name: 'Detalhes do orçamento',
                        params: { id: value.id },
                            // merge: true,
                        })} >
                            <IDetails style={styles.icon}/>
                        </Pressable>
                    </View>
                </View>
            
            </View>
        </Animated.View>
        </>
    )
}
