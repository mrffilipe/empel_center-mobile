import React, {useState, useEffect} from 'react'
import styles from "./styles";
import {View, Text, Pressable, Modal, ScrollView} from 'react-native';
import ICheckList from "../../../assets/icons/checkList";
import IPlusList from "../../../assets/icons/plusList";
import IPen from "../../../assets/icons/pen";
import ILass from "../../../assets/icons/less";
import ICheck from "../../../assets/icons/check";
import ITrash from "../../../assets/icons/trash";
import NewMessage from "../../NewMessage";
import AllClear from "../../AllClear";

export default function LogoTitle({tintColor,title}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newTask, setNewTask] = useState(null);

    const taskData = [
        {
            name:"Entrar em contato com clinete",
            date:"04/08/2022",
            finish:1
        },
        {
            name:"Fazer uma visita ao cliente",
            date:"04/08/2022",
            finish:1
        },
        {
            name:"Enviar Proposta",
            date:"04/08/2022",
            finish:0
        }
    ];

    const saveTask = (msg)=>{
        setEditMode(false);
        if(!msg)
            return setNewTask(null);

        let arr = [...tasks];
        arr.push({
            name:msg,
            date:"",
            finish:0
        })
        setTasks(arr);
        setNewTask(null);
    }

    useEffect(()=>{
        setTasks(taskData)
    },[])

    const editOptions = ({val,key})=>{
        const markFinished = ()=>{
            let arr = [...tasks];
            let date = new Date();
            let d = date.getDate();
            let m = date.getMonth()+1;
            let y = date.getFullYear();
            arr[key].date = `${d.toString().length === 1?"0"+d : d}/${m.toString().length === 1?"0"+m : m}/${y}`
            arr[key].finish = 1;
            setTasks(arr);
        }

        const deleteOne = ()=>{
            let arr = [...tasks];
            arr = arr.filter((obj, index)=> key !== index);
            setTasks(arr);
        }

        return (
            <View style={styles.headerTasks}>
                <Pressable onPress={deleteOne}>
                    <ITrash style={styles.icon_option}/>   
                </Pressable>

                {!val.finish ?
                    <Pressable onPress={markFinished}>
                        <ICheck style={[styles.icon_option,styles.icon_check]}/>   
                    </Pressable>
                :<></>}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.title,{color:tintColor}]}>{title}</Text>
            <Pressable onPress={()=>setIsOpenModal(!isOpenModal)}>
                <ICheckList style={styles.icon}/>
            </Pressable>

            <Modal visible={isOpenModal} transparent={true}>
                <View style={styles.modal}>
                    <Pressable onPress={()=>setIsOpenModal(!isOpenModal)} style={styles.closeModal}/>
                    <View style={styles.modal_content_wrap}>

                        <NewMessage newMessageInfo={newTask} saveMessage={saveTask} title={"Digite uma tarefa"} />

                        <View style={styles.headerTasks}>
                           <Text style={styles.title2}>Tarefas</Text> 
                            <View style={styles.headerTasks}>
                                <Pressable onPress={()=>setEditMode(!editMode)}>
                                    {editMode
                                        ? <ILass style={styles.iconTask}/>
                                        : <IPen style={styles.iconTask}/>
                                    }
                                    
                                </Pressable>
                                <Pressable onPress={()=>setNewTask({})}>
                                    <IPlusList style={[styles.iconTask,styles.iconTask2]} />  
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView>
                            {tasks.length 
                                ?tasks.map((val,key)=>{
                                    return(
                                        <View key={key} style={styles.task_single}>
                                            <View style={styles.text_wrap}>
                                                <View style={styles.headerTasks}>
                                                    {val.finish ? <Text style={styles.text_date}>{val.date}</Text>: <View style={styles.text_date}></View>}

                                                    {editMode && editOptions({val,key})}
                                                    
                                                </View>
                                                
                                                <Text  style={styles.text}>{val.name}</Text>
                                            </View>
                                            {val.finish ? <ICheck style={styles.iconCheck}/>: <></>}
                                            
                                        </View>
                                    )
                                })
                                :<AllClear msg={"Nenhuma tarefa por aqui!"}/>
                            }
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </View>
    );
}
