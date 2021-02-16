import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isValidEmail, isValidPassword } from './auth/validation';
import { Item, Input, Button } from 'native-base';



const Login = (props) => {
  const [state, setState] = useState({
    Email: null,
    Password: null,
    ErrPass: (value) => !isValidPassword(value),
    ErrEmail: (value) => !isValidEmail(value)
  });

  const onChangeInput = (input, value) => {
    setState({ ...state, [input]: value });
  }
  const onPressButton = async() => {
    if (!state.ErrPass(state.Password) && !state.ErrEmail(state.Email)) {
      const data = { Email: state.Email, Password: state.Password }
      props.LoginPost(data);
    } else {
      console.log(state);
    }
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          Welcome
                </Text>
      </View>

      <Item style={styles.Field}>

        <Icon name='user' size={15} color='gray' style={{ marginHorizontal: 10 }} />
        <Input placeholder='Email' onChangeText={(value) => onChangeInput('Email', value)} />

        {
          state.Email ? state.ErrEmail(state.Email) ?

            <Icon name='circle' color='red' style={{ marginHorizontal: 10 }} size={15} />

            :
            <Icon name='circle' color='green' style={{ marginHorizontal: 10 }} size={15} />
            :
            <View />
        }
      </Item>
      <Item style={styles.Field}>
        <Icon name='lock' color='gray' size={15} style={{ marginHorizontal: 10 }} />
        <Input secureTextEntry placeholder='Password' onChangeText={(value) => onChangeInput('Password', value)} />
        {
          state.Password ? state.ErrPass(state.Password) ?

            <Icon name='circle' color='red' style={{ marginHorizontal: 10 }} size={15} />

            :
            <Icon name='circle' color='green' style={{ marginHorizontal: 10 }} size={15} />
            :
            <View />
        }
      </Item>
      <View style={styles.Field}>

        <Button full large style={{ borderRadius: 9, backgroundColor: 'purple' }} onPress={() => onPressButton()}>
          <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
        </Button>

      </View>
      { props.ErrMess ?
        <View><Text style={{ color: 'red' }}>{props.ErrMess}</Text></View> :
        <View />
      }
      <View>
        <Button transparent onPress={() => props.navigation.navigate('Signup')}>
          <Text uppercase={false} style={{ color: '#036ffc', fontSize: 13 }}>I don`t have an account</Text>
        </Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Field: {
    marginBottom: 30,
    width: '96%'

  }
})

export default Login;
