import React, { useState,  useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Touchable, TouchableOpacity, Image } from 'react-native';
import Card from './components/card.js'; // Assuming both files are in the same directory
const {width, height} = Dimensions.get('window')
cardHeight = height * 1/6
segmentWidth = width * 1/2
import {GetPrompt} from "./components/api_connect.js"



const SelectCity = () => {
  const [ContentViewHeight, setContentViewHeight] = useState(0)
  const [Location, SetLocation] = useState("Tampa")
  const [ResponseText, ChangeResponse] = useState(" ") 
  const [r2, cr2] = useState(" ")
  const GetHeight = (event) =>
  {
    const {height} = event.nativeEvent.layout;
    setContentViewHeight(height)
  }
  const AskYou = async (area, q1, q2) => {
    const resp = await GetPrompt(q1 + area)
    ChangeResponse(resp.result);

    const respe = await GetPrompt(q1 + area)
    cr2(respe.result);
  }


  return (
    <View style = {styles.Main}>
      <View style = {styles.TileHolder} onLayout={GetHeight}>
        <Text style={{textAlign: 'center', fontSize: 46, padding: 5, color: "grey"}}>Select County</Text>
      </View>

      <View style = {[styles.LeftCategory, { height: height - ContentViewHeight, top : ContentViewHeight }, ]}>
        <View style = {styles.CardKeeper}>
          <Card style = {{height : '10%', aspectRatio: 1}} imageUrl={require("./assets/atl.jpg")} text="Atlanta (city)" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Cherokee County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Cobb County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Douglas County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Forsyth County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Gwinnett County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Rockdale County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Clayton County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "DeKalb County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Fayette County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Fulton County" />
          <Card imageUrl={require("./assets/det.jpg")} text = "Henry County" />
        </View>
      </View>

      <View style = {[styles.RightCategory, { height: height - ContentViewHeight, top : ContentViewHeight }, ]}>
        <View style = {styles.TabloHold}>
          <Image source = {require('./assets/atl.jpg')} style = {styles.Tablo} />
          </View>
          <TouchableOpacity style= {styles.Button} onPressIn={() => 
            {AskYou(Location, "What kind of permits should someone have before making a restraunt in Tampa.")}}>
            <Text>More Information</Text>
          </TouchableOpacity>
          <View style = {styles.ParagraphVIew}>
            <Text style = {{fontWeight: 'bold', textAlign: 'center'}}>General inforamation</Text>
            <Text>{ResponseText}</Text>
 
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
    RightCategory:
    {
      position: "absolute",
      right: 0,
      width: segmentWidth
      
    },
    ButtonContainer:
    {
      justifyContent: 'center',
      width: segmentWidth /2,
      flexDirection: 'row'
    },
    ChoiceBtn:
    {
      margin: 10
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
    },
    TabloHold:
    {
      aspectRatio: 1,
      alignSelf: 'center', 
      marginLeft: 20,
      marginRight: 20,
      marginTop: 80,
      marginBottom: 30,
      width: segmentWidth - 80,
      backgroundColor: "black",
      height: height * 1/2 - 40

    },
    Tablo:
    {
      flex: 1,
      resizeMode: 'contain',
      width : '100%',
      aspectRatio: 1,
    },
    ParagraphVIew:
    {
      textAlign: 'center',
      margin: 10
    },
    Button:
    {
      padding: 20,
      alignSelf: 'center',
      backgroundColor: '#dcda98',
      justifyContent: 'center',
      alignContent: 'center'
    }

    

})

export default SelectCity;