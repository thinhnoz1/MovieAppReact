import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, Header } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Colors } from 'react-native-paper';
import Home from './Layout/Home';
import Movie_rank from './Layout/Movie_rank';
import Category from './Layout/Category';
import Search from './Layout/Search';
import YouTubePlayer from 'react-native-youtube-sdk';
import ReactPlayer from 'react-player';

function HomeScreen({ navigation }) {
  return (
    <Home />
  );
}

function MrankScreen({ navigation }) {
  return (
    <Movie_rank />
  );
}

function CategoryScreen({ navigation }) {
  return (
    <Category />
  );
}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="Main"
      drawerContentOptions={
        {labelStyle:{
          color:'white',
          fontWeight:'bold',
          fontSize: 16,
        }}
      }
      drawerStyle={{backgroundColor:'#444444'}}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Movie Rank" component={MrankScreen} />
        <Drawer.Screen name="Category" component={CategoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
  },

});
