import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthNavigator from './navigators/authNavigator';
import TabNavigator from './navigators/tabNavigator';
import Setting from './Setting';
import AddSimpleTask from './AddSimpleTask';



const Stack = createStackNavigator();




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Token: null,
            Rol: null,
            Email: null,
            Phone: null,
            Firstname: null,
            Lastname: null,
            ErrMess: null,
            Message: null,
            isLogin: false,
            Err: false,
            proxy: 'http://10.0.2.2:3001/api/',
            SimpleTask: []
        };
    }
    render() {

        //request
        const LoginPost = async (data) => {
            try {
                const resp = await axios.post(this.state.proxy + 'users/login', data);
                this.setState(resp.data);
                if (this.state.isLogin) {
                    GetTask();
                }
            } catch (error) {

                this.setState({ ErrMess: error.message });
            }
            console.log(this.state);


        }
        const SignUpPost = async (data) => {
            const resp = await axios.post(this.state.proxy + 'users/signup', data).catch((err) => this.setState({ ErrMess: err.message }));

            this.setState(resp.data);
        }
        const Logout = () => {
            this.setState({
                Token: null,
                Rol: null,
                Email: null,
                Phone: null,
                Firstname: null,
                Lastname: null,
                ErrMess: null,
                Message: null,
                isLogin: false,
                proxy: 'http://10.0.2.2:3001/api/',
            })
        }
        const GetTask = async () => {
            try {
                const resp = await axios.get(this.state.proxy + 'users/simple-task', {
                    headers: {
                        Authorization: 'Bearer ' + this.state.Token
                    }
                });

                this.setState(resp.data);

            } catch (error) {
                this.setState({ ErrMess: error.Message });
            }
        }
        const PostSimpleTask = async (data) => {
            try {
                const resp = await axios.post(this.state.proxy + 'users/simple-task', data, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.Token
                    }
                });
                this.setState(resp.data);
            } catch (error) {
                console.log(error.message);
                this.setState({ ErrMess: error.message });
            }
        }
        const DeleteSimpleTask = async (simpleTaskId) => {
            try {
                const resp = await axios.delete(this.state.proxy + 'users/simple-task/' + simpleTaskId, {
                    headers: {
                        Authorization: 'Bearer ' + this.state.Token
                    }
                });
                this.setState(resp.data);
            } catch (error) {
                this.setState({ ErrMess: error.message });
            }
        }


        return (


            <NavigationContainer>
                {!this.state.isLogin ? (
                    <AuthNavigator LoginPost={LoginPost} SignUpPost={SignUpPost} ErrMess={this.state.ErrMess} />
                ) : (

                        <Stack.Navigator>
                            <Stack.Screen name='Home'
                                options={({ navigation }) => ({
                                    headerRight: () => (
                                        <Icon
                                            onPress={() => navigation.navigate('Settings')}
                                            name='cog'
                                            color='gray'
                                            size={20}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                    ),
                                })}>
                                {props => <TabNavigator {...props} GetTask={GetTask} SimpleTask={this.state.SimpleTask} Email={this.state.Email} DeleteSimpleTask={DeleteSimpleTask} />}
                            </Stack.Screen>
                            <Stack.Screen name='Settings'  >
                                {props => <Setting {...props} Logout={Logout} />}
                            </Stack.Screen>
                            <Stack.Screen name='AddSimpleTask' options={{ title: 'Add Simple Task' }}  >
                                {props => <AddSimpleTask {...props} PostSimpleTask={PostSimpleTask} />}
                            </Stack.Screen>
                        </Stack.Navigator>
                    )}
            </NavigationContainer>
        );
    }
}

export default Main;