import React, { Component } from 'react';
import { Text, View ,TouchableOpacity,StyleSheet,Dimensions,AsyncStorage} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {withHandlers,compose,lifecycle, withState} from 'recompose';
const {width,height} = Dimensions.get('window');

const checked = withState('checked','handleChecked',false);
const enhance = compose(checked);

const MenuItem = (props) => {
    return (
        <View style={{flexDirection:'row'}}>
        {props.open && 
            <CheckBox 
            center={true} 
            checked={props.checked} 
            onPress={
                  () => {
                      props.handleChecked(checked => !checked);
                      props.handleShortcut(arr => arr.concat(props.name))
            }
        } 
            containerStyle={styles.checkbox}/>}
        <TouchableOpacity>
            <View style={styles.container}>

                <Text>{props.name}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );

}


const styles= StyleSheet.create({
    container:{
        height:height * 0.1,
        width:width * 0.94,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center'
    },
    checkbox:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderWidth:1,
        width:width*0.12
    }
});
export default enhance(MenuItem);