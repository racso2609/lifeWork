import React from 'react'
import { Alert } from 'reactstrap';

const Messages = (props)=>{
    if (props.errMess) {
        return(
            <div>

                <Alert className="m-0" color="danger">{props.errMess}</Alert>
            </div>
        );
    }else if(props.message){
        return(
            <div>
                <Alert className="m-0" color="info">{props.message}</Alert>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

export default Messages;