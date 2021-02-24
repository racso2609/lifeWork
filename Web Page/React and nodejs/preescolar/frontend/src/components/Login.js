import React from 'react';
import {LocalForm, Control, Errors} from "react-redux-form";
import {Row, Col,Label,Button} from "reactstrap";
import {Link} from "react-router-dom"


const Form = ({Post})=>{
    return(
        <div className="col-12">
            <h2  className=" text-left col-12 text-primary ">Login</h2>
            <hr/>
            <LocalForm onSubmit={(values)=>{Post(values.username,values.password);}}>
                <Row className="form-group">
                    {/* <Label html="Username" className="d-none d-md-block" md={3}>Username</Label> */}
                    <Col md={12}>
                        <Control.text model=".username" className="form-control" placeholder="Username"/>
                    </Col>
                </Row>
                <Row className="form-group ">
                    {/* <Label html="Username" className="d-none d-md-block" md={3}>Password</Label> */}
                    <Col  md={12}>
                        <Control.password model=".password" className="form-control" placeholder="Password"/>
                    </Col>
                </Row>
                <Row className="form-group justify-content-center">
                    <Col md={6}>
                        <Button color="primary" type="submit"  size="block">Submit</Button>
                    </Col>
                    <Col md={6}>
                        <Link to="/signup" className="mt-2 mt-md-0 btn btn-block btn-danger"> Sing Up</Link>
                    </Col>
                </Row>
            </LocalForm>
                
        </div>
    );
}

const Login = (props)=>{
    return(
        <div className="container  ">
            <div className="row col-12 col-md-6 rounded border mx-auto p-5">

                <Form Post={props.Post}/>
            
            </div>
        </div>
    );
}

export default Login;