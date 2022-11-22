import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Map from "./navigation/Map";
import Upload from "./navigation/Upload";
import HomeScreen from "./navigation/HomeScreen";

const mapName = "Map";
const uploadName = "Upload";
const homeName = "Home";

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return (
        <NavigationContainer independent = {true}>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === mapName){
                        iconName = focused ? 'map' : 'map-outline';
                    }
                    else if (rn === uploadName){
                        iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
                    }

                    return <Icon name={iconName} size={size} color={color}/>
                    
                },
                tabBarActiveTintColor: "#080B47",
            })}
            >

             <Tab.Screen options = {{headerShown: false}}name = {homeName} component={HomeScreen}/>
             <Tab.Screen options = {{headerShown: false}}name = {uploadName} component={Upload}/>
             <Tab.Screen options = {{headerShown: false}}name = {mapName} component={Map}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}