import React, {useState, useEffect, useCallback} from "react";  
import { useTelegram } from "../../Hooks/useTelegram";
import './Form.css';                

const Form = () => {   
    const [name, setName] = useState();    
    const [phone, setPhone] = useState();      
    const [deliv, setDeliv] = useState();         
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            phone,
            deliv
        }
        tg.sendData(JSON.stringify(data));
    }, [name, phone, deliv])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', callback)
        return () => {
            tg.offEvent( 'mainButtonClicked', onSendData)
        }
    },[onSendData]) 

    useEffect( () => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect( () => {
        if(!name || !phone) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone])


    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeDeliv = (e) => {
        setDeliv(e.target.value)
    }
                       
    return(
        <div className={"form"}>
            <h3>Введите Ваши данные</h3>
            <input className={'input'} type="text" placeholder="Имя"
            value={name} onChange={onChangeName} />
            <input className={'input'} type="text" placeholder="Номер телефона"
            value={phone} onChange={onChangePhone} />
            <select className={'select'} 
            value={deliv} onChange={onChangeDeliv}>
                <option value={'delivery'}>Доставка (Москва, Коломна)</option>
                <option value={'send'}>Рассылка (Российская федерация, СНГ)</option>
            </select>
        </div>
    );  
};

export default Form;