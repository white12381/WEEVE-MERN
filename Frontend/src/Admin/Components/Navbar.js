import React, { useContext } from 'react'; 
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../Images/logo.jpg';
import { Link } from "react-router-dom";
import ItemContext from '../Context/ItemContext';
import { useNavigate, useLocation } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsearch = useContext(ItemContext).Search;
  const setItemSearch = useContext(ItemContext).SetSearch;
  const items = itemsearch.allItems;
  const setItems = setItemSearch.setAllItems;
  const picture = itemsearch.itemPictures;
  const setPicture = setItemSearch.setItemPictures;
  const searchNumber = itemsearch.totalItemNumber;
  const setSearchNumber = setItemSearch.setTotalItemNumber;
  const setSearchError = setItemSearch.setSearchError;

  const fetchItems = () => {
    if(itemsearch.searchType === 'Category'){
        axios.get(`http://127.0.0.1:4000/admin/product/category/${itemsearch.searchText}?itemPage=${itemsearch.searchCount}`).then( data => {  
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

    else if(itemsearch.searchType === 'Name'){
      axios.get(`http://127.0.0.1:4000/admin/product/name/${itemsearch.searchText}?itemPage=${itemsearch.searchCount}`).then( data => {  
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

    else{
      setSearchNumber(undefined);
    axios.get(`http://127.0.0.1:4000/admin/products?itemPage=${itemsearch.searchCount}`).then( data => {
    setItems([...data.data.allItems]);
    setPicture([...data.data.ItemPicture]);
    setSearchError(undefined);  
     })
    .catch( err => {console.log(err);
      setSearchError(err.response.data.error);
      setItems([]); setPicture([]);
    });
    }
     }

  const fetchItem = async () => {
    if(location.pathname === '/admin'){
      fetchItems();
    }
    else{
    navigate('/admin');
    }
  }

  const setText = (e) => {
    setItemSearch.setSearchText(e.target.value);
  }
  const setCategory =  () => {
    setItemSearch.setSearchType('Category');
  }
  const setName = () => {
    setItemSearch.setSearchType('Name');
  }
  const setAll = () => {
    setItemSearch.setSearchType('All');
  }

   
    return <>
    <div id='NAVBAR'>
    <nav className="py-2   float-end bg-dark" id='navbar' >
    <div className="container d-flex flex-wrap">
      <ul className="nav me-3" id="LogOut">
        <li className="nav-item "><a href="/" className="nav-link text-white link-white text-decoration-none px-2">Logout</a></li>
      </ul>
    </div>
  </nav>
  <header id='navbar' className="p-3">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-start">
        <Link to="/admin" className="d-flex align-items-center  mb-2 mb-lg-0 text-white text-decoration-none" id="WeeveAdmin">
          <img src={logo} alt="Logo" id="logo" />
          WEEVE Admin</Link>
          <Link to="/admin/additem" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" id='AddItem'>Add item</Link>
  
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" id='Search' role="search">
          <input type="search" value={itemsearch.searchText} onChange={setText} className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
        </form>
        <Dropdown className='me-2'>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {itemsearch.searchType || "Filter Search"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={setAll}>Search All</Dropdown.Item>
        <Dropdown.Item onClick={setCategory}>Search Category</Dropdown.Item>
        <Dropdown.Item onClick={setName}>Search Name</Dropdown.Item> 
      </Dropdown.Menu>
    </Dropdown>


        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-5" onClick={fetchItem} >Search</button> 
        </div>
      </div>
    </div>
  </header>
  <div className='loader'>
  </div>
  </div>
  
  </>
}

export default Navbar;