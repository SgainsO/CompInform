import React, { useState,  useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import Card from './components/card.js'; // Assuming both files are in the same directory
const {width, height} = Dimensions.get('window')
cardHeight = height * 1/6
segmentWidth = width * 1/2
import {GetPrompt, GetResults} from "./components/api_connect.js"



const SelectCity = () => {

  const FOODCHOICE = 
  {
    COFFEE: 0,
    AMERICAN: 1,
    ASIAN: 2,
    BARS: 3,
    DESERT: 4,
    MEXICAN: 5,
    ITALIAN: 6,
    TRUCK: 7,
    ANY: 8

  }

  Object.freeze(FOODCHOICE)

  const [ContentViewHeight, setContentViewHeight] = useState(0)
  const [Location, SetLocation] = useState("Tampa")
  const [ResponseText, ChangeResponse] = useState(" ") 
  const [r2, cr2] = useState(" ")
  const [Budget, setBudget] = useState()
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

  const GetInfo = async (cat, d) => {
    const resp = await GetResults(cat, d)
  }

  

  return (
    <View style = {styles.Main}>
      <View style = {styles.TileHolder} onLayout={GetHeight}>
        <Text style={{textAlign: 'center', fontSize: 46, padding: 5, color: "grey"}}>Future Feast Analytics</Text>
      </View>

      <View style = {[styles.LeftCategory, { height: height - ContentViewHeight, top : ContentViewHeight }, ]}>
        <TextInput
        style = {styles.TextInput}
        value= {Budget}
        onChangeText={(inputText) => {setBudget(inputText)}}
        placeholder='Type your budget here'
        />
        <View style = {styles.ButtonContainer}>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>Cafe</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>American</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>Asian</Text></TouchableOpacity>
        </View>
        <View style = {styles.ButtonContainer}>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>Bars</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>Desert</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center", top: '30%'}}>Mexican</Text></TouchableOpacity>
        </View>
        <View style = {styles.ButtonContainer}>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center",top: "30%"}}>Italian</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center",top: "30%"}}>Truck</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.ChoiceBtn}><Text style = {{textAlign: "center",top: "30%"}}>Any</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress = {
          () => GetInfo(150000, 5)
        } style = {styles.PredictButton}><Text style = {{textAlign: "center", top: "30%"}}>Predict</Text></TouchableOpacity>
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
      width: segmentWidth,
      borderRightWidth: 3,
      borderColor: 'grey',
      alignContent: 'center',
      backgroundColor: '#b7b9ec'
    },
    TextInput:
    {
      height: "10%",
      marginTop: '8%',
      alignSelf: "center",
      textAlign: "center",
      backgroundColor : 'grey',
      width: segmentWidth * 2/3,
      borderRadius: 5,
      fontSize: 20
    },
    RightCategory:
    {
      position: "absolute",
      right: 0,
      width: segmentWidth
      
    },
    ButtonContainer:
    {
      left: '17%',
      marginTop: '10%',
      alignContent: 'center',
      justifyContent: 'space-between',
      width: segmentWidth * 2/3 - 10,
      flexDirection: 'row'
    },
    ChoiceBtn:
    {
      flex: 1,
      textAlign: 'center',
      backgroundColor: "#dcda98",
      height: '100%',
      margin: 10, 
      borderRadius: 5
    },
    PredictButton:
    {
      width: segmentWidth * 2/3 - 10,
      left: '17%',
      backgroundColor: '#dcda98',
      borderRadius: 5,
      height: '5%',
      marginTop: '20%'
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
      alignContent: 'center',
      borderRadius: 10
    }

    

})

export default SelectCity;