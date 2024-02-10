import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const {width, height }= Dimensions.get('window')
const ImageWidth = width * 1/20
const ImageH = height * 1/20
cardHeight = 100
cardWidth = width * 1/2

const Card = ({ imageUrl, text }) => {
  const [PictureLen, SetPictureLen] = useState(0)
  const GetWidth = (event) =>
  {
    const {width} = event.nativeEvent.layout;
    SetPictureLen(width)
  }
  
  return (
    <View styles={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', flexDirection: 'column'}}>
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} onLayout={GetWidth}/>
      </View>
      <View style={[styles.textContainer, {width: cardWidth - PictureLen}]}>
        <Text style = {{alignText: 'center', fontWeight: "bold", color: "grey", fontSize: 27}}>{text}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: cardHeight,
    width: cardWidth,
    resizeMode: 'contain',
    overflow: "hidden"

    
  },
  imageContainer: {
    position: 'absolute',
    left: 20,
    bottom: 3,
    height : cardHeight,
    aspectRatio: 1,
    resizeMode: 'contain',

    height: '100%',
    width: '20%'

  },
  image: {
    flex: 1,
    width: 150,
    padding: '10',
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 5,
    borderBlockColor: 'black',
    borderRightWidth: 5, 

  },
  textContainer: {
    position: 'absolute',
    height: cardHeight,
    right: 0,
    bottom: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black'
  },
});

export default Card;
