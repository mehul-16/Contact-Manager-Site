import React from "react";
import { Link } from "react-router-dom";
let Navbar=()=>{
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="cointainer ms-3">
                    <Link to={'/'} className="navbar-brand ms-5"><i className="fa fa-mobile text-warning me-2"/>
                    Contacts <span className="text-warning">Manager</span></Link>
                </div>
            </nav>
        </React.Fragment>
    )
}
export default Navbar;