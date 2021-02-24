import React, { Component } from 'react';
import {Route, Redirect, Switch} from "react-router-dom";

import Axios from "axios"

import Signupcoorp from "./SignupCoorp"; 
import Login from "./Login";

import ResetPassword from './ResetPassword';
import Messages from './message';
import ResetPasswordId from './ResetPasswordId';
import LoginAdmin from './LoginAdmin';
import AdminInterface from './AdminInterface';
import InterfaceCoop from './CoopInterface';



class Main extends Component{
    constructor(props){ 
        super(props);
        this.state = {
            email: null,
            token: null,
            errMess: null,
            message: null,
            farmers:[],
            walkers:[],
            coops:[],
            profile: {},
            login:false
        }
    }
    
    

    render(){

// Post
    const loginPost = async(email,password)=>{
        const data = {Email:email, Password: password}

        try {
            const res = await Axios.post( "api/coorp/login", data );
            this.setState(res.data);
            
            if (res.data.token) {
                
                const res2 =  await Axios.get("api/coorp/farmers",{
                    headers:{
                        Authorization: "Bearer " + this.state.token
                    }
                });
                const res3 =  await Axios.get("api/coorp/walkers",{
                    headers:{
                        Authorization: "Bearer " + this.state.token
                    }
                });
                const res4 = await Axios.get("api/coorp/profile",{
                    headers:{ Authorization: "Bearer "+ this.state.token}
                });

                this.setState(res2.data);
                this.setState(res3.data);
                this.setState(res4.data);
                this.setState({login:true});
                
            }

        } catch (error) {
            this.setState({errMess: error.message});

        }

    }
    const loginAdminPost = async(email,password)=>{
        const data = {Email:email,Password:password};
        try {
            const res = await Axios.post("api/admin/login",data);
            this.setState(res.data);
            if (res.data.token) {            
                const res2 =  await Axios.get("api/coorp/farmers",{
                    headers:{
                        Authorization: "Bearer " + this.state.token
                    }
                });
                const res3 =  await Axios.get("api/coorp/walkers",{
                    headers:{
                        Authorization: "Bearer " + this.state.token
                    }
                });
                const res4 =  await Axios.get("api/admin/coorp",{
                    headers:{
                        Authorization: "Bearer " + this.state.token
                    }
                });
                
                this.setState(res2.data);
                this.setState(res3.data);
                this.setState(res4.data);
                this.setState({login:true});
                
            }
            
        } catch (error) {
            this.setState({errMess: error.message});
            
        }

    }
    const LogoutPost = async()=>{
        try {
            const res = await Axios.get("api/coorp/logout",{
                headers:{ 
                    Authorization: "Bearer "+ this.state.token 
                }
            })
            this.setState(res.data);
        } catch (error) {
            this.setState({errMess:error.message});
        }
    }

    const ResetPasswordPost = async(email)=>{
        const data = {Email:email}

        try {
            const res = await Axios.post( "api/coorp/reset-password", data );
            
            this.setState(res.data);
            console.log(res.data);

        } catch (error) {
            this.setState({errMess: error.message});

        }
        

    }
    const SignupCoorpPost = async(Firstname,Lastname,Address,PostCode,Suburb,State,Email,Phone,Password,CoopName)=>{
        const data ={Firstname,Lastname,Address,PostCode,Suburb,State,Email,Phone,Password,CoopName};
        try {

            const res = await Axios.post( "api/coorp/signup", data);
            this.setState(res.data);

        } catch (error) {
            this.setState({errMess: error.message});
            
        }
        

    }
    const invitePost = async(CoopName,ContactPerson,Email)=>{
        const data ={CoopName,ContactPerson,Email};

        try {
            
            const res= Axios.post("api/admin/invite", data,{
                headers:{Authorization: "Bearer "+this.state.token}
            });
            
            this.setState(res.data);
        } catch (error) {
            
            this.setState({errMess: error.message});
            
        }
    }
    const CreateFarmers = async(farmers)=>{
        
        try {
            farmers.forEach(async(farmer) => {
                const res = await Axios.post("api/coorp/farmers",farmer,{
                    headers:{Authorization: "Bearer "+this.state.token}
                });

                this.setState(res.data);
                console.log(res.data);
            });
            
        } catch (error) {
            console.log(error.message);
            this.setState({errMess:error.message});
            
        }
    }
    const CreateWalkers = async(walkers)=>{

        try {
            walkers.forEach(async(walker) => {
                const res = await Axios.post("api/coorp/walkers",walker,{
                    headers:{Authorization: "Bearer "+this.state.token}
                });

                this.setState(res.data);
            });
            
            
        } catch (error) {
            this.setState({errMess:error.message});
            
        }
    }
//Put

    const ResetPasswordPut = async(password, Id)=>{
        const data = {Password: password}
        

        try {
            const res = await Axios.put( "api/coorp/reset-password/" + Id , data );
            this.setState(res.data);
            console.log(res.data);
            

        } catch (error) {
            this.setState({errMess: error.message});
            console.log(error.message);
        }
        

    }
    const UpdateBanned = async(Id,Ban,wfc,ac)=>{
        const data = {Banned:Ban};
        try {
            
            const res = await Axios.put("api/"+ac+"/"+wfc+"/"+Id,data,{
                headers:{
                    Authorization: "Bearer " + this.state.token
                }
            })
            
            
            this.setState(res.data);
            
        }catch (error) {
            
            this.setState({errMess: error.message});
            
        }

    }
    const UpdateProfile = async(coop)=>{
        const data = {coop:coop};
        try {
           const res = await Axios.put("api/coorp/profile",data,{
               headers:{
                   Authorization: "Bearer "+this.state.token
               }
           });

           this.setState(res.data);
        } catch (error) {


            this.setState({errMess: error.message})
        }

    }



//components 
        const LoginPage = ()=>{

            if (this.state.login) {

                return(
                    <Redirect to="/coopInterface"/>
                )
            }else{
                return(
                    <div>
                        <Login Post={loginPost} errMess={this.state.errMess}/>
                    </div>
                    
                
                );  
            }

        }
        const LoginAdminPage = ()=>{
            if (this.state.login) {
                return(
                    <Redirect to="/adminInterface"/>
                )
            }else{
                return(
                    <div>

                    <LoginAdmin Post={loginAdminPost} errMess={this.state.errMess} Login={this.state.login}/>
                    

                    </div>
                    
                
                );  
            }
        }
        const ResetPasswordPage = ()=>{
            return(
                <div>
                    <ResetPassword Post={ResetPasswordPost}/>
                    <Messages errMess={this.state.errMess} message={this.state.message} />

                </div>
            );
        }
        const ResetPasswordIdPage = ({match})=>{

            return(
                <div>
                    <ResetPasswordId Put={ResetPasswordPut} Id={match.params.coorpId}/>
                    <Messages errMess={this.state.errMess} message={this.state.message} />
                </div>
            );
        }
        const SignupCoorpPage = ({match})=> {
            return(
                <div>
                    <Signupcoorp Post={SignupCoorpPost} CoopName={match.params.coorpname}/>
                </div>
            );
        }
//Protected roots
        const AdminInterFace = ()=>{
            if (!this.state.login) {
                return(
                    <Redirect to="/login-admin"/>
                )
            }else{
                return(
                    <div>
                        <AdminInterface Logout={LogoutPost} Coops={this.state.coops} Walkers={this.state.walkers} Farmers={this.state.farmers} Pag={this.state.Pag} maxElement={this.state.maxElement} Put={UpdateBanned} Login={this.state.login} Invite={invitePost}/>
                    </div>
                );
            }
        }
        const CoopInterface = ()=>{
            if (!this.state.login) {
                return(
                    <Redirect to="/login"/>
                )
            }else{
                return(
                    <div>
                        <InterfaceCoop ResetPassword={ResetPasswordPut} Logout={LogoutPost} UpdateProfile={UpdateProfile} Profile={this.state.profile} Walkers={this.state.walkers} Farmers={this.state.farmers} Pag={this.state.Pag} maxElement={this.state.maxElement} PostFarmers={CreateFarmers} PostWalker={CreateWalkers} Put={UpdateBanned}/>
                    </div>
                );
            }
         
                
        }
        return(
         <div>
             

                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/login-admin" component={LoginAdminPage}/>
                    <Route exact path="/signup-Coorp/:coorpname" component={SignupCoorpPage}/>

                    <Route exact path="/reset-password" component={ResetPasswordPage}/>
                    <Route exact path="/reset-password/:coorpId" component={ResetPasswordIdPage}/>
	
                    
                    <Route exact path="/adminInterface" component={AdminInterFace}/>
                    <Route exact path="/coopInterface" component={CoopInterface}/>
                    
                    

                    <Redirect to="/login"/>
                </Switch>

         </div>
        );
    }
    
}

export default Main;
