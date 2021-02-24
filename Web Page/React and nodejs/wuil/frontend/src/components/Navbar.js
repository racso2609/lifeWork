import React, {useState} from 'react'
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavbarText} from 'reactstrap'
import { NavLink } from 'react-router-dom'


   



 const Navigation = ()=> {
     
    const [isOpen,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);  

    return (
        
        <div>
        <Navbar color="dark" dark expand="md" className="p-3">
          <NavbarBrand to="/home">Why I love U</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/razones">Reasons</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>To The Moon</NavbarText>
          </Collapse>
        </Navbar>

      </div>
    )
}

export default Navigation;