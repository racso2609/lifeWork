import React, {useState} from 'react'
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavbarText} from 'reactstrap'
import { NavLink } from 'react-router-dom'

const Icon = ({Username, rol})=>{
  if (Username) {
    return(
      <div>

          <i className="fa fa-user-circle"></i> {Username}
      </div>
      
    );
  }else{
    return(
      <div></div>
    );
  }
}

 const Navigation = (props)=> {
     
    const [isOpen,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);  

    return (
        
        <div>
        <Navbar color="primary" dark expand="md" className=" p-3">
          <NavbarBrand to="">PELEB</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/reasons">Reasons</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Icon Username={props.user} rol = {props.Rol}/>
            </NavbarText>
          </Collapse>
        </Navbar>

      </div>
    )
}

export default Navigation;