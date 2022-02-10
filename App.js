import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './components/Notes';
import ModifyNotes from './components/ModifyNotes';
import Calendar from './components/Calendar';
import Week from './components/Week';
import NewNote from './components/NewNote';
import User from './components/User';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { func } from 'prop-types';
import { TapGestureHandler } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

// const Stack = createNativeStackNavigator();

export default function App({navigation}){
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Week'>
        <Tab.Screen name="Schedule" component={Week} />
        <Tab.Screen name="Notes" component={Notes} options={{ headerShown: false }}/>
        <Tab.Screen name="NewNote" component={NewNote} options={{ headerShown: false }}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <TouchableOpacity>
        //       <View style={{
        //         width: 55,
        //         height: 55,
        //         backgroundColor: 'red',
        //         borderRadius: 30,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         marginBottom: Platform.OS == "android" ? 50 : 30
        //       }} >
        //       </View>
        //     </TouchableOpacity>
        //   )}} 
          />
        <Tab.Screen name="User" component={User} />
        {/* <Tab.Screen name="Notes" component={Notes} screenOptions={{headerShown: false}}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home'>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Notes" component={Notes} />
//         <Stack.Screen name="Calendar" component={Calendar} />
//         <Stack.Screen name="NewNote" component={NewNote} />
//         <Stack.Screen name="Schedule" component={Week} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
