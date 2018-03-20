import React, { Component } from 'react'
import { Text, View,StyleSheet,AsyncStorage } from 'react-native'
import {Button} from 'react-native-elements';
import {lifecycle,compose} from 'recompose';
import ShortMenu from '../components/shortcutMenu';
const componentLifeCycle = lifecycle({
  state:{
    shortcutItem:[]
  },
  async componentDidMount(){
    const result = await AsyncStorage.getItem('shortcut');
    const arr = JSON.parse(result)
    if(result){
      this.setState(state => ({
        shortcutItem:state.shortcutItem.concat(arr)
      }))
    }
  }
});

const enhance = compose(componentLifeCycle);

const Page1 = (props) => {
  console.log(props.shortcutItem);
  return (
    <View style={styles.container}>

        <Button title="open" onPress={() => props.navigation.navigate('DrawerOpen')}/>

        <ShortMenu/>
    </View>
  )
}


export default enhance(Page1);



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})