import React, {useState} from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Label, Col, CardBody} from 'reactstrap'
import { Card, CardImg, CardTitle, Button } from 'reactstrap'
import {LocalForm, Control, Errors} from "react-redux-form"
import { Link } from 'react-router-dom'
import {required} from "../auth/validation"

const AddRaison = ({Post})=>{    
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);
    
    
    return (
        <div className=" col-12 mt-5" >
          <Button color="primary"  onClick={toggle} className=" btn-block">Add Reasons</Button>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Raison title</ModalHeader>
            <LocalForm onSubmit={(values)=> { toggle();Post(values.title, values.img, values.raison);}}>
                <ModalBody>
                    <Row className="form-group">
                        <Label html="title" md={2}>Title</Label>
                        <Col md={10}>
                            <Control.text model=".title" id="title" placeholder="Title" className="form-control" validators = {{required}} />
                            <Errors
                                className = "text-danger"
                                model = ".title"
                                show = "touched"
                                messages = {{
                                    required: "Is Required"
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label html="raison" md={2}>image</Label>
                        <Col md={10}>
                            <Control.file model=".img" id="img" className="form-control" validators={{required}} />
                            <Errors
                                className = "text-danger"
                                model = ".img"
                                show = "touched"
                                messages = {{
                                    required: "Is Required"
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label html="raison" md={12}>Rasion</Label>
                        <Col md={12}>
                            <Control.textarea model=".raison" row="10" id="raison" className="form-control" validators={{required}}/>
                            <Errors
                                className = "text-danger"
                                model = ".raison"
                                show = "touched"
                                messages = {{
                                    required: "Is Required"
                                }}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit"color="primary" >Send</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </LocalForm>
          </Modal>
        </div>
      );
}
const DeleteConfirmation = ({Delete, isLoading}) =>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return(

        <div className=" col-12 mt-2" >
            <Button color="danger"  onClick={toggle} className="btn-block">Delete All Reasons</Button>
            
            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Are you sure ?</ModalHeader>
            <ModalBody>
                <Button color="warning" onClick={Delete}>Confirm</Button>
            </ModalBody>
            </Modal>
        </div>
    );
}
const RenderRaison = ({raison})=>{
    
    return(
        
            <Card >
                <Link to={`/reasons/${raison._id}`} >
                    <CardImg  src={raison.img} alt={raison.img}/>
                    <CardBody>
                        <CardTitle>{raison.title}</CardTitle>
                    </CardBody>
                </Link>
            </Card>
        
    );
}

const Raison = (props)=>{
    
    const menu = props.raisons.raison.map((rai)=>{   
            return(
                <div key= {rai.id} className="col-9 col-md-3 m-3 ">
                    <RenderRaison raison ={rai}/>
                </div>
            );    
    });
    

        
            
    return(
            <div>
                <div className="container mb-5 ">

                    <div className="row col-12 animated bounce">
                        <AddRaison Post={props.postRaison} />
                        <DeleteConfirmation  Delete={props.deleteRaisons} isLoading = {props.raisons.isLoading}/>
                        
                    </div>
                    <hr/>
                    <div className="row justify-content-center animated backInRight delay-1s ">
                        {menu}
                    </div>
                </div>
            </div>
    );
}


export default Raison;