import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Button, Fab } from 'native-base';
import { ListItem, Text } from 'react-native-elements';

const SimpleTaskComponent = ({ SimpleTask, DeleteSimpleTask }) => {
   
   const DeleteTask = (TaskId)=>{
        DeleteSimpleTask(TaskId);
   }
   
    const Taskmenu = SimpleTask.map((Task) => {
        return (

            <ListItem key={Task._id} style={{ marginRight: 20 }}>
                <Icon name='sticky-note' size={25} color='purple' style={{ marginHorizontal: 10 }} />
                <Icon name='trash' size={16} color='red' style={{ marginHorizontal: 10, position: 'absolute', right: 0, top: 8 }} onPress={()=>{DeleteTask(Task._id)}}/>
                <ListItem.Content>
                    <ListItem.Title>{Task.Name}</ListItem.Title>
                    <ListItem.Subtitle>{Task.FinishOn}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    });
    return (
        <ScrollView horizontal centerContent >
            {Taskmenu}
        </ScrollView>
    );

}

const NotTaskMessage = ({ TaskType }) => {
    return (
        <Text style={{ justifyContent: 'center' }}>Add Your First {TaskType}</Text>
    )
}



const Home = (props) => {

    const onRefresh = () => props.GetTask()


    const [state, setState] = useState({
        active: false
    });


    return (
        <View style={{ flex: 1 }} >
            {/* Fab */}
            <Fab
                active={state.active}
                direction='up'
                style={{ backgroundColor: '#5067FF' }}
                position='bottomRight'
                onPress={() => setState({ ...state, active: !state.active })}
            >
                <Icon name='plus' />

                <Button style={{ backgroundColor: '#34A34F' }} onPress={() => props.navigation.navigate('AddSimpleTask')}>
                    <Icon name='sticky-note' color='white' />
                </Button>
                <Button style={{ backgroundColor: '#3B5998' }} onPress={() => onRefresh()}>
                    <Icon name='refresh' color='white' />
                </Button>
            </Fab>

            {/* Simple Task */}
            <View style={styles.textSection}>
                <View style={styles.textSectionTitle}>
                    <Text h4 style={styles.titleSection}>Simple Task</Text>
                    <Icon name='eye' size={15} color='purple' style={{ marginRight: 30 }} />
                </View>
                {
                    props.SimpleTask ?
                        <SimpleTaskComponent SimpleTask={props.SimpleTask} DeleteSimpleTask={props.DeleteSimpleTask} /> :
                        <View style={{ alignItems: 'center' }}>
                            <NotTaskMessage TaskType='Simple Task' />
                        </View>
                }
            </View>
        
            {/* Advanced Task */}
        
        
        
        
        </View>
    );
}

const styles = StyleSheet.create({
    textSection:{
        marginTop: 10
    },
    textSectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleSection: {
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20
    }
})

export default Home;