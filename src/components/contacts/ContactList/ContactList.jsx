import React,{useState,useEffect} from "react";
import { Await, Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ContactList=()=>{
    let [query,setQuery]= useState({
        text:" "
    });
   
        let [state,setState] =  useState({
        loading : false,
        contacts : [],
        filteredcontacts:[],
        errorMessage : " "
    }
    );
     useEffect(()=>{
        async function tp(){
         try{
           setState({...state, loading: true});
            let response = await ContactService.getAllContacts();
            setState({...state,loading: false, contacts: response.data, filteredcontacts: response.data});
          }
       catch(error){
            setState({...state,loading:false, errorMessage: error.message});
         }
     }
    tp()},[]);
    let clickdelete =(contactId)=>{
        async function tp(contactId){
            try{
                let response = await ContactService.deleteContact(contactId);
                if(response){
                    try{
                        setState({...state, loading: true});
                         let response = await ContactService.getAllContacts();
                         setState({...state,loading: false, contacts: response.data ,filteredcontacts: response.data});
                       }
                    catch(error){
                         setState({...state,loading:false, errorMessage: error.message});
                      }
                }
            }
            catch(error){
                setState({...state,loading:false, errorMessage: error.message});
            }
        }
        tp(contactId);
    }
   
    let {loading, contacts,filteredcontacts, errorMessage} = state;

    return(
        <React.Fragment>
            <pre></pre>
           <section className="contact-search p-3">
             <div className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h2 fw-bold"> Contact Manager
                            <Link to={"/contacts/add"} className="btn btn-primary ms-3">
                                <i className="fa fa-plus-circle me-3"/> New</Link>
                            </p>
                            <p className="fst-italic me-2">
                                Make The Task of Contact Management easier ...
                            </p>
                        </div>
                    </div>
                </div>
                {
                    loading? <Spinner/> : <React.Fragment>
                    <section className="contact-list">
                    <div className="container">
                        <div className="row">
                            {
                               filteredcontacts.length &&
                                filteredcontacts.map( contact=>{
                                    return(<div className="col-md-6" key={contact.id}>
                                    <div className="card my-2">
                                        <div className="card-body">
                                            <div className="row align-item-center d-flex justify-content-around ">
                                            <div className="col-md-4">
                                                <img src={contact.photo} className="img-fluid"/>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-action my-2">
                                                        Name : <span className="fw-bold"> {contact.name} </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action my-2">
                                                        E-mail : <span className="fw-bold"> {contact.email} </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-action my-2">
                                                        Mobile : <span className="fw-bold"> {contact.mobile}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-2">
                                                    <i className=" fa fa-eye"/>
                                                </Link>
                                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-2">
                                                    <i className=" fa fa-pen"/>
                                                </Link>
                                                <button  className="btn btn-danger my-2" onClick={()=>clickdelete(contact.id)}>
                                                    <i className=" fa fa-trash"/>
                                                </button>
                                            </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>)
                                })
                            }
                            
                        </div>
                    </div>
                </section>
                </React.Fragment>
                }
                
            </div>
           </section>
        </React.Fragment>
    )
}
export default ContactList;