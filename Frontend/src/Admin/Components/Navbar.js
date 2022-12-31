import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../Images/logo.jpg';
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
        </form>
        <Dropdown className='me-2'>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Filter Search
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Search Category</Dropdown.Item>
        <Dropdown.Item href="#">Search Name</Dropdown.Item>
        <Dropdown.Item href="#">Search All</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


        <div className="text-end">
          <button type="button" className="btn btn-outline-light me-5">Search</button> 
        </div>
      </div>
    </div>
  </header>
  </div>
    </>
}

export default Navbar;