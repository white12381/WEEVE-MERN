import React,{createContext,useState} from "react";

const ItemContext = createContext();

export const ItemProvider = ({children}) => {
    const [ItemName,setItemName] = useState('');
    const [ItemPrice,setItemPrice] = useState('');
    const [ItemBonusPrice, setItemBonusPrice] = useState('');
    const [ProductName,setProductName] = useState('');
    const [ItemMediaSize, setItemMediaSize] = useState([]);
    const [OverView,setOverView] = useState('');  
    const [Shipping,setShipping] = useState('');
    const [Category,setCategory] = useState(''); 
    const [Warranty, setWarranty] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const [ Description, setDescription] = useState(''); 
    const [MediaBase64, setMediaBase64] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchCount, setSearchCount] = useState(0);
    const [allItems, setAllItems] = useState([]);
    const [itemPictures, setItemPictures] = useState([]);
    const [totalItemNumber, setTotalItemNumber] = useState(undefined);
    const [searchError, setSearchError] = useState('');
    const [itemId, setItemId] = useState('');

    

   const ItemInfo = {
    ItemName, ItemPrice, ProductName, ItemMediaSize,
    OverView,Warranty,
    Shipping, Category,Description, MediaBase64,ItemBonusPrice  
   }

   const Search = { searchText,itemId ,searchType, readOnly, searchCount, allItems, searchError ,itemPictures, totalItemNumber};
   const SetSearch = { setSearchError, setItemId ,setSearchText, setReadOnly ,setTotalItemNumber, setSearchType, setSearchCount, setAllItems, setItemPictures};

   const ItemMethods = {
    setItemName, setItemBonusPrice,setDescription,setMediaBase64,setItemPrice, setProductName, setItemMediaSize, setOverView, setShipping, setCategory, setWarranty
   }
   return <ItemContext.Provider value={{ItemInfo, ItemMethods, Search,SetSearch}}>
   {children}
   </ItemContext.Provider>
}
export default ItemContext;