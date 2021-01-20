import React from 'react';
import {LocalForm, Control, Errors} from "react-redux-form";
import {Row, Col,Button} from "reactstrap";
import {Link} from "react-router-dom"

import {required} from "./auth/validation"

//icon
import Logo from "../img/login/Screenshot_1.png";

const ErrMess = ({errMess})=>{
    if(errMess){
        return(
            <div>
                <p className="text-danger">{errMess}</p>
            </div>

        );

    }else{
        return(
            <div></div>
        );
    }
}


const Form = ({Post,Login})=>{
    
    return(
        
        <div className="pr-5 pl-5 pt-3 pb-3 border shadow" style={{borderRadius:"10px"}}>
                
            <img src={Logo} alt="logo"/>
            <p  className=" text-center col-12 text-dark mb-4 ">Admin Login</p>
            
            <LocalForm onSubmit={(values)=>{Post(values.email,values.password);}}>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.text model=".email" className="form-control" placeholder="Email" validators={{required}}/>
                        <Errors className="text-danger text-left"
                                    model=".email"
                                    show="touched"
                                    messages={{required:"Email Required" }}/>
                    </Col>
                </Row>
                <Row className="form-group ">
                    <Col  md={12}>
                        <Control.password model=".password" className="form-control" placeholder="Password" validators={{required}}/>
                        <Errors className="text-danger text-left"
                                    model=".password"
                                    show="touched"
                                    messages={{required:"Password Required" }}/>
                    </Col>
                </Row>
                <Row className="form-group justify-content-center">
                    <Col md={12}>
                        <Button  type="submit" className="mt-4 rounded-pill btn btn-block text-light " style={{background:"rgb(67, 208, 233)",borderColor:"transparent"}}>Submit</Button>
                    </Col>
                    <Col md={12} className="mt-5">
                        <Link to="/reset-password" className="text-info ">Forgot Password</Link>
                    </Col>                    
                </Row>
            </LocalForm>
            
                
        </div>
    );
}
const LoginAdmin = (props)=>{

    
    return(

        <div className="row ">
            <div className="col-12 mb-5 background" style={{height:"50px"}}></div>

            
                <div className="col-6 col-md-4  m-auto " style={{height:"70vh"}}>   

                    <Form Post={props.Post} Login={props.Login}/>
                    <ErrMess errMess={props.errMess}/>

                   
                </div>
               
            
        </div>
    
    );
}



export default LoginAdmin;
