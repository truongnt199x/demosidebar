import ActionButton from 'react-native-action-button';
import { View ,StyleSheet,Dimensions,AsyncStorage} from 'react-native';
import {lifecycle} from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';

import React, { Component } from 'react'
const {width,height} = Dimensions.get('window');
export default class Demo extends Component {
    state={
        shortcutItem:[]
    }
    async componentWillMount(){
        const result = await AsyncStorage.getItem('shortcut');
        const arr = JSON.parse(result)
        if(result){
          this.setState(state => ({
            shortcutItem:state.shortcutItem.concat(arr)
          }))
        }
    }
  render() {
      console.log(this.state.shortcutItem);
    return (
        <View style={{ backgroundColor: '#000'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={height*0.28} >
          {this.state.shortcutItem.map(item => 
            <ActionButton.Item buttonColor='#9b59b6' title={item} onPress={() => console.log("notes tapped!")} key={() => {Math.random()}}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        )}
        </ActionButton>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });