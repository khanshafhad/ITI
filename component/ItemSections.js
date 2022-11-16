import React from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';

export const ItemSections = ({name,topMargin = 15,onclick,image='student-launge.png'}) => {
  return (
      <TouchableOpacity style={[styles.rowContainer,{marginTop:topMargin}]} onPress={()=>onclick()}>
    {/* <View style={[styles.rowContainer,{marginTop:topMargin}]}> */}
      <Image
        source={{uri: 'asset:/'+image}}
        style={{width: 50, height: 30}}
        resizeMode="center"
      />
      <Text
        style={{
          fontSize: 15,
          // textAlign: 'center',
          color: '#FFF',
          fontWeight: 'bold',
        }}>
        {name}
      </Text>
    {/* </View> */}
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

    rowContainer: {
      width: '70%',
      flexDirection: 'row',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#fff',
      alignItems: 'center',
      height:40,
      paddingLeft:20
    },
  });