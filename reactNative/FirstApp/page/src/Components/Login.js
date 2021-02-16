import react, {useState} from 'react';
import {Button, Input} from 'reactstrap';
import {isValidEmail, isValidPassword} from './auth/validation';


const LoginForm = () => {
  const [state, setState] = useState({
    Email: null,
    Password: null,
    ErrEmail: (value) => !isValidEmail(value),
    ErrPassword: (value) => !isValidPassword(value)
  });
  const onChangeInput = (name, value) => {
    setState({...state, [name]: value})
  }
  const onHandleForm = () => {
    if (!state.ErrEmail(state.Email) && !state.ErrPassword(state.Password)) {
      alert('hola')
    }
  }
  return (
    <div classNam="row">
      <div>
        <form onSubmit={(e) => {e.preventDefault(); onHandleForm()}}
        >
          <Input placeholder='Username' type='text' onChangeCapture={(value) => {onChangeInput('Email', value)}} className="form-control" />
          {
            state.Email ? state.ErrEmail(state.Email) ?
              <p style={{color: 'red'}}>Email not valid</p> :
              <div></div> :
              <div></div>
          }

          <Input placeholder='Password' type='text' onChangeCapture={(value) => {onChangeInput('Password', value)}} className="form-control" />
          {
            state.Password ? state.ErrPassword(state.Password) ?
              <p style={{color: 'red'}}>Password not valid</p> :
              <div></div> :
              <div></div>
          }
          <Button type="submit" >Submit</Button>
        </form>
      </div>
    </div>
  )

}

const SignupForm = () => {

  const [state, setState] = useState({
    Email: null,
    Password: null,
    ErrEmail: (value) => !isValidEmail(value),
    ErrPassword: (value) => !isValidPassword(value)
  });
  const onChangeInput = (name, value) => {
    setState({...state, [name]: value})
  }
  const onHandleForm = () => {
    if (!state.ErrEmail(state.Email) && !state.ErrPassword(state.Password)) {
      alert('hola')
    }
  }
  return (
    <div classNam="row">
      <div>
        <form onSubmit={(e) => {e.preventDefault(); onHandleForm()}}>
          <Input placeholder='Username' type='text' onChangeCapture={(value) => {onChangeInput('Email', value)}} className="form-control" />
          {
            state.Email ? state.ErrEmail(state.Email) ?
              <p style={{color: 'red'}}>Email not valid</p> :
              <div></div> :
              <div></div>
          }

          <Input placeholder='Password' type='text' onChangeCapture={(value) => {onChangeInput('Password', value)}} className="form-control" />
          {
            state.Password ? state.ErrPassword(state.Password) ?
              <p style={{color: 'red'}}>Password not valid</p> :
              <div></div> :
              <div></div>
          }
          <Button type="submit" >Submit</Button>
        </form>
      </div>
    </div>
  );
}

const Login = () => {
  const [LoginF, setLogin] = useState(true);

  return (
    <div>
      <div className='row'>
        <div className='p-3'><p>Login</p></div>
        <div className=`p-3 ${<p>Signup</p></div>
    </div>
    </div >
  );
};

export default Login;
