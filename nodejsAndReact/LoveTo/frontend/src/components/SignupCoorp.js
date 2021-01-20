import React, {useState} from 'react';
import {LocalForm, Control, Errors} from "react-redux-form";
import {Row,Col, Button,Collapse, Label} from 'reactstrap';
import { character, required,isValidEmail, isValidPassword } from './auth/validation';



//icons 
import Logo from "../img/login/Screenshot_1.png";

const Steps = ({Open,toggle})=>{
    
    if (Open) {
        return(
            <div className="row col-10 m-4 mx-auto">
                <span className="border-0  col-6" onClick={toggle} style={{  color:"rgb(67, 208, 233)"}}>Step 1</span>
                <span className="border-0   col-6" onClick={toggle} style={{opacity: 0.3,}}>Step 2</span>
                <div className="col-6 rounded background" style={{ height:"4px"}}></div>
                <div className="col-6 bg-secondary rounded" style={{ opacity: 0.3, height:"4px"}}></div>

            </div>
        );
    }else{
        return(
            <div className="row col-10 m-4 mx-auto">
                <span className="border-0   col-6" onClick={toggle} style={{opacity: 0.3,}}>Step 1</span>
                <span className="border-0  col-6" onClick={toggle} style={{  color:"rgb(67, 208, 233)"}}>Step 2</span>
                <div className="col-6 bg-secondary rounded" style={{ opacity: 0.3, height:"4px"}}></div>
                <div className="col-6 rounded background" style={{ height:"4px"}}></div>
            </div>
        );
    }
}
const MessageMatch = ({Matched})=>{
    if (Matched) {
        return(

            <div></div>
        )
    }else{
        return(

            <div className="col-12 row border shadow mx-auto mt-2 text-left text-muted py-1 rounded">
                <i className="fa fa-question-circle col-1 m-auto p-1"></i>
                <span className="col-11"><small>Password don't match</small></span>
            </div>
        )
    }
}

const FirstStep =({toggle,Matched})=>{
    return(
        <div className="animated backInUp">
            <div className="pt-4 pb-5">
                    <span>Sign up</span>
            </div>
            <Row className="form-group">
                <Col md={6}>
                    <Control.text model=".firstname" placeholder="First Name" className="form-control" validators={{required,character}} />
                    <Errors className="text-danger text-left"
                        model=".firstname"
                        show="touched"
                        messages={{required:"Coop Name Required",character:"Limit character is 128" }}/>
                </Col>
                <Col md={6}>
                    <Control.text model=".lastname" placeholder="Last Name" className="form-control" validators={{required, character}} />
                    <Errors className="text-danger text-left"
                        model=".lastname"
                        show="touched"
                        messages={{required:"Coop Name Required",character:"Limit character is 128" }}/>
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={12}>
                    <Control.text model=".address" placeholder="Coop Address" className="form-control" />
                </Col>                    
            </Row>
            <Row className="form-group">
                <Col md={2}>
                    <Control.text model=".postcode" placeholder="Post Code" className="form-control" />
                </Col>
                <Col md={5}>
                    <Control.text model=".suburb" placeholder="Suburb" className="form-control" />
                </Col>
                <Col md={5}>
                    <Control.text model=".state" placeholder="State" className="form-control" />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={5}>
                    <Control.text model=".email" placeholder="Prefer Email" className="form-control" validators={{isValidEmail}} />
                    <Errors className="text-danger text-left"
                        model=".email"
                        show="touched"
                        messages={{isValidEmail:"Please insert a valid email address" }}/>

                </Col>
                <Col md={2} className="justify-content-start">
                    <i className="text-muted fa fa-question-circle mx-auto"></i>
                </Col>
                <Col md={5}>
                    <Control.text model=".phone" placeholder="Phone" className="form-control" />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={6}>
                    <Control.password model=".password" placeholder="Password" className="form-control" validators={{isValidPassword}}/>
                    
                            <Errors 
                                model=".password"
                                show="touched"
                                messages={{isValidPassword:
                                    <div className=" text-left text-muted col-12 border shadow mx-auto mt-2 py-1 rounded row ">
                                        <i className="fa fa-question-circle m-auto"></i>
                                        <span className="col-10 m-0"><small>Please enter a password with at least eight characters, at least one letter, one number and one special characte</small></span>
                                    </div>
                                }}/>
                        
                    
                </Col>
                <Col md={6}>
                    <Control.password model=".confirm" placeholder="Confirm Password" className="form-control" />
                    <MessageMatch Matched={Matched}/>

                </Col>
                
            </Row>
            <Row className="form-group">
                <Col md={12}>
                    <Button  onClick={()=>{toggle()}} className="float-right mt-2 pl-5 pr-5 rounded-pill background " style={{borderColor:"transparent"}} >Next</Button>
                </Col>    
                    
            </Row>
        </div>
    )
}
const SecondStep = ()=>{
    return(
        <div>
            <div className="pt-4 pb-3 animated backInUp">
                <p className="h5">Terms and Conditions</p >
            </div>
            <Row className="form-group">
                <Col md={12} >
                    <div className="Scroll">
                        <div className="Message">
                            <div className="Text text-muted text-justify p-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, eos. Ea omnis, reprehenderit voluptatum quibusdam provident ipsam? Consectetur, sit eos asperiores, modi rem similique aliquam a, ut ipsa adipisci odio!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officia earum quibusdam culpa illum rem, repudiandae perspiciatis distinctio id unde, eos consequuntur? Laborum vel blanditiis ullam tenetur dolor quia magnam?
                            </div>
                        </div>
                    </div>
                    
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={12}>
                    <Control.checkbox md={1} model=".agree" className="control-form"/>  
                    <Label  md={11} html="Username" className="text-left" >Users accepts that we can sign his with their ip address</Label>

                </Col>
            </Row>
            <Row className="form-group">
                <Col md={12}>
                    <Button  type="submit" className="float-right mt-2 pl-5 pr-5 rounded-pill " color="secondary" style={{borderColor:"transparent"}} >Sing Up</Button>
                </Col>
            </Row>  
        </div>
    )
}

const  Form = ({Post,CoopName})=>{
    const [matched, setIsMatched] = useState(true);
    const togglePass = () => setIsMatched(false);
    const togglePass2 = () => setIsMatched(true);

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {setIsOpen(!isOpen)};


    const confirmPassword=(val)=>{
        if (val.password === val.confirm || !val.confirm ) {
            
            togglePass2();
        }else{
            togglePass();
        }
    }
    return(
        <div>
            <div className="col-12">

                <Steps Open={isOpen} toggle={toggle}/>
            </div>
            
            <div className="col-12 m-auto border rounded-lg shadow-lg p-4 pt-3 ">
                
                <LocalForm onChange={(values)=>confirmPassword(values)} onSubmit={
                    (values)=>{
                        if (matched && values.agree) {
                            Post(values.firstname, values.lastname,values.address, values.postcode,values.suburb,values.state,values.email,values.phone,values.password,CoopName);
                        }
                        }} className="col-12">
                    <Collapse isOpen={isOpen}>
                        <FirstStep Matched={matched} toggle={toggle}/>
                    </Collapse>
                    <Collapse isOpen={!isOpen}>
                        
                        <SecondStep/>
                        
                    </Collapse>
                    
                </LocalForm>
            </div>


        </div>
    );
}

const Signupcoorp = (props) => {
    return(
        <div>
            <div className="row">
                <div className=" col-4 image-login animated backInRight" >
                    <div className="row "style={{height: "100vh",background:"black", opacity: 0.7}}>
                            
                    </div>
                </div>

                <div className="col-8 justify-content-center animated backInLeft">
                    <div className="row">
                        <div className=" col-12 ">
                            <img src={Logo} alt="LoveTo" className="float-right"/>
                        </div>
                    </div>
                    <div className=" row align-items-center" >
                        <div className="col-10 m-auto">

                           <Form Post={props.Post} CoopName={props.CoopName}/>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Signupcoorp;