import React, {useState, useEffect} from 'react'
import styles from "./styles";
import {View, Text, Pressable, Modal, ScrollView} from 'react-native';
import ICheckList from "../../../assets/icons/checkList";
import IPlusList from "../../../assets/icons/plusList";
import IPen from "../../../assets/icons/pen";
import ILass from "../../../assets/icons/less";
import ICheck from "../../../assets/icons/check";
import ITrash from "../../../assets/icons/trash";
import AddTask from "./AddTask";
import AllClear from "../../AllClear";
import HeaderButton from "../HeaderButton";
import Loading from "../../Loading";
import Callback  from "../../Modal/Callback";
import selectOptions from "../../../data/selectOptions.json";
import enumData from "../../../data/enum.json";
import ITimer from "../../../assets/icons/timer";
import {formatDate} from "../../../services/tools";
import { useMainContext } from '../../../contexts/mainContext';
import API from "../../../services/api";
export default function HeaderButtonTask(props, {route}) {
    const {taskSelected} = useMainContext();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newTask, setNewTask] = useState(null);

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState();

    const saveMessage = (res) =>{
        setEditMode(false);

        let arr = [...tasks];
        arr.push(res);
        setTasks(arr);
    }

    const markFinished = async (key)=>{
        let arr = [...tasks];

        let prevData = {
            completionDate:arr[key].completionDate = new Date().toISOString(),
            taskStatus:arr[key].taskStatus
        }
        arr[key].completionDate = new Date().toISOString();
        arr[key].taskStatus = "Concluded";
        setTasks(arr);

        try{
            let params = {
                "id": arr[key]?.id,
            };
            let res = await API.put("PVForm/complete-task",params).catch(e => e);
            if(res?.error || res !== 200){
                throw new Error(res.error);
            }
        }catch(error){
            setCallback({
                type: 0,
                message: `Não foi possivel marcar tarefa!`,
                action:()=>{
                    setCallback(null)
                },
                actionName:"Ok!",
                close:()=>setCallback(null)
            });
            arr[key].completionDate = prevData.completionDate;
            arr[key].taskStatus = prevData.taskStatus;
            setTasks(arr);
        }
    }

    const addTasks = ()=>{
        setTasks(taskSelected.tasks);
    }

    useEffect(()=>{
        if(taskSelected)
            addTasks();
    },[taskSelected]);

    const editOptions = ({val,key,finished})=>{
        // const markFinished = ()=>{
        //     let arr = [...tasks];
        //     let date = new Date();
        //     let d = date.getDate();
        //     let m = date.getMonth()+1;
        //     let y = date.getFullYear();
        //     arr[key].date = `${d.toString().length === 1?"0"+d : d}/${m.toString().length === 1?"0"+m : m}/${y}`
        //     arr[key].finish = 1;
        //     setTasks(arr);
        // }

        const deleteOne = ()=>{
            let arr = [...tasks];
            arr = arr.filter((obj, index)=> key !== index);
            setTasks(arr);
        }

        return (
            <View style={styles.headerTasks}>
                {/* <Pressable onPress={deleteOne}>
                    <ITrash style={styles.icon_option}/>   
                </Pressable> */}

                {!finished ?
                    <Pressable onPress={()=>markFinished(key)}>
                        <ICheck style={[styles.icon_option,styles.icon_check]}/>   
                    </Pressable>
                :<></>}
            </View>
        )
    }
    return (
        <HeaderButton {...props} onPress={()=>setIsOpenModal(!isOpenModal)}>
            {/* <Pressable onPress={}> */}
                <ICheckList style={styles.icon}/>
            {/* </Pressable> */}
            {loading ? <Loading loading2={loading}/> : <></>}
            {callback? <Callback params={callback} /> : <></>}
            <Modal visible={isOpenModal} transparent={true}>
                <View style={styles.modal}>
                    <Pressable onPress={()=>setIsOpenModal(!isOpenModal)} style={styles.closeModal}/>
                    <View style={styles.modal_content_wrap}>

                        <AddTask id={taskSelected?.id} close={()=>setNewTask(false)} isOpen={newTask} title={"Digite uma tarefa"} save={saveMessage} />

                        <View style={styles.headerTasks}>
                            <Text style={styles.title2}>Tarefas</Text> 
                            <View style={styles.headerTasks}>
                                <Pressable onPress={()=>setEditMode(!editMode)}>
                                    {editMode
                                        ? <ILass style={styles.iconTask}/>
                                        : <IPen style={styles.iconTask}/>
                                    }
                                    
                                </Pressable>
                                <Pressable onPress={()=>setNewTask(true)}>
                                    <IPlusList style={[styles.iconTask,styles.iconTask2]} />  
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView>
                            {tasks.length ?
                                tasks.map((val,key)=>{
                                    let finished = enumData.activityStatus[val.taskStatus];
                                    return(
                                        <View key={key} style={styles.task_single}>
                                            <View style={styles.text_wrap}>
                                                <View style={styles.headerTasks}>
                                                    {finished  
                                                        ? <Text style={styles.text_date}>{formatDate(val?.completionDate,true, true, false)}</Text>
                                                        : <View style={styles.text_date}></View>
                                                    }

                                                    {editMode && editOptions({val,key,finished})}
                                                    
                                                </View>
                                                
                                                <Text  style={styles.text}>{selectOptions.tasksPvForm[enumData.tasksPvForm[val?.taskCode]]}</Text>
                                            </View>
                                            {finished  
                                                ? <ICheck style={styles.iconCheck}/>
                                                : <ITimer style={[styles.iconCheck,styles.iconTimer]}/>
                                            }
                                            
                                        </View>
                                    )
                                })
                                :<AllClear msg={"Nenhuma tarefa por aqui!"}/>
                            }
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </HeaderButton>
    );
}
