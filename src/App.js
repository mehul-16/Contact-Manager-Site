import React from 'react'
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import ContactList from './components/contacts/ContactList/ContactList';
import Addcontact from './components/contacts/Addcontact/Addcontact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import EditContact from './components/contacts/EditContact/EditContact';
import Navbar from './components/Navbar/Navbar';

let App=()=>{
  return(
    <React.Fragment>
     <Navbar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={"/contacts/list"}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>} />
        <Route path={'/contacts/add'} element={<Addcontact/>} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>} />


      </Routes>
    </React.Fragment>
  )
}

export default App;
