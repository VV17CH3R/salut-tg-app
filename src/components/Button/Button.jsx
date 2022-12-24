import React from "react";  
import classes from './Button.css';                   

const Button = () => {   
                          
                       
    return(
        <button {...props} className={'button' + props.className}/>
    );  
};

export default Button;