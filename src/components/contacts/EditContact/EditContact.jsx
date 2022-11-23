import React,{useState,useEffect} from "react";
import { Link , useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let EditContact=()=>{
    let {contactId}= useParams();
    let navigate = useNavigate();
    let [state,setState] =  useState({
        loading : false,
        contact : {
            name:"",
            photo:"",
            mobile:"",
            email:"",
            company:"",
            title:"",
            groupId:""
        },
        errorMessage : " ",
        groups :[]
    }
    );
    useEffect(()=>{
        async function tp(){
         try{
           setState({...state, loading: true});
            let response = await ContactService.getContact(contactId);
            let groupresponse = await ContactService.getGroups();
            setState({...state,loading: false, contact: response.data, groups: groupresponse.data});
          }
       catch(error){
            setState({...state,loading:false, errorMessage: error.message});
         }
     }
    tp()},[contactId]);
    let {loading, contact, errorMessage,groups} = state;
    let updateinp =(event)=>{
        setState(   {
            ...state,
            contact:{
            ...state.contact,
            [event.target.name]:event.target.value
        }});
    }
    let submitForm =(event)=>{
        event.preventDefault();
        async function tip(){
            try{
                let response = await ContactService.updateContact(state.contact,contactId);
                if(response.data){
                    console.log("hi");
                    navigate("/contacts/list",{replace:true});
                }
            }
            catch(error){
                console.log("hi");
                setState( {...state,errormessage: error.message});
                navigate(`/contacts/edit/${contactId}`,{replace:false});

            }
        }
        tip();
    };
    return(
        <React.Fragment>
            {
                loading?<Spinner/>: <React.Fragment>
                    <section className="add-contact p-3">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3 textsuccess fw-bold ">Edit Contact</p>
                        <p className="fst-italic">Change is  a lot easier Now. </p>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <input name="name" required={true} onChange={updateinp}
                                 type="text" value={contact.name} className="form-control " placeholder="Name"></input>
                            </div>
                            <div className="mb-2">
                                <input name="photo" required={true} onChange={updateinp}
                                 type="text" value={contact.photo} className="form-control " placeholder="Photo Url"></input>
                            </div>
                            <div className="mb-2">
                                <input name="email" required={true} onChange={updateinp}
                                 type="email" value={contact.email} className="form-control " placeholder="Email"></input>
                            </div>
                            <div className="mb-2">
                            <input name="mobile" required={true} onChange={updateinp}
                             type="tel" value={contact.mobile} className="form-control" placeholder="Mobile" pattern="[6-9]{1}[0-9]{9}"/>
                            </div>
                            <div className="mb-2">
                                <input name="company" required={true} onChange={updateinp}
                                type="text" value={contact.company} className="form-control " placeholder="Company"></input>
                            </div>
                            <div className="mb-2">
                                <input name="title" required={true} onChange={updateinp}
                                type="text" value={contact.title} className="form-control " placeholder="Title"></input>
                            </div>
                            <div className="mb-2">
                                <select value={contact.groupId} required={true} name="groupId" onChange={updateinp}

                                className="form-control"  placeholder="select a group">
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
                                <button type="submit" className="btn btn-primary" value="Update">Update</button>
                                <Link to={"/contacts/list"} className="btn btn-dark ms-2">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                    <img src={contact.photo} className="contact-img" style={{height:200+"px"}}/>
                    </div>
                </div>
            </div>

        </section>
                </React.Fragment>
            }
        
    </React.Fragment>
    )
}
export default EditContact;