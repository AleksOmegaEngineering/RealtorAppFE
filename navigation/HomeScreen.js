import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  PixelRatio,
  Image,
  AppRegistry,
  TouchableOpacity,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Touchable
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Slider } from '@miblanchard/react-native-slider';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
// import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

const AOBlue = "#080B47";
let sqFtMin = 1250;
let sqFtMax = 3750;

function heightPercentageToPixel(percentage) {
  let totalScreenHeight = Dimensions.get('window').height;
  let newPercentage = parseFloat(percentage) / 100;
  return newPercentage * totalScreenHeight;
}

const RotateCwView = (props) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0.2)).current;


  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.sequence([
          Animated.timing(fadeValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false
          }),
          Animated.timing(fadeValue, {
            toValue: 0.2,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false
          }),
        ])
      ])
    ).start();
  }, [spinValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        transform:
          [
            { rotate: spin }
          ],
        opacity: fadeValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

const Fadein = (props) => {
  const fadeValue = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [fadeValue]);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeValue,
      }}>
      {props.children}
    </Animated.View>
  );
}
function SlideDownFilterView(props) {
  let [filterType, setFilterType] = useState("")
  const topPos = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (props.filterActive) {
      // console.log(newTop)
      Animated.timing(topPos, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
    else if (!(props.filterActive)) {
      // console.log(newTop);
      setFilterType("");
      Animated.timing(topPos, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  },);

  const newTop = topPos.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        top: newTop,
      }}
    >
      <SquareFeetFilter setSquareFeet={props.setSquareFeet} squareFeet={props.squareFeet} filterActive={filterType} setFilterType={setFilterType} style={styles.filterBox} />
      <TouchableOpacity style={styles.FilterTextContainer} onPress={() => {
        setFilterType("sqft")
      }}>
        <Text style={styles.sliderText} adjustsFontSizeToFit numberOfLines={1}>
          Square Feet
        </Text>
        <View style={styles.rightArrowContainer}>
          <FontAwesome style={styles.rightArrow} name="angle-right" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.FilterTextContainer} onPress={() => {
        setFilterType("beds")
      }}>
        <Text style={styles.sliderText} adjustsFontSizeToFit numberOfLines={1}>
          Beds
        </Text>
        <View style={styles.rightArrowContainer}>
          <FontAwesome style={styles.rightArrow} name="angle-right" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.FilterTextContainer} onPress={() => {
        setFilterType("price")
      }}>
        <Text style={styles.sliderText} adjustsFontSizeToFit numberOfLines={1}>
          Price
        </Text>
        <View style={styles.rightArrowContainer}>
          <FontAwesome style={styles.rightArrow} name="angle-right" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.FilterTextContainer2} onPress={() => {
        setFilterType("baths")
      }}>
        <Text style={styles.sliderText} adjustsFontSizeToFit numberOfLines={1}>
          Baths
        </Text>
        <View style={styles.rightArrowContainer}>
          <FontAwesome style={styles.rightArrow} name="angle-right" />
        </View>
      </TouchableOpacity>
      {props.children}
    </Animated.View>
  );
}

function GrayScreenExpansion(props) {
  const scaleFactor = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (props.filterActive) {
      // console.log(newScale);
      Animated.parallel([
        Animated.timing(scaleFactor, {
          toValue: 1,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false
        })
      ]).start();
    }
    else if (!(props.filterActive)) {
      // console.log(newScale);
      Animated.parallel([
        Animated.timing(scaleFactor, {
          toValue: 0,
          delay: 250,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false
        })
      ]).start();
    }
  });

  const newScale = scaleFactor.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "550%"]
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        height: newScale,
        opacity: fadeValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}
function SquareFeetFilter(props) {
  const SliderContainer = (props) => {
    let [input, setInput] = useState(props.squareFeet);
    let [editingL, setEditingL] = useState(false);
    let [editingR, setEditingR] = useState(false);
    let [value, setValue] = useState(props.squareFeet);
    const renderChildren = () => {
      return React.Children.map(
        props.children,
        (child) => {
          if (child.type === Slider) {
            return React.cloneElement(child, {
              onValueChange: setValue,
              value,
            });
          }
          return child;
        }
      )
    }
    return (
      <View style={styles.sliderContainer}>
        {renderChildren()}
        <View style={styles.filterInputContainerContainer}>
          <View style={styles.filterInputContainer}>
            <TextInput style={styles.filterInput} onChangeText={(localInput) => {
              setEditingL(true);
              setInput([localInput, input[1]]);
            }} onEndEditing={() => {
              if (!isNaN(parseInt(input[0])) && parseInt(input[0]) >= 0 && parseInt(input[0]) < parseInt(input[1])) {
                setValue([parseInt(input[0]), value[1]]);
                setEditingL(false);
                renderChildren();
              }
              else {
                setInput([JSON.stringify(value[0]), JSON.stringify(value[1])]);
                setEditingL(false);
              }
            }} value={editingL ? input[0] : JSON.stringify(value[0])} />
          </View>
          <View style={styles.filterInputContainer}>
            <TextInput style={styles.filterInput} onChangeText={(localInput) => {
              setEditingR(true);
              setInput([input[0], localInput]);
            }} onEndEditing={() => {
              if (!isNaN(parseInt(input[0])) && parseInt(input[0]) >= 0 && parseInt(input[0]) < parseInt(input[1])) {
                setValue([value[0], parseInt(input[1])]);
                setEditingR(false);
              }
              else {
                setInput([JSON.stringify(value[0]), JSON.stringify(value[1])]);
                setEditingR(false);
              }
            }} value={editingR ? input[1] : JSON.stringify(value[1])} />
          </View>
        </View>
      </View>
    )
  }
  const slideIn = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    if (props.filterActive == "sqft") {
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start();
    }
    else {
      Animated.timing(slideIn, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start();
    }
  });
  const leftValue = slideIn.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });
  return (
    <Animated.View
      style={{
        ...props.style,
        left: leftValue,
      }}
    >
      <TouchableOpacity style={styles.closeContainer} onPress={() => {
        props.setFilterType("");
      }}>
        <IonIcon style={styles.rightArrow} name="close" />
      </TouchableOpacity>
      <View style={styles.filterInformationContainer}>
        <View style={styles.filterHeaderContainer}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.filterHeader}>Square Feet</Text>
        </View>
        <SliderContainer setSquareFeet={props.setSquareFeet} squareFeet={props.squareFeet}>
          <Slider trackClickable={false} thumbTintColor={AOBlue} maximumValue={5000} minimumValue={0} trackStyle={styles.track} step={100} containerStyle={styles.slider} animateTransitions onSlidingComplete={(input) => {
            props.setSquareFeet(input);
          }} />
        </SliderContainer>
      </View>
    </Animated.View>
  )
}
export class EntryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterActive: false,
      data: [],
      propertiesComponent: [],
      image: null,
      propertiesLoaded: false,
      timer: false,
      textInputValue: "",
      squareFeet: [0, 5000],
      location: "",
      mlsPropertiesLoaded: false
    };
  }
  setSquareFeet = (input) => {
    this.setState({ squareFeet: input }, () => {
      console.log(this.state.squareFeet);
    });
  }
  renderItem = ({ itemObj }) => {
    <Entries item={itemObj} />
  }
  clearInput = () => {
    this.setState({ textInputValue: "" });
  }
  handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }

  Header = (props) => {
    return (
      <View style={styles.headerContainer}>
        <SlideDownFilterView squareFeet={this.state.squareFeet} setSquareFeet={this.setSquareFeet} filterActive={this.state.filterActive} style={styles.filterBox} />
        <GrayScreenExpansion filterActive={this.state.filterActive} style={styles.grayOutBackground} />
        <View style={styles.headerBig}>
          <View style={styles.header}>
            <View adjustsFontSizeToFit style={styles.imageContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/images/fullAOLogo.png")}
              />
            </View>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>
              ALEKS OMEGA
            </Text>
          </View>
          <View style={styles.searchSortContainer}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.searchImageContainer}>
                <Image
                  style={styles.searchImage}
                  source={require("../assets/images/search.png")}
                />
              </TouchableOpacity>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={this.state.textInputValue}
                  onChangeText={textInputValue => this.setState({ textInputValue })}
                  returnKeyType="search"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.filterContainer} onPress={() => {
              this.setState(prevState => ({
                filterActive: !prevState.filterActive
              }));
            }}>
              <Image
                style={styles.filterImage}
                source={require("../assets/images/filter.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  async fetchData(parameters = "") {
    let sqlURL = "http://72.182.161.176:4545/properties";
    let mlsURL = `http://72.182.161.176:4545/mls-properties/${this.state.location}`;
    if(parameters != ""){
      sqlURL = sqlURL + "/" + parameters;
      let response = await fetch(sqlURL);
      let newData = await response.json();
      console.log("two");
      this.setState({ data: newData });
      return "sql props only";
    }
    else{
      let response = await fetch(sqlURL);
      let sqlProps = await response.json();
      response = await fetch(mlsURL);
      let mlsProps = await response.json();
      let allProps = sqlProps.concat(mlsProps)
      this.setState({ data: allProps });
      return "mls and sql props";
    }
  }
  Entries = (props) => {
    let properties = []
    for (let i = 0; i < this.state.data.length; i++) {
      properties.push(
        <TouchableOpacity
          style={styles.fullEntry}
          onPress={() => this.props.navigation.navigate("Information", {
            name: this.state.data[i].name,
          })}
          key={i}
        >
          <View style={styles.entrySample}>
            <View style={styles.entryImageContainer}>
              {this.state.data[i].id < 40
                ? <Image source={{ uri: `data:image/gif;base64,${this.state.data[i].profile_image}`,}} style={styles.entryImage}/>
                : <Image source={{ uri: this.state.data[i].profile_image}} style={styles.entryImage}/>
              }
              {/* <Image
                source={{
                  uri: `data:image/gif;base64,${this.state.data[i].profile_image}`,
                }}
                style={styles.entryImage}
              /> */}
            </View>
            <View style={styles.entryInformation}>
              <View style={styles.entryNameCont}>
                <Text
                  style={styles.entryName}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {this.state.data[i].name}
                </Text>
              </View>
              <View style={styles.entryDescriptionCont}>
                <Text
                  style={styles.entryDescription}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {this.state.data[i].description}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </TouchableOpacity>
      );
    }
    this.setState({ propertiesComponent: properties });
    this.setState({ propertiesLoaded: true });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ timer: true });
    }, 1500);
    (async () =>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted"){
        this.setState({location: null})
      }
      else{
        let newLocation = await Location.getCurrentPositionAsync({});
        newLocation = `${newLocation.coords.latitude},${newLocation.coords.longitude}`
        console.log(newLocation);
        this.setState({location: newLocation});
      }
    })()
    .then(() =>{
        return this.fetchData()
    })
    .then((props) => {
        console.log(this.state.data.length);
        this.Entries();
    })
    .catch((error) => {
        console.log(error);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filterActive !== this.state.filterActive) {
      // console.log(this.state.filterActive);
    } // Delete
    if (prevState.textInputValue !== this.state.textInputValue) {
      this.setState({ timer: false });
      this.setState({ propertiesLoaded: false })
      console.log("UPDATED");
      setTimeout(() => {
        this.setState({ timer: true });
      }, 1500);
      this.fetchData(this.state.textInputValue)
        .then(() => {
          this.Entries();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  render() {
    console.log(this.state.textInputValue);
    if (!(this.state.propertiesLoaded && this.state.timer)) {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar style={{ barStyle: "light", backgroundColor: "#ffff" }} />
          <this.Header />
          <View style={styles.scrollArea}>
            <ScrollView style={styles.scrollView}>
              <RotateCwView style={styles.loadingLogoBigContainer}>
                <Image
                  style={styles.loadingLogo}
                  source={require("../assets/images/AO.png")}
                />
              </RotateCwView >
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
    else {
      if (this.state.data.length == 0) {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
            <this.Header />
            <View style={styles.scrollArea}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.entryName}>
                  Nothing was found!
                </Text>
              </View>
            </View>
          </SafeAreaView>
        );
      }
      else {
        return (
          <SafeAreaView style={styles.safeAreaView}>
            <StatusBar style={{ barStyle: "dark", backgroundColor: "#ffff" }} />
            <this.Header />
            <View style={styles.scrollArea}>
              <ScrollView style={styles.scrollView}>
                {this.state.propertiesComponent}
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      }
    }
  }
}

function Information({ route, navigation }) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{name}</Text>
    </View>
  );
}
async function loadFonts() {
  await Font.loadAsync({
    OpenSans: require("../assets/fonts/OpenSans.ttf"),
    OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    BadGuyBlack: require("../assets/fonts/BadGuyBlack.ttf"),
  });
}
export default function HomeScreen() {
  const [loaded] = Font.useFonts({
    OpenSans: require("../assets/fonts/OpenSans.ttf"),
    OpenSansSemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    BadGuyBlack: require("../assets/fonts/BadGuyBlack.ttf")
  });
  if (!loaded) {
    return null;
  }
  else {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={EntryScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Information" component={Information} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    // borderColor: "red",
    // borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBig: {
    zIndex: 3,
    overflow: "visible",
    flexDirection: "column",
    top: 0,
    backgroundColor: "#fff",
    // borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: AOBlue,
    // borderWidth: 5,
    // borderBottomWidth: 40,
    // marginBottom: 5,
  },
  header: {
    // paddingRight: 10,
    // paddingLeft: 10,
    flexDirection: "row",
    flex: 5,
    maxWidth: "100%",
    top: 0,
    backgroundColor: "#fff",
    // borderColor: "red",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    margin: 2,
    // borderColor: "red",
    // borderWidth: 5,
    maxHeight: 67,
    width: 67,
    marginLeft: 75
  },
  logo: {
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    height: "100%",
    width: "100%",
  },
  headerText: {
    margin: 10,
    fontFamily: "OpenSansSemiBold",
    fontSize: 300,
    color: AOBlue,
    // borderColor: "red",
    // borderWidth: 5,
    marginRight: 80,
  },
  searchSortContainer: {
    flexDirection: "row",
    flex: 2.5,
    // borderColor: AOBlue,
    // borderWidth: 5,
    width: "100%",
    backgroundColor: AOBlue,
  },
  searchContainer: {
    marginLeft: "2%",
    marginRight: "5%",
    flexDirection: "row",
    flex: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
  searchImageContainer: {
    height: "100%",
    flex: 1,
    // borderWidth: 5,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  searchImage: {
    height: "60%",
    // borderColor: "white",
    // borderWidth: 5,
    maxWidth: "100%",
    resizeMode: "contain"
  },
  searchInputContainer: {
    height: "70%",
    marginLeft: "2%",
    // borderWidth: 3,
    borderBottomWidth: 1,
    borderColor: "white",
    flex: 9,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    height: "100%",
    width: "90%",
    // borderColor: "white",
    // borderWidth: 5,
  },
  closeImage: {
    height: "100%",
    maxWidth: "100%",
    resizeMode: "contain"
  },
  filterContainer: {
    marginRight: "2%",
    height: "100%",
    flex: 1,
    // borderWidth: 5,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableFilterBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 2,
    height: "100%",
    width: "100%",
  },
  filterImage: {
    height: "55%",
    // borderColor: "white",
    // borderWidth: 5,
    maxWidth: "100%",
    resizeMode: "contain",
  },
  grayOutBackground: {
    opacity: 0,
    zIndex: 1,
    position: "absolute",
    top: "0%",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(200,200,200,0.8)",
  },
  filterBox: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 2,
    position: "absolute",
    top: "0%",
    // borderColor: "teal",
    // borderWidth: 5,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0,
    shadowRadius: 3,
  },
  sliderText: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    textAlign: "left",
    fontSize: 15,
    color: AOBlue,
    fontFamily: "OpenSans",
  },
  FilterTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 2,
    marginHorizontal: 20,
  },
  rightArrowContainer: {
    flex: 0.25,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    transform: [{ translateX: -10 }]
    // borderColor: "red",
    // borderWidth: 2,
  },
  FilterTextContainer2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  closeContainerContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "teal",
  },
  filterInformationContainer: {
    flex: 4,
    // borderWidth: 2,
    // borderColor: "pink",
  },
  filterHeaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "teal",
  },
  filterHeader: {
    fontFamily: "OpenSansSemiBold",
    textAlign: "center",
    fontSize: 300,
    color: AOBlue
  },
  sliderContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "stretch",
    marginHorizontal: 20,
    // borderColor: "yellow",
    // borderWidth: 3,
  },
  slider: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 3,
  },
  filterInputContainer: {
    height: "70%",
    width: "15%",
    borderColor: AOBlue,
    // borderWidth: 0,
    borderWidth: 2,
    marginBottom: 5,
    // marginBottom: 5
  },
  filterInputContainerContainer: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 0,

  },
  filterInput: {
    flex: 1,
    textAlign: "center",
  },
  closeContainer: {
    position: "absolute",
    marginLeft: 5,
    marginTop: 5,
    top: 0,
    left: 0,
    height: "20%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  rightArrow: {
    // height: "100%",
    // width: "100%",
    // resizeMode: "contain",
    color: AOBlue,
    fontSize: 25,
    // borderWidth: 5,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollArea: {
    zIndex: -1,
    flex: 8,
    backgroundColor: "white",
    // borderColor: "pink",
    // borderWidth: 5,
  },
  scrollView: {
    flex: 1,
  },
  loadingLogoBigContainer: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLogo: {
    alignSelf: "center",
    resizeMode: "contain",
    // borderColor: "blue",
    // borderWidth: 5,
    maxHeight: "10%",
    maxWidth: "10%",
  },
  fullEntry: {
    height: 100,
    // borderColor: "purple",
    // borderWidth: 5,
  },
  entrySample: {
    flex: 1,
    // borderColor: "pink",
    // borderWidth: 5,
    flexDirection: "row",
  },
  seperator: {
    backgroundColor: "rgb(180,180,180)",
    height: 2,
    maxWidth: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  entryImageContainer: {
    // height: "100%",
    // width: "33%",
    flex: 1,
    // borderColor: "red",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%"
  },
  entryImage: {
    resizeMode: "cover",
    // borderColor: "blue",
    // borderWidth: 5,
    height: "95%",
    width: "95%",
  },
  entryInformation: {
    flex: 2,
    // borderColor: "blue",
    // borderWidth: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  entryNameCont: {
    flex: 1,
    marginHorizontal: "5%",
    // borderColor: "black",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  entryName: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "OpenSans",
  },
  entryDescription: {
    fontSize: 10,
    // textAlign: "center",
    // textAlignVertical: "center",
    fontFamily: "OpenSans",
  },
  entryDescriptionCont: {
    flex: 1,
    marginHorizontal: "5%",
    // borderColor: "brown",
    // borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  datalessView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  datalessText: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "OpenSans",
  }
});
