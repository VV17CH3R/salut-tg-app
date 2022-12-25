import React, {useState} from "react";  
import './ProductList.css';                
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../Hooks/useTelegram";

const products =[
    {id:'1', title: 'Великобритания', price:'150', description:' Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт '},
    {id:'2', title: 'Эми', price:'150', description:' Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт '},
    {id:'3', title: 'Элли', price:'150', description:' Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт  Великолепный ранний сорт '},





]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}


const ProductList = () => {   
    const [addedItems, setAddedItems] = useState([])
    const {tg} = useTelegram();
    
    const onAdd = (product) =>{
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItem = [];

        if(alreadyAdded) {
            newItem = addedItems.filter(item => item.id !== product.id);

        } else {
            newItem = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0){
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Купить ${getTotalPrice(newItems)}'
            })
        }
    }

    return(
        <div className={'list'}>
                {ProductList.map(item => (
                    <ProductItem 
                        product = {item}
                        onAdd = {onAdd}
                        className={'item'}
                    />
                ))}
        </div>
    );  
};

export default ProductList;