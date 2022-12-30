import React, {useState, useCallback, useEffect} from "react";  
import './ProductList.css';                
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../Hooks/useTelegram";

const products =[
    {id:'1', title: 'Великобритания (3 саженца)', price: 450, description:'    Великолепный ранний сорт '},
    {id:'2', title: 'Эми (3 саженца)', price: 450, description:'       Великолепный ранний сорт '},
    {id:'3', title: 'Элли (3 саженца)', price: 450 , description:'  Великолепный ранний сорт   Великолепный ранний сорт '},
    {id: '3.5', title: 'Джемма (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},
    {id: '4', title: 'Вивальди (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},
    {id: '5', title: 'Москова (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},
    {id: '6', title: 'Клери (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},
    {id: '7', title: 'Дивная (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},
    {id: '8', title: 'Дочь дивной (3 саженца)', price: 450, description: 'Великолепный ранний сорт'},




]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}


const ProductList = () => {   
    const [addedItems, setAddedItems] = useState([])
    const {tg, queryId} = useTelegram();
    
    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        fetch('http://localhost:8000',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        )
    }, [])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent( 'mainButtonClicked', onSendData)
        }
    },[onSendData]) 

    const onAdd = (product) =>{
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);

        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0){
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}` 
            })
        }
    }

    return(
        <div className={'list'}>
                {products.map(item => (
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