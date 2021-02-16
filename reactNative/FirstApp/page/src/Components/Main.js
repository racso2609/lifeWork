import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import "../index.css"
import Login from './Login';



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: null,
      Firstname: null,
      Lastname: null,
      Token: null,
      SimpleTask: [],
      MediumTask: [],
      Err: false,
      ErrMess: null,
      Message: null,
    }
  }

  render() {

    const LoginPage = () => {
      return (
        <Login />
      )
    }
    return (
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Redirect to='/login' />
      </Switch>
    )
  }
}




export default Main;
