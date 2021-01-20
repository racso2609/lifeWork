import React from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import {isValidEmail} from './auth/validation';

//icons
import Logo from "../img/login/Screenshot_1.png";

const Form = ({Post})=>{
    return(
        
        <div className="pt-3 pb-3 pl-5 pr-5 border shadow " style={{borderRadius:"10px"}}>
                
            <img src={Logo} className="col-7" alt="logo"/>
            <p  className=" text-center col-12 text-dark mb-4 ">Forgot Password</p>
            
            <LocalForm onSubmit={(values)=>{Post(values.email);}}>
                <Row className="form-group">
                    {/* <Label className="d-none d-md-block" md={3}>Username</Label> */}
                    <Col md={12}>
                        <Control.text model=".email" className="form-control" placeholder="Email" validators={{isValidEmail}}/>
                        <Errors className="text-danger text-left"
                                    model=".email"
                                    show="touched"
                                    messages={{isValidEmail:
                                        <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                                            <i className="fa fa-question-circle m-auto"></i>
                                            <span className="col-10 m-0"><small>Please enter a valid email address</small></span>
                                        </div> 
                                }}/>
                    </Col>
                </Row>
                <Row className="form-group justify-content-center">
                    <Col md={12}>
                        <Button  type="submit" className="mt-4 rounded-pill btn btn-block text-light background" style={{borderColor:"transparent"}}>Submit</Button>
                    </Col>
                    <Col md={12} className="mt-5">
                        Back to <Link to="/login" className="text-info ">Login</Link>
                    </Col>                    
                </Row>
            </LocalForm>
                
        </div>
    );
}

const ResetPassword = (props)=>{
    return(
        <div className="" style={{height:"95vh"}}>
            <div className="col-12 mb-5 background" style={{height:"50px"}}></div>
            <div className="col-4 mt-5 mx-auto animated backInUp">

                <Form Post={props.Post}/>
            </div>
        </div>
    );
}

export default ResetPassword;