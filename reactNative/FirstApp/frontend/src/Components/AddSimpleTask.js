import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, Text, View } from 'react-native';
import { Textarea, Input, Item, Button } from 'native-base';
import DatePicker from './DataPicker';

const AddSimpleTask = (props) => {
  const [state, setState] = useState({
    Name: null,
    FinishOn: new Date(),
    Description: null,
    ErrMess: null
  });

  const onChangeInput = (input, value) => {
    setState({ ...state, [input]: value });
  }
  const onPressButton = () => {

    if (state.Name && state.FinishOn && state.Description) {
      const data = { Name: state.Name, FinishOn: state.FinishOn, Description: state.Description };
      setState({ ...state, ErrMess: null });
      props.navigation.goBack();
      props.PostSimpleTask(data);
    } else {
      setState({ ...state, ErrMess: 'You can`t send with input in blank' });
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={styles.form}>

        <Item style={styles.formGroup}>
          <Icon name='sticky-note' color='purple' size={20} style={{ marginHorizontal: 10 }} />
          <Input placeholder='Name' onChangeText={(value) => onChangeInput('Name', value)} />
        </Item>

        <Item style={styles.formGroup}>
          <Textarea rowSpan={4} bordered placeholder={'Description'} onChangeText={(value) => onChangeInput('Description', value)} style={{ width: '100%' }} />
        </Item>

        <Item style={styles.formGroup}>
          <DatePicker setState={setState} state={state} mode='date' />
        </Item>

        <View style={styles.formGroup}>

          <Button iconRight block large style={{ borderRadius: 10 }} onPress={() => onPressButton()}>
            <Icon name='plus' size={20} color='white' style={{ marginHorizontal: 10 }} />
            <Text style={{ color: 'white' }}>Add New Task</Text>
          </Button>
        </View>

        {
          state.ErrMess ?
            <Text style={{ color: 'red' }}>{state.ErrMess}</Text> :
            <View />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 30,
    width: '100%'

  },
  form: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AddSimpleTask;