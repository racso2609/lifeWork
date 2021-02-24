import React, { Component } from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Axios from "axios"

import Login from "./Login";
import Nav from "./Navbar"
import Footer from "./Footer"
import { Url } from './shared/DbUrl';

var payload = {token: null,errMess: null,username: null, rol: null} 

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: payload.username,
            rol: payload.rol
        }
    }
 
    render(){

        const loginPost = async(username,password)=>{
            const data = {username:username, password: password}
    
            try {
                const res = await Axios.post(Url + "api/user/login", data );
                payload.token = res.data.token;
                payload.username = username;
                payload.errMess = null; 
                payload.rol = res.data.rol;
            } catch (error) {
                payload.errMess = error.message;

            }
            this.setState({username: payload.username, rol: payload.rol})
            

        }
        const LoginPage = ()=>{
            return(
                <div>

                    <Login Post={loginPost}/>
                </div>
                    
                
            );
        }
        const HomePage = ()=>{
            return(
                <div> </div>
            );
        }
        return(
         <div>
             <Nav user = {this.state.username} Rol ={this.state.rol}/>
             <div className="content pt-5">

                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/home" component={HomePage}/>

                    <Redirect to="/login"/>
                </Switch>
             </div>
             <Footer/>
         </div>
        );
    }

    
}

export default Main;