import React, { useState } from 'react'
import Coops from './Coops';
import Farmers from "./Farmers";
import Walkers from './Walker';


import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Col, Collapse, Nav, Navbar, NavbarToggler, NavItem, Row } from 'reactstrap';
import { required, isValidEmail,character } from './auth/validation';
//icons
import Logo from "../img/login/Screenshot_1.png";
import Invitation from '../img/icons/LoveTo-[Recuperado]-44.png';
import CoopManagment from '../img/icons/LoveTo-[Recuperado]-41.png';
import WalkerManagment from '../img/icons/LoveTo-[Recuperado]-43.png';
import FarmerManagment from '../img/icons/LoveTo-[Recuperado]-42.png';
import Logout from "../img/icons/iconos-loveto-43.png"

const Menu = ({selectItem})=>{

    
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    
    
    return(
        <div className="border-right shadow">
                <Navbar expand="md" color="faded" light className="text-left"  >
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar style={{height:"100vh"}} className="align-items-start">
                        <Nav vertical navbar >
                            <NavItem className="mb-2 mx-auto" >
                                <img className="mx-auto mb-2" src={Logo} alt="logo" style={{height: "140px", width:"200px"}} />
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(0)}>
                                    <img  style={{width:"20px",height:"20px"}} alt="CoopInvitation" src={Invitation}  ></img> 
                                    <span className="pl-2">Coop Invitation</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(1)}>
                                    <img  style={{width:"20px",height:"20px"}} alt="CoopManagement" src={CoopManagment}  ></img> 
                                    <span className="pl-2">Coop Management</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(2)}>
                                    <img  style={{width:"20px",height:"20px"}} alt="FarmerManagement" src={FarmerManagment}  ></img> 
                                    <span className="pl-2">Farmers Management</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                            <NavItem className="mb-2 "onClick={()=>selectItem(3)}>
                                    <img  style={{width:"20px",height:"20px"}} alt="WalkerManagement" src={WalkerManagment}  ></img> 
                                    <span className="pl-2">Walkers Management</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                        </Nav>
                    
                    </Collapse>
                </Navbar>
        </div>      
        
                
    )
}
const SelectMenu = ({Farmer,Walker,Coop,Pag,maxElement,Put,item, Invite})=>{
   
    if (item === 0) {
        return(
            <CoopInvitation Invite={Invite}/>
        )
    }else if (item === 1) {
        return(
            <Coops Coops={Coop} Pag={Pag} maxElement={maxElement} Put={Put} />
        )
        
    }else if(item === 2) {
        return(
            <Farmers Farmers={Farmer} Pag={Pag} maxElement={maxElement} Put={Put} />

        )
    }else if (item === 3) {
        return(
            <Walkers Walkers={Walker} Pag={Pag} maxElement={maxElement} Put={Put} />

        )
    }
}

const CoopInvitation = ({Invite})=>{
    return(
        <div className="shadow border rounded p-5">
            <div className="col-12 text-left">

                <span>Coop Invitation</span>
                <hr />
            </div>
            
            <LocalForm className="mt-2" onSubmit={(values)=>{Invite(values.coopname,values.contactPerson,values.mail)}}>
                <Row className="form-group">
                    <Col md={4}>
                        <Control.text model=".coopname" placeholder="Coop Name"  className="form-control" validators={{required,character}} />
                        <Errors className="text-danger text-left"
                                    model=".coopname"
                                    show="touched"
                                    messages={{required:"Email Required",character:"Limit character is 128" }}/>
                    </Col>
                    <Col md={4}>
                        <Control.text model=".contactPerson" placeholder="Contact Person" className="form-control" validators={{required,character}}/>
                        <Errors className="text-danger text-left"
                                    model=".contactPerson"
                                    show="touched"
                                    messages={{required:"Coop Name Required",character:"Limit character is 128" }}/>

                    </Col>
                    <Col md={4}>
                        <Control.text model=".mail" placeholder="Email Address" className="form-control" validators={{isValidEmail}} />
                        <Errors className="text-danger text-left"
                                    model=".mail"
                                    show="touched"
                                    messages={{isValidEmail:"Please insert a valid email address" }}/>

                    </Col>
                </Row>
                <div className="col-12">

                    <Button type="submit" className="rounded-pill px-5 float-right" >Send</Button>
                </div>
            </LocalForm>
        </div>
    )
}

const AdminInterface = (props)=>{
    var [item,selectItem] = useState(0);
    if (props.Login) {
        return(
            <div>
            <div className="row background justify-content-end p-3 text-white" >
                    <div className="row mr-3 col-1 " onClick={()=>props.Logout()}>
                        
                        <i className="col-3 p-0 mr-2 "><img src={Logout} className="img-thumbnail border-0 background" alt="User"/></i>
                        <spam>Log out</spam>
                        
                    </div>
                </div>
            <div className="row"  style={{height:"92vh"}}>
                <div className="col-2  text-left animated backInRight">
                    
                   <Menu selectItem={selectItem}/>
                </div>
                <div className="col-10">
                    
                    <div className="col-10 m-auto p-5 animated backInLeft">

                        <SelectMenu Walker={props.Walkers} Coop={props.Coops} Farmer={props.Farmers} Pag={props.Pag} maxElement={props.maxElement} Put={props.Put} item={item} Invite={props.Invite}/>

                    </div>
            </div>
                    
                </div>
    
            </div>
        );
    }else{
        return(
            <div>Login First</div>
        )
    }
}

export default AdminInterface;