import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser,Constants, Location, Permissions,MapView} from 'expo';
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
    header: null,
  };
  state = {
      latitude: null,
      longitude: null,
      region:null
    };
    getLocation() {
     var config = {
    apiKey: "AIzaSyDxqDaTcAUR3R6fZwI7PSz5H1yGhVnHHH4",
    authDomain: "location-72fca.firebaseapp.com",
    databaseURL: "https://location-72fca.firebaseio.com",
    projectId: "location-72fca",
    storageBucket: "location-72fca.appspot.com",
    messagingSenderId: "440309375391"
  };
  firebase.initializeApp(config);
  firebase.database().ref('users/').on('value', (snapshot) => {
     const longitude = snapshot.val().loc.coords.longitude;
     const latitude = snapshot.val().loc.coords.latitude;
     this.setState({
           longitude:longitude,
           latitude:latitude,
          });
   });
}

  render() {
    if(this.state.latitude){
      return (


        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.005,//this.state.latitudeDelta,
          longitudeDelta: 0.005//this.state.longitudeDelta,
        }}
      />


            )
    } else {
      return(
      <View style={styles.container}>
        <Button
    onPress={() => {this.getLocation()}}
    title="see map"
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
  />
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
