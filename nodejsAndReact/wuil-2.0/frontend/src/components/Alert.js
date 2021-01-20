import React from 'react'
import {Alert} from 'reactstrap'

const RenderAlert =(props) => {
    if(props.ErrMess.err){
        return(
            <Alert color="primary" className="m-0">
                {props.ErrMess.errMess}
            </Alert>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default RenderAlert;