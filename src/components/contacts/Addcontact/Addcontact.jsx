import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";


let Addcontact=()=>{
    let navigate = useNavigate();
    let [state,setState]= useState({
        loading: false,
        contact:{
            name:"",
            photo:"",
            mobile:"",
            email:"",
            company:"",
            title:"",
            groupId:""
        },
        groups: [],
        errormessage:""
    });
    let update= (event)=>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]:event.target.value
            }
        })
    }
    useEffect(()=>{
        async function tp(){
         try{
           setState({...state, loading: true});
            let response = await ContactService.getGroups();
            setState({...state,loading: false, groups:response.data});
          }
       catch(error){
            setState({...state,loading:false, errorMessage: error.message});
         }
     }
    tp()},[]);
     let submitForm =(event)=>{
        event.preventDefault();
        async function tp(){
            try{
                let response = await ContactService.createContact(state.contact);
                if(response.data){
                    
                    navigate("/contacts/list",{replace:true});
                }
            }
            catch(error){
                
                setState( {...state,errormessage: error.message});
                navigate("/contacts/add",{replace:false});

            }
        }
        tp();
    };
    let {loading,contact,groups,errormessage} = state;
    return(
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 textsuccess fw-bold">Create Contact</p>
                            <p className="fst-italic">Add new Friends and Family in an instant. 🧑‍💼</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input name="name" value={contact.name} onChange={update} required={true}
                                     type="text" className="form-control " placeholder="Name"></input>
                                </div>
                                <div className="mb-2">
                                    <input name="photo" value={contact.photo} onChange={update} required={true}
                                     type="text" className="form-control " placeholder="Photo Url"></input>
                                </div>
                                <div className="mb-2">
                                    <input name="email" value={contact.email} onChange={update} required={true}
                                    type="email" className="form-control " placeholder="Email"></input>
                                </div>
                                <div className="mb-2">
                                <input name="mobile" value={contact.mobile} onChange={update} required={true}
                                type="tel" className="form-control" placeholder="Mobile" pattern="[6-9]{1}[0-9]{9}"/>
                                </div>
                                <div className="mb-2">
                                    <input name="company" value={contact.company} onChange={update} required={true}
                                    type="text" className="form-control " placeholder="Company"></input>
                                </div>
                                <div className="mb-2">
                                    <input name="title" value={contact.title} onChange={update} required={true}
                                    type="text" className="form-control " placeholder="Title"></input>
                                </div>
                                <div className="mb-2">
                                    <select name="groupId" value={contact.groupId} onChange={update} required={true}
                                    className="form-control" placeholder="select a group">
                                        <option value="">select a group</option>
                                        {
                                            groups.length > 0  && 
                                            groups.map((group)=>{
                                                    return(<option key={group.id} value={group.id}>{group.name}</option>)
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="mb-2">
                                    <button type="submit" className="btn btn-success" value="Create">Create</button>
                                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </React.Fragment>
    )
}
export default Addcontact;