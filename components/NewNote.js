import React, {useState} from "react";
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Navigator
import { NavigationContainer } from '@react-navigation/native';
import ModifyNotes from './ModifyNotes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendar from './Calendar';
// import ModifyNotes from './ModifyNotes';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName='Notes'>
        <Stack.Screen name="Choose a note" component={ViewBetweenScreens} />
        <Stack.Screen name="Notes" component={NormalNotes} />
        <Stack.Screen name="NoteForDay" component={NoteForDay} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="ModifyNotes" component={ModifyNotes} />
      </Stack.Navigator>
  );
}

function ViewBetweenScreens({ navigation }){
  return(
    <View>
      <Button title="Normal Note" onPress={() => {navigation.navigate("Notes")}} />
      <Button title="Note for a day" onPress={() => {navigation.navigate("NoteForDay")}} />
    </View>
  )
}

const NormalNotes = ({route, navigation }) => {
    const [title, onChangeTitle] = React.useState(null);
    const [text, onChangeText] = React.useState(null);
    const note = {title, text};
    const saveNote = async (parameter) => {
      console.log("SAVED")
      await AsyncStorage.removeItem("NotesObject");
      await AsyncStorage.setItem("NotesObject", JSON.stringify(parameter));
    }
  
    const saveNewNote = async () => {
      let numberNote = await AsyncStorage.getItem("noteNumber");
      console.log(numberNote);
      console.log("HOLA");
      if (numberNote === null){
        let numberNote = 0;
        await AsyncStorage.setItem("noteNumber", JSON.stringify(numberNote));
        console.log("NULLLLLLLLLL")
      }
      else{
        console.log("OTROOOOOOOo")
        numberNote++;
        await AsyncStorage.removeItem("noteNumber");
        await AsyncStorage.setItem("noteNumber", JSON.stringify(numberNote)); 
      }
      
    AsyncStorage.getItem("NotesObject").then((userName) => {
        let notaName = "noteNumber" + numberNote;
        userName = JSON.parse(userName);
        userName[notaName] = note
        alert(JSON.stringify(userName));
        saveNote(userName);
      })
    }
    
    //Route for create a new note
    return(
      <View>
        <TextInput onChangeText={onChangeTitle} placeholder="Write a title..." style={{ fontSize: 30 }}/>
        <TextInput onChangeText={onChangeText} placeholder="Write something..." multiline={true} style={{ fontSize: 20 } }/>
        <Button title="Calendar your note" onPress={() => navigation.navigate("Calendar")}/>
        <Button title="Save" onPress={saveNewNote} />
      </View>
      )}
    
  // export default Notes;

function NoteForDay(){
  return(
    <View>
      <Text>Hola</Text>
    </View>
  )
}