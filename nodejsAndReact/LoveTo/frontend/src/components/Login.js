import React from 'react';
import {LocalForm, Control, Errors} from "react-redux-form";
import {Row, Col,Button} from "reactstrap";
import {Link} from "react-router-dom"

import {isValidEmail, isValidPassword} from "./auth/validation"

//icons
import Logo from "../img/login/Screenshot_1.png";

const ErrMess = ({errMess})=>{
    if(errMess){
        return(
            <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                <i className="fa fa-question-circle m-auto"></i>
                <span className="col-10 m-0"><small>{errMess}</small></span>
            </div>

        );

    }else{
        return(
            <div></div>
        );
    }
}

const Form = ({Post})=>{
    return(
        
        <div className="pt-4 pb-4 pl-5 pr-5 border shadow " style={{borderRadius:"10px"}}>
                
            <img src={Logo} alt="logo"/>
            <p  className=" text-center col-12 text-dark ">Login</p>
            <hr/>
            <LocalForm onSubmit={(values)=>{Post(values.email,values.password);}}>
                <Row className="form-group">
                    <Col lg={12}>
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
                <Row className="form-group ">
                    <Col  lg={12}>
                        <Control.password model=".password" className="form-control" placeholder="Password" validators={{isValidPassword}}/>
                        <Errors className="text-danger text-left"
                                    model=".password"
                                    show="touched"
                                    messages={{isValidPassword:
                                        <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                                        <i className="fa fa-question-circle m-auto"></i>
                                        <span className="col-10 m-0"><small>Please enter a password with at least eight characters, at least one letter, one number and one special characte</small></span>
                                    </div> 
                                }}/>
                    </Col>
                </Row>
                <Row className="form-group justify-content-center">
                    <Col lg={12}>
                         
                            <Button  type="submit" className="mt-4 rounded-pill btn btn-block text-light background" style={{borderColor:"transparent"}}>Submit</Button>
                        
                        
                    </Col>
                    <Col lg={12} className="mt-5">
                        <Link to="/reset-password" className="text-info ">Forgot Password</Link>
                    </Col>                    
                </Row>
            </LocalForm>
                
        </div>
    );
}
const Login = (props)=>{
    return(
        <div className="row ">

            <div className="col-12 col-lg-6 image-login animated backInRight"  >
                
                <div className="row justify-content-center text-light " style={{background: "#000000" ,opacity:0.8, height:"100vh"}}>
                    <div className="m-auto" style={{opacity:1}}>
                        <h1 >Hey there</h1>
                        <span >Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                            <br/> mod tincidunt ut laoreet dolore magna aliquam</span>
                        
                            <Link to="/Coorp-signup"  className="mt-5 rounded-pill  btn btn-block  text-light background" > Sing Up</Link>

                    </div>
                </div>
            </div>

            <div className=" row col-12 col-lg-6 mt-lg-0 mt-5 animated backInLeft">
                <div className="col-8 m-auto justify-content-center">

                    <Form Post={props.Post}/>
                    <ErrMess errMess={props.errMess}/>

                   
                </div>
                <div className="m-auto"  >
                        <Link to="mailto: support@loveto.global" className="text-muted p-4  " >Help</Link>
                        <Link className="text-muted p-4  " >Terms & Conditions</Link>
                        <Link className="text-muted p-4  " >Privacy</Link>
                </div>
            </div>
        </div>
    
    );
}



export default Login;
