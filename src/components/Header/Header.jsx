import React from "react";  
import Button from "../Button/Button";                
import { useTelegram } from "../../Hooks/useTelegram";
import './Header.css'; 


const Header = () => {   
    const {tg, user, onClose } = useTelegram();
    

                       
    return(
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </div>
    );  
};

export default Header;