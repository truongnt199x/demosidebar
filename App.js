import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Router from './src/navigations/routes';

export default class App extends Component {
  render() {
    return (
      <Router/>
    )
  }
}