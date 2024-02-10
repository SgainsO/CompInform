import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Card from './components/card.js'; // Assuming both files are in the same directory
const {width, height} = Dimensions.get('window')
cardHeight = height * 1/6
segmentWidth = width * 1/2



const SelectCity = () => {
  const [ContentViewHeight, setContentViewHeight] = useState(0)

  const GetHeight = (event) =>
  {
    const {height} = event.nativeEvent.layout;
    setContentViewHeight(height)
  }
 
  return (
    <View style = {styles.Main}>
      <View style = {styles.TileHolder} onLayout={GetHeight}>
      <Text style={{textAlign: 'center', fontSize: 46, padding: 5, color: "grey"}}>Select County</Text>
      </View>
    <View style = {[styles.LeftCategory, { height: height - ContentViewHeight, top : ContentViewHeight }, ]}>
    <View style = {styles.CardKeeper}>
      <Card style = {{height : '10%', aspectRatio: 1}} imageUrl={require("./assets/atl.jpg")} text="COUNTRY 2" />
      <Card imageUrl={require("./assets/det.jpg")} text = "COUNTY 1" />
      </View>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
    Main:
    {
        backgroundColor: '#b7b9ec',
        height: height,
        width: width
    },
    TileHolder:
    {
      position: 'absolute',
      top: 0,
      width: width,  
      borderBottomWidth: 5,
    },
    LeftCategory:
    {
      position: "absolute",
      left: 0,
      width: segmentWidth
      
    },
  
    LeftCategoryInner:
    {
      transform: [{rotateY: '180deg'}],
    },
    CardKeeper:{
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        flex: 1,
//        backgroundColor: '#b7b9ec'
    }

    

})

export default SelectCity;