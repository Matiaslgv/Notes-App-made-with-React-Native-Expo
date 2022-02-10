import React from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, ScrollView, StatusBar  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

//Navigator
import { NavigationContainer } from '@react-navigation/native';
import ModifyNotes from './ModifyNotes';
import CalendarScreen from "./Calendar";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//It is used to bring the notes from the memory
const chargeNotes  = async () => {
  const notesMemory = await AsyncStorage. getItem("NotesObject");
  notes = JSON.parse(notesMemory);
  // date = new Date().getDay(),
  // console.log(date)
  console.log("notes");
}

export default function App() {
  return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ModifyNotes" component={ModifyNotes} />
        <Stack.Screen name="Calendario" component={CalendarScreen}/>
      </Stack.Navigator>
  );
}

class Home extends React.Component {
  state = {
    isReady: false,
  };

  refresh = () => this.setState(
    chargeNotes,
  )

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => this.setState(
      chargeNotes,
    )
    );
    setInterval(() => {
      this.setState({
      })
    },100);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); }
      const variable = this.props;

    //Verify if variable "notes"(who contain a object whith the notes of the user) exist
    if (typeof notes !== 'undefined' && notes !== null){
      //If "notes" exist but no have any note
      if (Object.keys(notes).length === 0 && Object.getPrototypeOf(notes) === Object.prototype){
      return (
        <View>
          {/* <Button title="Create a new note" onPress={() => this.props.navigation.navigate("Notes", {Note : "Nothing"})} /> */}
          {/* <Button onPress={this.refresh} title="Refresh notes"/> */}
          <Text style={{fontSize: 20, fontWeight: "bold"}}>{'\n'}You don´t have any note{'\n'}</Text>
        </View>
      );}
      //"notes" exist and have notes
      else{
        return (
          <View>
            {/* <Button title="Create a new note" onPress={() => this.props.navigation.navigate("Notes", {Note : "Nothing"})} /> */}
            {/* <Button onPress={this.refresh} style={styles.Touchable} title="Refresh notes"/> */}
            {/* <Text style={{fontSize: 20, fontWeight: "bold"}}>{'\n'}   Notes:{'\n'}</Text> */}
            <SafeAreaView style={{height:"100%"}}>
              <ScrollView style={{marginHorizontal: 10}}>
              {
                Object.keys(notes).reverse().map(function(key) {
                return (<Button title={JSON.stringify(notes[key]["title"]).slice(1,-1)} key={key}  onPress={() => variable.navigation.navigate("ModifyNotes", {Note : notes[key], Key: key})}/>);})
              }
              </ScrollView>
            </SafeAreaView>
          </View>
        );}
    }
    //"notes" don´t exist, usually when open the aplication for first time
    else{
      return (
        <View>
          {/* <Button title="Create a new note" onPress={() => this.props.navigation.navigate("Notes", {Note : "Nothing"})} /> */}
          {/* <Button onPress={this.refresh} title="Refresh notes"/> */}
          <Text style={{fontSize: 20, fontWeight: "bold"}}>{'\n'}You don´t have any note{'\n'}</Text>
        </View>
      );
    }
  }

  //Is used to create the necessary data in memory and update the same
  async _cacheResourcesAsync() {
    const notesMemory = await AsyncStorage. getItem("NotesObject");
    const notes = JSON.parse(notesMemory);
    if (notes === null){
      console.log("Entro")
      const notesObject = {}
      await AsyncStorage.setItem("NotesObject", JSON.stringify(notesObject))
    }
  }
}



const styles = StyleSheet.create({
  Touchable: {
    backgroundColor: "lightgreen",
  }
});