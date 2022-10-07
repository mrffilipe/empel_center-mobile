import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, Image, Animated, PanResponder, useWindowDimensions} from "react-native";
import IUser from "../../assets/icons/user";
import {limitText} from "../../services/tools";
import IMove from "../../assets/icons/move";
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
} = props) {
    const window = useWindowDimensions();
    const [pan] = useState(new Animated.ValueXY())
    const [panResponder, setPanResponder] = useState(PanResponder.create({}))

    const notDragable = [0,1];

    const allowDrag = (state)=>{
        for(let i in notDragable){
            if(state === notDragable[i])
                return false;
        }
        return true;
    }


    const onDrag = (scrolled = false)=>{
        let toNavigate = false;
        let allowDrop = scrolled;//evitar drop quando arrastar sem querer rapidamente
        let onLongPressTimeout;
        let onLongPressTimeoutDrop;
        setPanResponder(PanResponder.create({
            onPanResponderGrant: (e, gestureState) => {

                toNavigate = true;
                onLongPressTimeout = setTimeout(() => {
                  toNavigate = false;
                }, 100);

                onLongPressTimeoutDrop = setTimeout(() => {
                    allowDrop = true;
                  }, 500);
            },
            onStartShouldSetPanResponder: (e, gesture) => {
                setIsDragIn(true);
                return true
            },
            onPanResponderMove: Animated.event([
              null, { dx: pan.x, dy: pan.y }
            ],
            {
                listener: (event,gesture) => {
                    if(gesture.moveX < 30){
                        scrollRef.current?.scrollTo({
                            y: 0,
                            x:scrollValue - 300,
                            animated: true,
                          });
                    }else if(gesture.moveX > window.width - 30){
                        scrollRef.current?.scrollTo({
                            y: 0,
                            x:scrollValue + 300,
                            animated: true,
                        });
                    }
                },
                useNativeDriver:false
            }),
            // adjusting delta value
            onPanResponderRelease: (e, gesture) => {
                clearTimeout(onLongPressTimeout);
                clearTimeout(onLongPressTimeoutDrop);
                
                // count = 0;
                let res = isDropZone(gesture);
                    setIsDragIn(false);
                if(res !== false && gesture.moveX > 10 && res && allowDrop){
                    updateStatus(index,res)
                }else{
                    if(toNavigate){ //navegar para detalhes 
                    
                        navigate({
                            name: 'Detalhes do orçamento',
                            params: { id: value.id },
                                // merge: true,
                        })
                    }
                }

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
            if(gesture.moveX + scrollValue > dz[i]?.x && gesture.moveX + scrollValue < dz[i]?.x + dz[i]?.width){
                if(!allowDrag(data[index].status))
                    return false;
                
                return dz[i].status
            }
        }

        return false;
    }

    useEffect(()=>{
        onDrag()
    },[dropZoneValues, data])

    useEffect(()=>{
        onDrag(true)
    },[scrollValue])
      

    const panStyle = {
        transform: pan.getTranslateTransform()
    }

    return (
        <>
        <Animated.View
        {...panResponder.panHandlers}
        teste={"teste"}
        style={[panStyle]}>
            <View style={[styles.list_wrap, styles.list_wrap_draggable]}>
                {allowDrag(value?.status) 
                    ? <IMove style={styles.ico_move}/>
                    :<></>
                }

                <View
                style={[styles.info,styles.info_draggable]} >

                    {value.perfil
                        ? <Image
                            style={styles.tinyLogo}
                            source={url('')}/>
                        : <View style={styles.img_icon_wrap}><IUser style={styles.img_icon} /></View>
                    } 
            
                    <View>
                        <View style={styles.text_wrap}>
                            <Text style={[styles.h5,styles.h5_seller]}>{limitText(value?.seller,24)}</Text>
                        </View>

                        <View style={[styles.text_wrap,styles.text_wrap_padding]}>
                            <Text style={[styles.h5,styles.h4]}>{limitText(value?.customer,24)}</Text>
                        </View>
                    </View>

                </View>
            

                <View style={styles.actions} >
                    <View>
                        <Text style={[styles.small,styles.category]}>{value?.category}</Text>
                    </View>

                    <View>
                        <Text style={[styles.small, styles.category]}>{value?.date}</Text>
                    </View>
                </View>
            
            </View>
        </Animated.View>
        </>
    )
}
