import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList, Image } from 'react-native';

export default class App extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { city: '',
					   backgroundColor: 'white'};
	}

	_onPressButton = () => {
		fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&units=metric&APPID=dcd60367cbdecd580e2ae49ec5f7a33f')
		.then((response) => response.json())
		.then((response) => {
			var tempArray = [];
			tempArray.push(response.main)
			var code = response.cod;
			console.log(code);
			if (code == 200) {
				this.setState({
					weatherData: response.weather,
					tempData: tempArray,
					message: ''
				});
				var myTemp = response.main.temp;
				var color = ''
				if (myTemp >=30) {
					color = '#ff7142'
				} else if (myTemp >= 20) {
					color = '#f9b248'
				} else if (myTemp >= 10) {
					color = '#ffd460'
				} else if (myTemp >= 0) {
					color = '#82d5ff'
				} else {
					color = '#9efbff'
				}
				this.setState({
					backgroundColor: color
				});
				console.log(this.state.backgroundColor);
			} else {
				this.setState({
					message: 'Please enter a proper city name',
					city: ''
				})
			}
			
		})
	}

  render() {
    return (
      <View>
      	<View style={{height: 750, width: 500, position: 'absolute', transition: 'all 3s', backgroundColor: this.state.backgroundColor}}></View>
      	<Text style={[styles.locationHelp, {fontSize: 20}]}>Enter location:</Text>
	    <TextInput
	        style={styles.textInput}
	        onChangeText={(city) => this.setState({city})}
	        value={this.state.city}
	    />
	    <View style={styles.button}>
	        <Button
			  onPress={this._onPressButton}
			  title="Get Weather"
			  color="#a0a0a0"
			  accessibilityLabel="Learn more about this purple button"
			/>
		</View>

		<Text style={{left: 25, top: 75}}>{this.state.message}</Text>
		<FlatList
			style={[styles.tempDisplay, {}]}
			data={this.state.tempData}
			renderItem={({item}) => <Text style={[{fontSize: 100, textAlign: 'center'}]}>{item.temp}&deg;C</Text>}
          	keyExtractor={(item, index) => index.toString()}
		/>
		<FlatList
			style={[styles.tempDisplay, {}]}
			data={this.state.tempData}
			renderItem={({item}) => <Text style={[{fontSize: 40, textAlign: 'center'}]}>With a high of {item.temp_max}&deg;C and low of {item.temp_min}&deg;C</Text>}
          	keyExtractor={(item, index) => index.toString()}
		/>
		<FlatList
			style={[styles.weatherDescription, {}]}
			data={this.state.weatherData}
			renderItem={({item}) => <Text style={[{fontSize: 24, textAlign: 'center'}]}>{item.description}</Text>}
          	keyExtractor={(item, index) => index.toString()}
		/>

		<FlatList
			style={[styles.weatherDisplay, {}]}
			data={this.state.weatherData}
			renderItem={({item}) => <Image style={styles.icon} source={{uri: 'http://openweathermap.org/img/w/'+item.icon+'.png'}}/>}
          	keyExtractor={(item, index) => index.toString()}
		/>
		
      </View>
    );
  }
}

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		width: 300,
		top: 100,
		left: 25,
		borderColor: 'gray',
		borderWidth: 1,
		position: 'absolute'
	},
	button: {
		top: 150,
		width: 200,
		left: 75
	},
	locationHelp: {
		top: 70,
		left: 25
	},
	weatherDisplay: {
		top: 100,
		left: 40
	},
	weatherDescription: {
		top: 200,
		left: 60
	},
	tempDisplay: {
		top: 150
	},
	icon: {
		height: 60,
		width: 60
	}
})