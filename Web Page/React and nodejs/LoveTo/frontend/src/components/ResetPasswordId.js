import React, {useState} from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Button, Col, Modal, ModalBody, Row } from 'reactstrap';

import {isValidPassword, required} from "./auth/validation";

//icons
import Logo from "../img/login/Screenshot_1.png";
import Check from "../img/icons/LoveTo-[Recuperado]-33.png";



const MessageMatch = ({Matched})=>{
    if (Matched) {
        return(

            <div></div>
        )
    }else{
        return(

            <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                <i className="fa fa-question-circle m-auto"></i>
                <span className="col-10 m-0"><small>not matched</small></span>
            </div>

        )
    }
}




const Form = ({Put,Id})=>{

    //confirm password
    const [matched, setIsOpen] = useState(true);
    const togglePass = () => setIsOpen(false) 
    const togglePass2 = () => setIsOpen(true);

    const confirmPassword=(val)=>{
        if (val.password === val.confirmPassword) {
            togglePass2();
        }else{
            togglePass();
        }
    }
    //modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    return(
        
        <div className="pt-3 pb-3 pl-5 pr-5 border shadow " style={{borderRadius:"10px"}}>
                
            <img src={Logo} className="col-7" alt="logo"/>
            <p  className=" text-center col-12 text-dark mb-4 ">Forgot Password</p>
            
            <LocalForm model=".form" onChange={(values)=>  confirmPassword(values)} 
            onSubmit={
                async(values)=>{
                    if (matched){

                        Put(values.password,Id); 
                        toggleModal();

                    }
                    
                }}>



                <Row className="form-group">
                    {/* <Label html="Username" className="d-none d-md-block" md={3}>Username</Label> */}
                    <Col md={12}>
                        <Control.password model=".password" className="form-control" placeholder="Password" validators={{isValidPassword}}/>
                        
                    </Col>
                </Row>
                <Row className="form-group">
                    {/* <Label html="Username" className="d-none d-md-block" md={3}>Username</Label> */}
                    <Col md={12}>
                        <Control.password model=".confirmPassword"  className="form-control" placeholder="Confirm Password" validators={{required}}/>
                        <Errors className="text-danger text-left"
                                    model=".password"
                                    show="touched"
                                    messages={{isValidPassword:
                                        <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                                        <i className="fa fa-question-circle m-auto"></i>
                                        <span className="col-10 m-0"><small>Please enter a password with at least eight characters, at least one letter, one number and one special characte</small></span>
                                    </div>
                                    }}/>
                        <Errors className="text-danger text-left"
                                    model=".confirmPassword"
                                    show="touched"
                                    messages={{required:
                                    <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                                        <i className="fa fa-question-circle m-auto"></i>
                                        <span className="col-10 m-0"><small>Confirm Password Required</small></span>
                                    </div> 
                            }}/>
                        <MessageMatch Matched={matched}/>
                    </Col>
                </Row>
                <Row className="form-group justify-content-center">
                    <Col md={12}>
                        <Button type="submit" className="mt-4 rounded-pill btn btn-block text-light background" style={{borderColor:"transparent"}}>Submit</Button>

                    </Col>
                    <Col md={12} className="mt-5">
                        Back to <Link to="/login" className="text-info ">Login</Link>
                    </Col>                    
                </Row>
            </LocalForm>
            

                <Modal isOpen={modal} style={{marginTop:"220px"}} >
                    <div className="col-12 mt-2 text-right text-muted animated backInUp">
                        <Link to="/login">X</Link>
                        
                    </div>
                    <ModalBody className="p-5">
                        <div className="row">

                        </div>
                        <div className="row ">
                            <img src={Check} alt="" className="col-3 m-auto"/>
                            <span className=" col-12 text-center m-auto">Password has been changed successfully</span> 
                        </div>
                        
                    </ModalBody>
                </Modal>
            
                
        </div>
    );
}

const ResetPasswordId = (props)=>{
    return(
        <div className="" style={{height:"95vh"}}>
            <div className="col-12 mb-5 background" style={{height:"50px"}}></div>
            <div className="col-4 mt-5 mx-auto animated backInUp">

                <Form Put={props.Put} Id={props.Id}/>
            </div>
        </div>
    );
}

export default ResetPasswordId;