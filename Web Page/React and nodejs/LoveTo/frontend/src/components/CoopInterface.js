import React, { useState } from 'react'

import Farmers from "./Farmers";
import Walkers from './Walker';


import { Control, LocalForm } from 'react-redux-form';
import { Button, Col, Collapse,  Modal, ModalBody,  Nav, Navbar, NavbarToggler, NavItem, Row } from 'reactstrap';
import ReactExport from "react-export-excel"
import XLSX from "xlsx"
//icons
import Pencil from "../img/icons/LoveTo-[Recuperado]-46.png";
import Logo from "../img/login/Screenshot_1.png";
import CoopManagment from '../img/icons/LoveTo-[Recuperado]-41.png';
import User from "../img/icons/iconos-loveto-42.png"
import Logout from "../img/icons/iconos-loveto-43.png"
import WalkerManagment from '../img/icons/LoveTo-[Recuperado]-43.png';
import FarmerManagment from '../img/icons/LoveTo-[Recuperado]-42.png';
import ChangePass from '../img/icons/iconos-loveto-41.png';
import Check from "../img/icons/LoveTo-[Recuperado]-33.png";




const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ExcelFile.ExcelSheet;
const ExcelColumn = ExcelFile.ExcelColumn;

//Farmer
const ExcelDowloadFarmers = ({Farmers})=>{
    return(
        <div>
            <ExcelFile element={
                <Button  className="btn btn-block p-1 rounded-pill" style={{background: "#034efc",border:"none"}}> <small>Download excel template submit</small> </Button>
            }>
                <ExcelSheet data={Farmers} name="Farmers">
                    <ExcelColumn label="Farmer Number" value="farmerNumber" />
                    <ExcelColumn label="Farmer Name" value="farmerNumber" />
                    <ExcelColumn label="Address" value="Address" />
                    <ExcelColumn label="Sqm2" value="sqm2" />
                    <ExcelColumn label="Coop Name" value="CoopName" />
                    <ExcelColumn label="Banned" value="Banned" />
                </ExcelSheet>
            </ExcelFile>
        </div>    
    );
}
const UploadExcel =(excel,PostFarmers)=>{
    let hojas = [];
        let reader = new FileReader();
        reader.readAsArrayBuffer(excel[0]);
        reader.onloadend = (element) =>{
            var data = new Uint8Array(element.target.result);
            var workbook = XLSX.read(data,{type: "array"});

            workbook.SheetNames.forEach((sheetName)=>{

                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                hojas.push({
                    data: XL_row_object,
                    sheetName
                }); 
            })
            PostFarmers(hojas[0].data);
        }
}
const RegisterFarmers = ({PostFarmers,Farmers})=>{
    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>setIsOpen(!isOpen);

    return(
        <div className="shadow border col-12 px-5 py-4 animated backInLeft" style={{borderRadius:"10px"}}>
            <div className="col-12 text-left">

                <div className="h5 col-11 text-left"><strong>Register Farmers</strong></div>
                <hr />
            </div>
                <div className="row mb-4 text-left"> 
                    <div className="col-3 h6 " ><strong>Farmer Number</strong></div>
                    <div className="col-3 h6 " ><strong>Farmer Name</strong></div>
                    <div className="col-3  h6 " ><strong>Address</strong></div>
                    <div className="col-3 h6 " ><strong>Sqm2</strong></div>
                </div>
            
            <LocalForm className="mt-2 " onSubmit={(values)=>{
                const farmers = [];
                if (values.name) {
                    let farmer = {farmer:{farmerNumber:values.number,Name:values.name,Address:values.address,sqm2: values.sqm2,Banned:false}};
                    farmers.push(farmer);
                }
                if (values.name2) {
                    let farmer = {farmer:{farmerNumber:values.number2,Name:values.name2,Address:values.address2,sqm2: values.sqm23,Banned:false}};
                    farmers.push(farmer);
                }
                if (values.name3) {
                  let farmer = {farmer:{farmerNumber:values.number3,Name:values.name3,Address:values.address3,sqm2: values.sqm23,Banned:false}};  
		    farmers.push(farmer);
                }
                PostFarmers(farmers)
                }}>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".number" placeholder="Farmer number"  className="form-control" />
                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".name" placeholder="Farmer Name" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".address" placeholder="Farmer Address" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".sqm2" placeholder="Sqm2" className="form-control" />

                    </Col>
                
                </Row>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".number2" placeholder="Farmer number"  className="form-control" />
                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".name2" placeholder="Farmer Name" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".address2" placeholder="Farmer Address" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".sqm22" placeholder="Sqm2" className="form-control" />

                    </Col>
                
                </Row>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".number3" placeholder="Farmer number"  className="form-control" />
                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".name3" placeholder="Farmer Name" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".address3" placeholder="Farmer Address" className="form-control" />

                    </Col>
                    <Col md={3} className="mb-2">
                        <Control.text model=".sqm23" placeholder="Sqm2" className="form-control" />

                    </Col>
                
                </Row>
                <div className="row mt-5 justify-content-between">
                        <div className="row col-10 justify-content-start">
                            <div className="text-center col-md-3  ">
                                <Button type="submit" className=" btn  btn-block rounded-pill" color="primary" > <small> Add more farmers </small> </Button>

                            </div>
                            <div className="text-center col-md-4 ">
                                <Button onClick={()=>toggle()} className="btn btn-block  rounded-pill" style={{background: "#033efc",border:"none"}}> <small>Upload in bulk via excel template</small> </Button>
                                <Modal isOpen={isOpen} style={{marginTop:"220px"}} >
                                <div className="col-12 mt-2 text-right text-muted">
                                    <div onClick={()=>toggle()}>X</div>
                                </div>
                                    <ModalBody className="p-5">
                                        <LocalForm onSubmit={(values)=>{
                                            UploadExcel(values.excel,PostFarmers);
                                            
                                            
                                            
                                            }}>
                                            <Row className="form-group">
                                                <Col md={12}>
                                                    <Control.file model=".excel" className="form-control"/> 
                                                </Col>
                                                <Col md={12}>
                                                    <Button type="submit" color="primary" block>Send</Button>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                        
                                        
                                    </ModalBody>
                                </Modal>

                            </div>

                            <div className="text-center col-md-4 ">
                                <ExcelDowloadFarmers Farmers={Farmers}/>
                            </div>
                        </div>
                    

                    <div  className="text-center col-md-2 float-right">
                        <Button type="submit" className="btn p-1 btn-block rounded-pill background"> <small>Submit</small> </Button>
                    </div>
                </div>
            </LocalForm>
        </div>
    )
}
//Walkers
const RegisterWalkers = ({PostWalkers})=>{
    return(
        <div className="shadow border col-12 px-5 py-4 animated backInLeft" style={{borderRadius:"10px"}}>
            <div className="col-12 text-left">

                <div className="h5 col-11"><strong>Register a Walker</strong></div>
                <hr />
            </div>
                <div className="row mb-4 text-left"> 
                    <div className="col-3 h6" ><strong>Walker name</strong></div>
                    <div className="col-4 h6" ><strong>Walker Login</strong></div>
                    <div className="col-4 h6" ><strong>Walker Password</strong></div>
                    <div className="col-1 h6" ><strong>Active</strong></div>
                </div>
                <div className="col-12 align-center"></div>
            
            <LocalForm className="mt-2 " onSubmit={(values)=>{
                const walkers = [];
                if (values.name) {
                  let walker = {walker:{Name:values.name,Email:values.mail,Password: values.password,Banned:values.active}};
                    walkers.push(walker);
                }
                if (values.name2) {
                    let walker = {walker:{Name:values.name2,Email:values.mail2,Password: values.password2,Banned:values.active2}};
                    walkers.push(walker);
                }
                if (values.name3) {
		  let walker = {walker:{Name:values.name3,Email:values.mail3,Password: values.password3,Banned:values.active3}};
                    walkers.push(walker);
                }
                PostWalkers(walkers);
                }}>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".name" placeholder="Walker name"  className="form-control" />
                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.text model=".mail" placeholder="Walker Login" className="form-control" />

                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.password model=".password" placeholder="Walker Password" className="form-control" />

                    </Col>
                    <Col md={1} className="mb-2">
                        <div >
                            <label class="switch ">
                                <Control.checkbox model=".active" />
                                <div class="slider round"></div>
                            </label>
                        </div>

                    </Col>
                
                </Row>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".name2" placeholder="Walker name"  className="form-control" />
                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.text model=".mail2" placeholder="Walker Login" className="form-control" />

                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.password model=".password2" placeholder="Walker Password" className="form-control" />

                    </Col>
                    <Col md={1} className="mb-2">
                        <div >
                            <label class="switch ">
                                <Control.checkbox model=".active2" />
                                <div class="slider round"></div>
                            </label>
                        </div>

                    </Col>
                
                </Row>
                <Row className="form-group">
                    <Col md={3} className="mb-2">
                        <Control.text model=".name3" placeholder="Walker name"  className="form-control" />
                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.text model=".mail3" placeholder="Walker Login" className="form-control" />

                    </Col>
                    <Col md={4} className="mb-2">
                        <Control.password model=".password3" placeholder="Walker Password" className="form-control" />

                    </Col>
                    <Col md={1} className="mb-2">
                        <div >
                            <label class="switch ">
                                <Control.checkbox model=".active3" />
                                <div class="slider round"></div>
                            </label>
                        </div>

                    </Col>
                
                </Row>
                
                <div className="row mt-5 justify-content-between">
                        
                    <div className="text-center col-md-3  mb-3">
                        <Button type="submit" className=" btn  btn-block rounded-pill" color="primary" > <small> Add more walkers </small> </Button>

                    </div>
                    <div  className="text-center col-md-2 float-right mb-3">
                        <Button type="submit" className="btn p-1 btn-block rounded-pill background"> <small>Submit</small> </Button>

                    </div>
                </div>
            </LocalForm>
        </div>
    )
}
//Menu
const Menu = ({selectItem,ResetPassword})=>{

    
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    
    
    return(
        <div className="border-right shadow text-muted">
                <Navbar expand="md" color="faded" light className="text-left"  >
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar style={{height:"100vh"}} className="align-items-start">
                        <Nav vertical navbar >
                            <NavItem className="mb-2 mx-auto" >
                                <img className="mx-auto mb-2" src={Logo}  alt="logo" style={{height:"140px", width:"200px"}} />
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(0)}>
                                    <img  style={{width:"20px",height:"20px"}}   alt="RegisterFarmers" src={CoopManagment}  ></img> 
                                    <span className="pl-2">Register Farmers</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(1)}>
                                    <img  style={{width:"20px",height:"20px"}}   alt="RegisterWalkers" src={CoopManagment}  ></img> 
                                    <span className="pl-2">Register Walkers</span>
                                    <hr className="d-md-none d-block"/>
                            </NavItem>
                            <NavItem className="mb-2 " onClick={()=>selectItem(2)}>
                                    <img  style={{width:"20px",height:"20px"}}   alt="FarmerManagement" src={FarmerManagment}  ></img> 
                                    <span className="pl-2">Farmers Management</span>>
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
const SelectMenu = ({Farmer,Walker,Pag,maxElement,Put,item, PostFarmers,PostWalkers,Profile,UpdateProfile,ResetPassword})=>{
   
    if (item === 0) {
        return(
            <RegisterFarmers Farmers={Farmer} PostFarmers={PostFarmers}/>
        );
    }else if(item === 1){
        return(
            <RegisterWalkers Walkers={Walker} PostWalkers={PostWalkers} />
            
        );
    }else if(item === 2) {
        return(
            <Farmers Farmers={Farmer} Pag={Pag} maxElement={maxElement} Put={Put} />

        );
    }else if (item === 3){
        return(
            <Walkers Walkers={Walker} Pag={Pag} maxElement={maxElement} Put={Put} />

        );
    }else if (item === 4) {
        return(
            <ProfileComponent ResetPassword={ResetPassword} UpdateProfile={UpdateProfile} Profile={Profile}/>
        );
    }
}
//Profile
const ProfileHeader = ({Edit,setDisable,setEdit})=>{
    return(
        <div className="row col-12 mb-0 pb-0 justify-content-between">

            <div className="col-3 row">
                <p className="text-left h5  my-auto ml-2"><strong>Profile</strong></p>
                {Edit}
                
            </div>
           <div className="col-4 row justify-content-end" onClick={()=>{setDisable(false); setEdit(
            <div className="row ml-2 my-auto">
                <i className="fa fa-chevron-right mx-2 my-auto"></i>
                <p className="text-left h6 my-auto">Edit</p>
            </div>
           )}}>
                <i className="col-1 px-0" ><img src={Pencil} alt="Pencil" className="img-thumbnail border-0 " /></i>
                <p className="text-left h6 my-auto px-1" style={{color: "rgb(5, 177, 168)"}}>Edit Profile</p>
           </div>
              
        </div>
    );

}
const ProfileButton = ({Disable, setDisable,setEdit})=>{
    if (Disable) {
        return(
            <div></div>
        );
    }else{
        return(
            <Row className="form-group mt-5">
                <Col md={6}>
                    <Button color="primary btn px-3 float-right" onClick={()=>{setEdit(""); setDisable(true)}} style={{width: "87px", height:"37px"}}>Cancel</Button>
                </Col>
                <Col md={6}>
                    <Button type="submit" className="background btn px-3 float-left " style={{width: "87px", height:"37px"}}>Save</Button>
                </Col>
            </Row>
        );
    }
}
const ProfileComponent = ({Profile,UpdateProfile,ResetPassword})=>{
    const [Disable,setDisable] = useState(true);
    const [Edit,setEdit] = useState(<div></div>);
    const [Err,setErr] = useState(<div></div>) 

    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>setIsOpen(!isOpen);

    const [Succesfully,setSuccesfully] = useState(false);
    const toggleSucces = ()=>setSuccesfully(!Succesfully);

    return(
        <div className="shadow border col-11 px-5 pb-2 pt-4 animated backInUp " style={{borderRadius: "10px"}}>
            <ProfileHeader Edit={Edit} setDisable={setDisable} setEdit={setEdit} />
            <hr className="p-0 mt-2"/>
            <div>
                <LocalForm onSubmit={(values)=>{
                    var coop = {Firstname: values.Firstname, Lastname: values.Lastname, Address: values.Address, PostCode: values.PostCode,Suburb: values.Suburb, State: values.State, Phone: values.Phone}

                    UpdateProfile(coop);
                }}>

                    <Row className="form-group">
                        <Col md={6}>
                            <Control.text model=".Firstname" disabled={Disable} placeholder={Profile.Firstname} className="form-control"/>
                        </Col>
                        <Col md={6}>
                            <Control.text model=".Lastname"disabled={Disable} placeholder={Profile.Lastname} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <Control.text model=".Address"disabled={Disable} placeholder={Profile.Address} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={4}>
                            <Control.text model=".Postcode" disabled={Disable} placeholder={Profile.PostCode} className="form-control"/>                            
                        </Col>
                        <Col md={4}>
                            <Control.text model=".Suburb" disabled={Disable} placeholder={Profile.Suburb} className="form-control"/>                            
                        </Col>
                        <Col md={4}>
                            <Control.text model=".State" disabled={Disable} placeholder={Profile.State} className="form-control"/>                            
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={6}>
                            <Control.text model=".Phone" disabled={Disable} placeholder={Profile.Phone} className="form-control"/>                            
                        </Col>
                        <Col md={6}>
                            <Control.password model=".Password" disabled={Disable} placeholder="**********" className="form-control"/>                            
                        </Col>
                        <Col md={12} className="mt-2" onClick={toggle}>
                            <div className="row col-12 justify-content-end">
                                <i className="col-1 p-0 text-right">
                                    <img src={ChangePass} alt="change" className="img-thumbnail border-0 col-7" />
                                </i>
                                    <span className="text-left" style={{color:"rgb(5, 177, 168)"}} >change Password</span>
                                
                            </div>
                        </Col>
                        
                    </Row>
                    <ProfileButton Disable={Disable} setDisable={setDisable} setEdit={setEdit}/>
                    
                </LocalForm >

                {/* modal changePass */}
                    <Modal isOpen={isOpen} toggle={toggle} style={{top: "20%",borderRadius:"20px"}}>
                        <ModalBody className="py-2 col-10 m-auto" >
                            <div className="col-12 text-center mt-5">
                                <span className="h6"> <strong>Change Password</strong></span>
                            </div>
                            <LocalForm className="my-5" onSubmit={(values)=>{
                                if (values.password === values.confirm) {
                                    ResetPassword(values.password,Profile._id);
                                    
                                    toggleSucces();
                                }else{
                                    setErr(<div className="text-danger mb-2 text-center"><span>Password don't match</span></div>)
                                }
                                
                            }}>
                                <Row className="form-group justify-content-center">
                                    <Col md={12}>
                                        <Control.password model=".password" placeholder="Password" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group justify-content-center">
                                    <Col md={12}>
                                        <Control.password model=".confirm" placeholder="Change Password" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group justify-content-center ">
                                    <Col md={12} className="mt-3">
                                        <Button type="submit"  block className="background rounded-pill">Change Password</Button>
                                    </Col>
                                    <Col md={12} className="p-2">
                                        {Err}
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                        <Modal isOpen={Succesfully} style={{marginTop:"220px"}} >
                            <div className="col-12 mt-2 text-right text-muted">
                                <div onClick={()=>toggleSucces()}>X</div>
                                
                            </div>
                            <ModalBody className="p-5">
                                <div className="row ">
                                    <img src={Check} alt="" className="col-3 m-auto"/>
                                    <span className=" col-12 text-center m-auto">Password has been changed successfully</span> 
                                </div>
                                
                            </ModalBody>
                        </Modal>
                    </Modal>
                {/*modal succes  */}
                    
                
            </div>
        </div>
    );

}
//Interface
const InterfaceCoop = (props)=>{
    var [item,selectItem] = useState(0);

        return(
            <div>
                 <div className="row background justify-content-end p-3 text-white" >
                    
                    
                    <div className="row mr-3 col-2 col-md-1 " onClick={()=>selectItem(4)}>
                        <i className="col-3 p-0 mr-2 "><img src={User} className="img-thumbnail border-0 background" alt="User"/></i>
                        <spam>Profile</spam>
                    </div>
                    <div className="row mr-3 col-md-1 col-2" onClick={()=>props.Logout()}>
                        
                        <i className="col-3 p-0 mr-2 "><img src={Logout} className="img-thumbnail border-0 background" alt="User"/></i>
                        <spam>Log out</spam>
                        
                    </div>
                </div>
            
                
            
                <div className="row"  >
                        <div className="col-md-2 col-12 animated backInRight">
                                    <Menu selectItem={selectItem} />
                        </div>
                    
                    <div className="col-md-10 col-12 animated backInLeft">                
                        <div className="col-md-11 col-11 mx-auto mt-5 ">
                            <SelectMenu ResetPassword={props.ResetPassword} UpdateProfile={props.UpdateProfile} Profile={props.Profile} Walker={props.Walkers} Coop={props.Coops} Farmer={props.Farmers} Pag={props.Pag} maxElement={props.maxElement} Put={props.Put} item={item} PostFarmers={props.PostFarmers} PostWalkers={props.PostWalker}/>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default InterfaceCoop;
