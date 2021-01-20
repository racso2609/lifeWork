import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();






const TabNavigator = (props) => {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home'
                        
                } else if (route.name === 'Settings') {
                    iconName = 'cog';
                }
                return <Icon name={iconName} size={size} color={color} />
            },
        })}
            tabBarOptions={{activeTintColor: 'purple',inactiveTintColor: 'gray'}}
        >
            <Tab.Screen name='Home'>
                {prop => <Home {...prop} GetTask={props.GetTask} SimpleTask={props.SimpleTask} Email={props.Email} DeleteSimpleTask={props.DeleteSimpleTask}/>}
            </Tab.Screen>
            {/* <Tab.Screen name='Settings'>
                {prop => <Home {...prop} Email={props.Email} />}
            </Tab.Screen> */}
        </Tab.Navigator>
    );

}

export default TabNavigator;