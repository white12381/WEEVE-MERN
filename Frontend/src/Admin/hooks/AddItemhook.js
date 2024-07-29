import  { useContext, useState } from "react";
 import ItemContext from "../Context/ItemContext"; 

 export const AddItems = () => {
 const [submit, setSubmit] = useState(false);
 const [error, setError] = useState('');
 const item = useContext(ItemContext).ItemInfo;
 const itemMethods = useContext(ItemContext).ItemMethods;
 const add = async () => { 
   if( (item.ItemName !== '') && (item.ItemPrice > 0 ) && (item.Category !== '' ) && item.ItemMediaSize.length > 0){
    setSubmit(true);
   const response = await fetch('http://127.0.0.1:4000/admin/product',{
        method: 'Post',
        body: JSON.stringify(item),
        headers: {'Content-Type': 'Application/Json'}
    });
    const data = await response.json();
    if(!response.ok){
        alert(data.error);
        setError(data.error)
        setSubmit(false);
    }
    else{
        itemMethods.setItemName('');
        itemMethods.setProductName(''); 
        itemMethods.setItemMediaSize([]);
        itemMethods.setMediaBase64([]);
        itemMethods.setItemPrice('');
        itemMethods.setOverView('');
        itemMethods.setWarranty('');
        itemMethods.setShipping(''); 
        itemMethods.setDescription('');
        itemMethods.setItemBonusPrice('');
        alert("Success");
        setSubmit(false);
    }
}
}
return {add,submit,error};
}

