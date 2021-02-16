import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Login';
import Signup from '../Signup';

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
    return (
        <Stack.Navigator >
            <Stack.Screen name='Login' options={{ headerShown: false }}>
                {prop => <Login {...prop} ErrMess={props.ErrMess} LoginPost={props.LoginPost} />}
            </Stack.Screen>
            <Stack.Screen name='Signup' options={{ headerShown: false }}>
                {props => <Signup {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthNavigator;