import React ,{ Component } from 'react'
import { Route, Switch,  Redirect} from 'react-router-dom'



import Navigation from "./Navbar"
import Raison from "./Raison"
import Detail from './Details';
import Home from './Home';
import RenderAlert from "./Alert"
import Footer from './Footer';
import Loading from './loading';
import Axios from 'axios';





var response = {err: false, errMess: "", raison: []};



class Main extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            raisons: response
        }
    }
    componentDidMount (){
        
        const fetchRaisons= async(response) => {
    
            try {
                const res = await Axios.get("api/reason")
                
                response.err = false;
                response.raison = res.data;
                this.setState({raisons: response});
               

        
        
            } catch (error) {
                response.err = true;
                response.errMess = error.message;
                this.setState({raisons: response});
                console.log("data: ",response);
                
        
            }        
        
        }
        fetchRaisons(response);            
    }

    render(){

        const PostRaison = async(title, img, raison)=>{

            try {
                const data = new FormData()
                data.append("image", img[0])
                data.append("raison", raison)
                data.append("title", title)
        
                const res = await Axios.post( "api/reason",data);
                response.err = false;
                response.raison = res.data;
        
            } catch (error) {   
                
                response.err = true;
                response.errMess = error.message;
        
            }
            this.setState({raisons: response});

        }
        
        const DeleteRaisons = async()=>{
            try {
                const res = await Axios.delete( "api/reason");
                response.err = false;
                response.raison = res.data;

            } catch (error) {
                response.err = true;
                response.errMess = error.message;
            }
            this.setState({raisons: response});
        }
        const DeleteRaison = async(id) => {
            try {
        
                const res = await Axios.delete("api/reason/"+ id);
                response.err = false;
                response.raison = res.data;
                console.log(res.data);
        
            } catch (error) {
                response.err = true;
                response.errMess = error.message;
            }
            this.setState({raisons: response})
        }
        const RenderRaison = ()=>{
           return(
               <Raison
                raisons= {this.state.raisons} 
                postRaison={PostRaison}
                deleteRaisons = {DeleteRaisons}
                />
           );
       };

       const RenderDetails = ({match})=>{
            
            const reasonWithId =  this.state.raisons.raison.filter((raison)=> raison._id === match.params.reasonId)[0];
            if (reasonWithId) {
                return(
                    <Detail 
                     raison = {reasonWithId}
                     deleteRaison = {DeleteRaison}
                    />
                );     
            }else{
                return(
                    <div className="mb-5">

                        <Loading/>
                    </div>
                )
            }
           
       }
       const HomePage = ()=>{

           return(
               <Home raisons={this.state.raisons}/>
           );
           
       }

        return(
            <div>
                <Navigation/>
                <RenderAlert ErrMess = {this.state.raisons} />

                <Switch>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path ="/reasons" component={RenderRaison}/>
                    <Route path="/reasons/:reasonId" component={RenderDetails}/>

                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
        
    }
}
export default Main;