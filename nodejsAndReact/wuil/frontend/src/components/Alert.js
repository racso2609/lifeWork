import React from 'react'
import {Alert} from 'reactstrap'

const RenderAlert =(props) => {
    if(props.adding){
        return(
            <Alert color="primary" className="m-0">
                {props.adding}
            </Alert>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default RenderAlert;