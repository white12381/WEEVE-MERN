import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import AddItem from './Pages/AddItem';
import HomePage from './Pages/home';
import "./App.css"
import { ItemProvider } from './Context/ItemContext';

import Navbar from './Components/Navbar';
function AppAdmin() {
  return (
    
    <div className="App">
      <ItemProvider>
      <Navbar/>
      <Routes>
        <Route path="/admin" element={<HomePage />} />
        <Route path="/admin/additem" element={<AddItem />} />
      </Routes>
      </ItemProvider>
    </div>
  );
}

export default AppAdmin;
