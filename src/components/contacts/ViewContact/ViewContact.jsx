import React from "react";
import { Link ,useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import {useEffect,useState} from "react"
import { ContactService } from "../../../services/ContactService";

let ViewContact=()=>{
    let {contactId}= useParams();
    let [state,setState] =  useState({
        loading : false,
        contact : {},
        errorMessage : " ",
        group :{}
    }
    );
    useEffect(()=>{
        async function tp(){
         try{
           setState({...state, loading: true});
            let response = await ContactService.getContact(contactId);
            let groupresponse = await ContactService.getGroup(response.data);
            setState({...state,loading: false, contact: response.data, group: groupresponse.data});
          }
       catch(error){
            setState({...state,loading:false, errorMessage: error.message});
         }
     }
    tp()},[contactId]);
    let {loading, contact, errorMessage,group} = state;
    return(
        <React.Fragment>
            <section className="view-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic"> View Mode for Contacts.</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading? <Spinner/>:<React.Fragment>
                   { Object.keys(contact).length > 0 && Object.keys(group).length > 0 && 
                   <section className="view-contact my-3" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                        <img src = {contact.photo} className="contact-img" style={{height:200+"px"}}/>
                        </div>
                        <div className="col-md-8">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-action ">
                                Name : <span className="fw-bold">{contact.name}</span>
                            </li>
                            <li className="list-group-item list-group-item-action ">
                                E-mail : <span className="fw-bold"> {contact.email}</span>
                            </li>
                            <li className="list-group-item list-group-item-action ">
                                Mobile : <span className="fw-bold"> {contact.mobile}</span>
                            </li>
                            <li className="list-group-item list-group-item-action ">
                                Company : <span className="fw-bold">{contact.company}</span>
                            </li>
                            <li className="list-group-item list-group-item-action ">
                                Title : <span className="fw-bold"> {contact.title}</span>
                            </li>
                            <li className="list-group-item list-group-item-action ">
                                Group : <span className="fw-bold"> {group.name} </span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={"/contacts/list"} className="btn btn-warning my-2">Back</Link>
                        </div>
                    </div>
                </div>
            </section>
}
                </React.Fragment>

            }
            
        </React.Fragment>
    )
}
export default ViewContact;