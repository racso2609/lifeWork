import { Item, Input, Button } from 'native-base';
import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidPassword, isValidphone } from './auth/validation';



const Signup = (props) => {
    const [state, setState] = useState({
        Email: null,
        Password: null,
        PasswordC: null,
        Firstname: null,
        Lastname: null,
        Phone: null,
        ErrPass: (value) => !isValidPassword(value),
        ErrEmail: (value) => !isValidEmail(value),
        ErrPhone: (value) => !isValidphone(value)
    });

    const onChangeInput = (input, value) => {
        setState({ ...state, [input]: value });
    }

    const onPressButton = async () => {
        if (!state.ErrPass && !state.ErrPhone && !state.ErrEmail) {
            const data = {
                Email: state.Email,
                Password: state.Password,
                Phone: state.Phone,
                Firstname: state.Firstname,
                Lastname: state.Lastname
            }
            props.SingupPost(data);
        }
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginBottom: 50 }}>
                <Text style={styles.title}>Registration</Text>
            </View>
            <Item style={styles.inputGroup, styles.field}>
                <Icon name='user' color='gray' size={15} style={{ marginHorizontal: 10 }} />
                <Input placeholder='Firstname' onChangeText={(value) => onChangeInput('Firstname', value)} />

                <Icon name='user' color='gray' size={15} style={{ marginHorizontal: 10 }} />
                <Input placeholder='Lastname' onChangeText={(value) => onChangeInput('Lastname', value)} />
            </Item>


            <Item style={styles.field}>
                <Icon name='user' size={15} color='gray' style={{ marginHorizontal: 10 }} />
                <Input placeholder='Email' onChangeText={(value) => onChangeInput('Email', value)} />
                {state.Email ?
                    state.ErrEmail(state.Email) ?
                        <Icon name='circle' color='red' size={15} /> :
                        <Icon name='circle' color='green' size={15} /> :
                    <View />
                }

            </Item>
            <Item style={styles.field}>
                <Icon name='phone' style={{ marginHorizontal: 10 }} size={15} color='gray' />
                <Input placeholder='Phone' onChangeText={(value) => onChangeInput('Phone', value)} />
                {state.Phone ?
                    state.ErrPhone(state.Phone) ?
                        <Icon name='circle' color='red' size={15} /> :
                        <Icon name='circle' color='green' size={15} /> :
                    <View />
                }

            </Item>

            <Item style={styles.inputGroup, styles.field}>
                <Icon name='lock' style={{ marginHorizontal: 10 }} size={15} color='gray' />
                <Input placeholder='Password' onChangeText={(value) => onChangeInput('Password', value)} secureTextEntry />
                {state.Password ?
                    state.ErrPass(state.Password) ?
                        <Icon name='circle' color='red' size={15} /> :
                        <Icon name='circle' color='green' size={15} /> :
                    <View />
                }

                <Icon name='lock' style={{ marginHorizontal: 10 }} size={15} color='gray' />
                <Input placeholder='Confirm ' onChangeText={(value) => onChangeInput('PasswordC', value)} secureTextEntry />
                {state.PasswordC ?
                    state.Password !== state.PasswordC ?
                        <Icon name='circle' color='red' size={15} /> :
                        <Icon name='circle' color='green' size={15} /> :
                    <View />
                }

            </Item>
            <View style={styles.field}>
                <Button full large style={{ backgroundColor: 'purple', borderRadius: 10 }} onPress={() => { onPressButton(); }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Sign up</Text>
                </Button>
            </View>
            <View>
                <Button transparent onPress={() => props.navigation.navigate('Login')}>
                    <Text uppercase={false} style={{ color: '#036ffc', fontSize: 13 }}>I have an account</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 25,
        width: '96%'

    },
    inputGroup: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default Signup;