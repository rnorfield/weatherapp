import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FetchWeather from "./components/FetchWeather"

export default class App extends React.Component {
  render() {
    return (
      <View>
        <FetchWeather/>
      </View>
    );
  }
}