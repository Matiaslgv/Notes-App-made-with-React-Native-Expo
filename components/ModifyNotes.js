import React, {useState} from "react";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Navigator
import CalendarScreen from './Calendar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// export default function App({ route, navigation }) {
//   return (
//       <Stack.Navigator initialRouteName='Notes'>
//         <Stack.Screen name="Notes" component={() => {<Notes/>} } />
//         {/* <Stack.Screen name="Notes" component={NormalNotes} /> */}
//         {/* <Stack.Screen name="NoteForDay" component={NoteForDay} /> */}
//         <Stack.Screen name="Calendar" component={Calendar} />
//         {/* { console.log(route ) } */}
//       </Stack.Navigator>
//   );
// }

function Notes ({route, navigation }) {
  console.log(route);
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
  
  const saveExistingNote = async () => {
    let notesObject = await AsyncStorage.getItem("NotesObject");
    notesObject = JSON.parse(notesObject)
    await AsyncStorage.removeItem("NotesObject");
    const entrada = JSON.stringify(route["params"["Key"]])
    if (title !== null){
      notesObject[(route["params"]["Key"])]["title"] = title;
    }
    if (text !== null){
      notesObject[(route["params"]["Key"])]["text"] = text;
    }
    await AsyncStorage.setItem("NotesObject", JSON.stringify(notesObject));
    alert("SAVED");
  }
  
  //Route for create a new note
  console.log(route);
  if (route["params"]["Note"] === "Nothing"){
  return(
    <View>
      <TextInput defaultValue={(route["params"]["Note"]["title"])} onChangeText={onChangeTitle} placeholder="Write a title..." style={{ fontSize: 30 }}/>
      <TextInput defaultValue={(route["params"]["Note"]["text"])} onChangeText={onChangeText} placeholder="Write something..." multiline={true} style={{ fontSize: 20 } }/>
      <Button title="Calendar your note" onPress={() => navigation.navigate("Calendario")}/>
      <Button title="Save" onPress={saveNewNote} />
    </View>
    )}
  //Route for edit a note
  else {
    return(
    <View>
      <TextInput defaultValue={(route["params"]["Note"]["title"])} onChangeText={onChangeTitle} placeholder="Write a title..." style={{ fontSize: 30 }}/>
      <TextInput defaultValue={(route["params"]["Note"]["text"])} onChangeText={onChangeText} placeholder="Write something..." multiline={true} style={{ fontSize: 20 } }/>
      <Button title="Calendar your note" onPress={() => navigation.navigate("Calendario")}/>
      <Button title="Save" onPress={saveExistingNote} />
      {/* <Button title="Go back" onPress={() => navigation.navigate('Home')}/> */}
    </View>
    )}
}
  
export default Notes;