import React, { useState } from 'react';
import { Platform, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


const DatePicker = ({ setState, state, mode }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || state.FinishOn;
        setShow(Platform.OS === 'ios');
        setState({ ...state, FinishOn: currentDate });
    };


    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button titleStyle={{color: 'gray'}} onPress={() => setShow(true)} title={'Date: ' + `${state.FinishOn.toString().substr(4, 12)}`} type='clear' />
                <Text> </Text>
            </View>

            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={state.FinishOn}
                    mode={mode}
                    is24Hour={false}
                    display={'default'}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePicker;