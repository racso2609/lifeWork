import React from 'react';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';


const Setting = (props) => {

    const setting = [
        {
            name: 'Log-out',
            icon: 'sign-out',
            subtitle: 'Exit from the app',
            action: () => props.Logout()
        },
    ]

    const map = setting.map((setting) => {
        return (
            <ListItem key={setting.name} bottomDivider onPress={setting.action}>
                <Icon name={setting.icon} color='gray' size={25} />
                <ListItem.Content>
                    <ListItem.Title>{setting.name}</ListItem.Title>
                    <ListItem.Subtitle>{setting.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    })

    return (
        <View>
            {map}
        </View>
    );


}

export default Setting;