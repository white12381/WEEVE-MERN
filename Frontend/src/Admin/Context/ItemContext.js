import React,{createContext,useState} from "react";

const ItemContext = createContext();

export const ItemProvider = ({children}) => {
    const [ItemName,setItemName] = useState('');
    const [ItemPrice,setItemPrice] = useState('');
    const [ProductName,setProductName] = useState('');
    const [ItemMedia, setItemMedia] = useState([]);
    const [OverView,setOverView] = useState('');  
    const [Shipping,setShipping] = useState('');
    const [Category,setListCategory] = useState(''); 
    const [Warranty, setWarranty] = useState('');
    const [ItemDescription, setItemDescription] = useState(''); 
    const [MediaBase64, setMediaBase64] = useState([]);

   const ItemInfo = {
    ItemName, ItemPrice, ProductName, ItemMedia,
    OverView,Warranty,
    Shipping, Category,ItemDescription, MediaBase64  
   }

   const ItemMethods = {
    setItemName,setItemDescription,setMediaBase64,setItemPrice, setProductName, setItemMedia, setOverView, setShipping, setListCategory, setWarranty
   }
   return <ItemContext.Provider value={{ItemInfo, ItemMethods}}>
   {children}
   </ItemContext.Provider>
}
export default ItemContext;