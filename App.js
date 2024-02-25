import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePostScreen from './UpdatePostScreen';
import NewPostScreen from './NewPostScreen';
import HomeScreen from './HomeScreen';
import ScrollViewScreen from './ScrollViewScreen';
import SearchScreen from './SearchSreen';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import UsersScreen from './UsersScreen';
import React, { useState, useEffect } from 'react';
import UpdateUserScreen from './UpdateUserScreen';


export default function App() {

  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isAdm, setIsAdm] = useState();
  const [userConnect, setUserConnect] = useState();
  
  console.log(isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {({ navigation }) => <HomeScreen navigation={navigation} isAdm={isAdm} userConnect={userConnect} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="New Book Post" >
          {({ navigation }) => <NewPostScreen navigation={navigation} publisher={isLoggedIn} />}
          </Stack.Screen>
        <Stack.Screen name="Book Post">
          {({ navigation }) => <ScrollViewScreen navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen name="Update your post"  component={UpdatePostScreen}/>
        <Stack.Screen name="Update your user"  component={UpdateUserScreen}/>
        <Stack.Screen name="Search post">
        {({ navigation }) => <SearchScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Login" >
        {({ navigation }) => <LoginScreen navigation={navigation} setIsAdm={setIsAdm} setUserConnect={setUserConnect} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" >
        {({ navigation }) => <CreateAccountScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Users" >
        {({ navigation }) => <UsersScreen navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

