import * as React from "react";
import {View, Text, StyleSheet} from "react-native";
import { BlurView } from 'expo-blur';

export default function Upload() {
    return (
      <View style={styles.mainContainer}>
        <Text>UPLOAD SCREEN</Text>
        <BackgroundComponent/>
      </View>
    );
}
function BackgroundComponent(){
  return(
    <BlurView intensity={50} style={[StyleSheet.absoluteFill, styles.blurView]}>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center"
  },
  blurView:{
    height: "100%",
    width: "100%"
  }
})