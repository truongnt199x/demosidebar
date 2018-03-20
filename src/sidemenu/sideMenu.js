import React, { Component } from 'react';
import { Text, View , Image,StyleSheet,FlatList,AsyncStorage} from 'react-native';
import {lifecycle,branch,renderComponent,compose, withState} from 'recompose';
import axios from 'axios';
import Spinner from '../components/spiners';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import MenuItem from './menuItem';
const API ="https://api.myjson.com/bins/11otqz";

const menuDataLifeCycle = lifecycle({
    state:{
        loading:true,
        data:[]
    },
    componentWillMount(){
        axios.get("https://api.myjson.com/bins/11otqz").then(res => this.setState(state => ({
            loading:false,
            data:state.data.concat(res.data)
        })));
    }
});
const customState = withState('openCheckBox','handleOpenCheckBox',false);
const clicked = withState('clicked','onClicked',false);
const arrShort = withState('arrShortcut','setArrShortcut',[]);
const isLoading = ({loading}) => loading;

const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);

const enhance = compose(
    menuDataLifeCycle,
    withSpinnerWhileLoading,
    customState,
    clicked,
    arrShort
);

const Sidemenu = (props) => {
    return  (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                <Image source={require('../../asset/img/avatar.png')} resizeMode="cover" style={{borderRadius:20,width:40,height:40}}/>
                <View>
                    <Text>Mai Anh Tran</Text>
                    <Text>cdsfssdf</Text>
                    <View style={{flexDirection:"row"}}>
                        <Text>3242</Text>
                        <Text> | </Text>
                        <Text>Bac</Text>
                    </View>
                </View>
                <Icon name="angle-right" size={30} color="gray"/>
                {   props.clicked === true 
                    ? 
                    <Button title="save" onPress={async () => {
                        props.handleOpenCheckBox((s => false),() => {})
                        props.onClicked(s => false);
                        await AsyncStorage.setItem('shortcut',JSON.stringify(props.arrShortcut));

                    }}/> 
                    :  
                    <Button title='setting' onPress={() =>{ 
                    props.handleOpenCheckBox((s => true),() => {})
                    props.onClicked(s => true);
                    }
                    }/>
                }
               
            </View>
            <FlatList 
                data={props.data}
                renderItem={({item}) => <MenuItem {...item} open={props.openCheckBox === true ? true:false} handleShortcut={props.setArrShortcut}/>}
                keyExtractor={() => Math.random().toString()}
                extraData={props.openCheckBox}
            />
        </View>
    );
}

export default enhance(Sidemenu);