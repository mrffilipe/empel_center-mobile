import styles from "./styles";
import Dragables from "../../components/Dragables";
import React, {useState, useEffect} from "react";
import {View, ScrollView, Alert} from "react-native";
import Loading from "../../components/Loading";
import Callback from "../../components/Modal/Callback";
import enumData from "../../data/enum.json";
import States from "../../data/selectOptions.json";
import { formatDate, limitText} from "../../services/tools";
import {useMainContext} from "../../contexts/mainContext";
import API from "../../services/api";
import InputText from "../../components/Form/InputText";
import Select from "../../components/Form/Select";
export default function Planning({navigation}) {

    const {servicesActives, getServicesActives, services} = useMainContext();    
    const getAll = "Todos";

    const [data, setData] = useState([]);
    const [isOpenAddPlanning, setIsOpenAddPlanning] = useState(false); 
    const [status, setStatus] = useState([]);

    const [search, setSearch] = useState("");
    const [service, setService] = useState(0);
    const deleteOnFront = (id)=>{
        let arr = [...data];
        arr = arr.filter(val => val.id !== id);
        setData(arr);
    }

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const removeService = async(id)=>{
        let service = servicesActives.filter(val => val.id === parseInt(id))[0];
        if(!await confirmDelete(`Confirmar`,`Deletar Serviço ${service?.serviceOffered?.name} do cliente ${service?.customerName}?`))
            return;
        try{
            setLoading(true);
            let res = await API.deletar("ActiveService/"+id).catch(e => e);
            

            if(res.error || !res)
                throw new Error(res.error? res.error : "Não foi possive deletar");

            let arr = [...data];
            arr = arr.filter(obj => obj.id !== id);

            deleteOnFront(id);
        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        
        }
        setLoading(false);

    }

    const confirmDelete = (title,message)=>{
        return new Promise((resolve)=>{

            Alert.alert(
                title,
                message,
                [
                    {
                        text:"Não",
                        onPress:()=> resolve(false),
                        type:"default"
                    },
                    {
                        text:"Sim",
                        onPress:()=> resolve(true)
                    },
                ],
                {
                    cancelable: true,
                    onDismiss:()=> resolve(false)
                }
            )
        })
    }

    const changeStatus = async(obj)=>{
        let newStatus = obj?.status;
        let id = obj?.id;
        let res = await API.put("ActiveService/change-status",{},
            {   
                headers:
                    {
                        id,
                        newStatus
                    }
            }).catch(err => err);
                
        if(res.error || res !== 200){
            getServicesActives(false);
            return setCallback({
                type: 0,
                message:res?.error ? res.error : res === 204 ? "Não foi possível mudar status!" : `Algo deu errado!`,
                action:()=>setCallback(null),
                actionName:"Ok",
                close:()=>setCallback(null),
            })
        }
    }

    const getAndformatData = ()=>{
        let arr = [...servicesActives];
        
        arr = arr.map((val)=>{
            let fullName = `${val?.customer?.firstName} ${val?.customer?.lastName}`;
            return {
                id:val.id,
                seller:limitText(fullName,18),
                category:limitText(val?.serviceOffered?.name,20),
                date:formatDate(val?.updatedAt,true,false),
                status:enumData.activeServiceStatus[val?.status],
            }
        })
        
        filterSearch(arr);
    }

    const servicesFormat = ()=>{
        return [getAll,...services.map(val =>{
            return val.name;
        })]
    }

    const filterSearch = (dataMain)=>{ //pesquisar filtrar
        
        let dataFiltered = dataMain.filter(item => {
            let res = true;

            let serviceName = item?.category;
            if(parseInt(service) && servicesFormat()[parseInt(service)] !== serviceName)
                res = false;

            if(search && !item.seller.toLowerCase().includes(search.toLowerCase()))
                res = false;

            return res;
        });
        
        setData(dataFiltered);
    }

    useEffect(()=>{
        setStatus(States.activeServiceStatus.map((val)=>{//adcionar quantidade em cada status
            val.amount = data.filter(obj => obj.status === val.key).length
            return val;
        }))
    },[data]);

    useEffect(()=>{
        getServicesActives(servicesActives.length === 0);

        return ()=>{
            getServicesActives(false);
        }
    },[]);

    useEffect(()=>{
        getAndformatData();
    },[search, service, servicesActives])

    return (
        <ScrollView>
            {loading ? <Loading loading2={loading} animation="delete" /> : <></>}
            <Callback params={callback} />
            <View style={styles.container}>
                <View style={styles.input_group}>

                    <View style={styles.input_single}>
                        <Select
                            value={servicesFormat()[service]}
                            values={servicesFormat()}
                            setValue={setService}
                            label={"Serviço"}
                            labelTop={true}
                        />
                    </View>

                    <View style={[styles.input_single]}>
                        <InputText
                            label="Buscar"
                            value={search}
                            setValue={setSearch}
                        />
                    </View>
                </View>
                <View style={styles.plannings}>
                    <Dragables data={data} setData={setData} status={status} notDragable={[]} budgets={false} handleDelete={removeService} changeStatus={changeStatus} />
                </View>
            </View>
        </ScrollView>
    )
}