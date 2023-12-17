import axios from 'axios';
import React, { useEffect,useContext } from 'react' 
import ItemContext from '../Context/ItemContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const HomePage = () => { 
    const itemsearch = useContext(ItemContext).Search;
    const setItemSearch = useContext(ItemContext).SetSearch;
    const items = itemsearch.allItems;
    const setItems = setItemSearch.setAllItems;
    const picture = itemsearch.itemPictures;
    const setPicture = setItemSearch.setItemPictures;
    const searchNumber = itemsearch.totalItemNumber;
    const setSearchNumber = setItemSearch.setTotalItemNumber; 
    const setSearchError = setItemSearch.setSearchError;
    const searchError = itemsearch.searchError;
    const searchCount = itemsearch.searchCount;
    const setSearchCount = setItemSearch.setSearchCount;
    const ItemMethods = useContext(ItemContext).ItemMethods;
    const navigate = useNavigate();

    const fetchItem = async (item) => {
        axios.get(`http://127.0.0.1:4000/admin/product/${item}`)
        .then( data => {
            ItemMethods.setItemName(data.data.ItemName);
            ItemMethods.setItemBonusPrice(data.data.ItemBonusPrice);
            ItemMethods.setDescription(data.data.Description);
            ItemMethods.setMediaBase64(data.data.MediaBase64);
            ItemMethods.setItemPrice(data.data.ItemPrice);
            ItemMethods.setProductName(data.data.ProductName);
            ItemMethods.setItemMediaSize(data.data.ItemMediaSize);
            ItemMethods.setOverView(data.data.OverView);
            ItemMethods.setShipping(data.data.Shipping);
            ItemMethods.setCategory(data.data.Category);
            ItemMethods.setWarranty(data.data.Warranty);
            setItemSearch.setReadOnly(true);
            setItemSearch.setItemId(item);
            navigate('/admin/additem');
        })
        .catch( err => console.log(err.response.data))
    }

    const deleteItem = async (item,index) => {
        await axios.delete(`http://127.0.0.1:4000/admin/product/${item}`)
        .then(data => {
            console.log(data);
            const tempPicture = [...picture];
            tempPicture.splice(index,1);
            setPicture(tempPicture);
            const tempItems = [...items];
            tempItems.splice(index,1);
            setItems(tempItems);

        })
        .catch( err => console.log(err.response.data.error));
    }


    const fetchItems = () => {
        if(itemsearch.searchType === 'Category'){
            axios.get(`http://127.0.0.1:4000/admin/product/category/${itemsearch.searchText}?itemPage=${itemsearch.searchCount}`).then( data => {  
                setItems([...data.data.allItems]);
                setPicture([...data.data.ItemPicture]);
                 setSearchNumber(data.data.allItemsLength);
                 setSearchError(undefined);
                 })
                .catch( err => {console.log(err.response.data); 
                    setSearchNumber(undefined); 
                    setSearchError(err.response.data.error);
                    setItems([]); setPicture([]);
                });
        }

        else if(itemsearch.searchType === 'Name'){
            axios.get(`http://127.0.0.1:4000/admin/product/name/${itemsearch.searchText}?itemPage=${itemsearch.searchCount}`).then( data => {  
                setItems([...data.data.allItems]);
                setPicture([...data.data.ItemPicture]);
                setSearchNumber(data.data.allItemsLength);
                setSearchError(undefined)
                 })
                .catch( err => {console.log(err.response.data); 
                setSearchNumber(undefined);
                setSearchError(err.response.data.error);
                setItems([]); setPicture([]);
            });    
        }

        else{

        axios.get(`http://127.0.0.1:4000/admin/products?itemPage=${itemsearch.searchCount}`).then( data => {
        setItems([...data.data.allItems]);
        setPicture([...data.data.ItemPicture]); 
        setSearchNumber(undefined);
        setSearchError(undefined);
         })
        .catch( err => {console.log(err.response.data); 
            setSearchError(err.response.data.error);
            setSearchNumber(undefined);
            setItems([]); setPicture([]);
        });
        }
         }

 useEffect( () => {
    fetchItems();},[]);
 

 const previous = async () => {
if(searchCount > 0){
    setSearchCount(searchCount--);
    await fetchItems();
}
else{
    setSearchCount(0);
}
 }

 const next = async () => {
    const limit =  (searchCount + 1) * 20;
    
    if(limit < searchNumber){
        setSearchCount(searchCount++);
        await fetchItems();
    }
     }
    return<>
    <div className='text-center mb-3'>
    {
        (searchNumber && (itemsearch.searchType !== '') ) ? <h3> 
            {searchNumber} result found for {itemsearch.searchText}
        </h3> : null
    }
    </div>
    {
        (searchError === 'Invalid Category') || (searchError === 'Invalid Name') ? <h3 className='text-center align-self-center'>
        no search result for {itemsearch.searchText}
    </h3> : <div >
    <div className='row justify-content-around text-center position-static'>
    <div className='col-4 col-md-2' >
<h3>Item Name</h3>
    </div>
        <div className='col-4 col-md-2 d-none d-md-block' >
<h3>Product name</h3>
    </div>
    <div className='col-2 col-md-1' >
<h3>Item Price</h3>
    </div>

    <div className='col-4 col-md-2 d-none d-md-block' >
<h3>Item Category</h3>
    </div>
    <div className='col-4 col-md-2' >
<h3>Item Picture</h3>
    </div>
    <div className='col-1'>

    </div>

 </div>

{
    items.map( (item,index) => (
        <div className='row justify-content-around mt-3 text-center' key={item._id}>
    <div className='col-4 col-md-2 align-self-center' >
<Link onClick={() => fetchItem(item._id)}>{item.ItemName}</Link>
    </div>
        <div className='col-4 col-md-2 align-self-center d-none d-md-block' >
<h4>{item.ProductName}</h4>
    </div>
    <div className='col-2 col-md-1 align-self-center' >
<h4>#{item.ItemPrice}</h4>
    </div>
    <div className='col-4 col-md-2 d-none d-md-block align-self-center' >
<h4>{item.Category}</h4>
    </div>
    <div className='col-4 col-md-2' >
<img src={picture[index]} height='auto' alt={item.ProductName} width='100%'/>
    </div>
    <div className='col-1'>
<button onClick={() => deleteItem(item._id,index)} className='btn btn-danger'>Delete</button>
    </div>

 </div>
    ))
}

<div className='row justify-content-around mt-5 positon-fixed'>
<div className='col-6 text-center'><button className='btn btn-dark' onClick={previous}>  Prev</button></div>
<div className='col-6 text-center'><button className='btn btn-dark' onClick={next}>Next</button></div>
</div>
    </div>
    }
    </>
}

export default HomePage