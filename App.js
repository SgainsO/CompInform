import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import SelectCity from './navigation/SelectCity.js'
import NavClient from './navigation/NavClient.js'
const height = Dimensions.get('window').height * 0.5;
const width = Dimensions.get('window').width;




export default function App() {
  
  console.log("Project Started")

  return (
        <SelectCity/>
  );
}

