import React from "react";
import spimg from "../../images/sp.gif"
let Spinner = () =>{
    return(
        <React.Fragment>
            <div>
                <img src={spimg} className="d-block m-auto" style={{width:"200px"}} />
            </div>
        </React.Fragment>
    )
}
export default Spinner;