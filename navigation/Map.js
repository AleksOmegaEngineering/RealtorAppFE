import axios from "axios";
import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';

async function fetchData(url) {
  let fetchURL = url;
  let response = await fetch(fetchURL);
  response = response.json();
  return response;
}


export default function Map() {
  const [location, setLocation] = React.useState([]);
  const [pinLoaded, setPinLoaded] = React.useState(false);
  const [pins, setPins] = React.useState([]);
  React.useEffect(() => {
    fetchData("http://192.168.1.111 :4545/locations").then((response) =>{
      setLocation(response);
      console.log("Response: " + response);
      setPinLoaded(true);
      setLocation(response);
      console.log("Location: " + location);
      let tempPins = [];
      for(let i = 0; i < location.length; i++){
        tempPins.push(
          <MapView.Marker key = {i} coordinate={{
            latitude: location[i][0],
            longitude: location[i][1],
          }}/>
        );
      }
      setPins(tempPins);
    });
  }, [pinLoaded])
  if(pinLoaded){
    return(
      <SafeAreaView style={{ flex: 1, alignItems: "baseline", justifyContent: "center" }}>
        <MapView style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
          {pins}
        </MapView>
      </SafeAreaView>
    );
  }
  else{
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "baseline", justifyContent: "center" }}>
        <MapView style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
          
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

})