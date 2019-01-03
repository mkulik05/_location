import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button ,
} from 'react-native';
import { WebBrowser,Constants, Location, Permissions,MapView} from 'expo';
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
      location: null,
      errorMessage: null,
      region:null,
      latitudeDelta:null,
      longitudeDelta:null
    };

    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {// если платформа android и приложение работает не в симуляторе
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync(); //вызов функции
      }

    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION); // Определяет, предоставлено ли вашему приложению доступ к предоставленному типу разрешения.
      if (status !== 'granted') { // если доступа не получено
        this.setState({
          errorMessage: 'Permission to access location was denied',
          });
      }

      let location = await Location.getCurrentPositionAsync({}); // если getCurrentPositionAsync выполнилось до конца

      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
      const latDelta =location.coords.accuracy / oneDegreeOfLatitudeInMeters;
      const longDelta = location.coords.accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(location.coords.latitude * (Math.PI / 180)));
      alert(location.coords.latitude)
      //alert(location.coords.longitude)
        //}, 3000);
        this.setState({
          location:location,
          latitudeDelta:latDelta,
          longitudeDelta:longDelta
         });
    };
   sendLocation() {
     var config = {
    apiKey: "AIzaSyDxqDaTcAUR3R6fZwI7PSz5H1yGhVnHHH4",
    authDomain: "location-72fca.firebaseapp.com",
    databaseURL: "https://location-72fca.firebaseio.com",
    projectId: "location-72fca",
    storageBucket: "location-72fca.appspot.com",
    messagingSenderId: "440309375391"
  };
  firebase.initializeApp(config);
 firebase.database().ref('users/').set({
   loc: this.state.location
 });
 alert(228)
}
  render() {
    let text = 'please wait 5 seconds(or more)';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      //latitude = this.state.location.coords.latitude;
      //longitude = this.state.location.coords.longitude;
      text = JSON.stringify(this.state.location);
    }
    if(this.state.location){
      return (

        <View style={styles.container}>
        <Button
    onPress={() => {this.sendLocation()}}
    title="Play "
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />
      </View>


            )
    } else {
      return(
          <View style={styles.container}>
          <Text>Waiting..</Text>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,      
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
