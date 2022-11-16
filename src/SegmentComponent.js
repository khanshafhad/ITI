/*
 **
 *
 ** ========================================================
 **
 ** AppName: Connect2.0
 ** Version: X.0.0
 ** FileName: SegmentComponent.js
 ** UsedFor: Segment Component at connect 2.0 app
 ** Author:
 **
 ** ========================================================
 *
 **
 **
 *
 ** ==========================================================
 **                  Segment component
 ** ==========================================================
 *
 **
 */

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
// import fontFamily from '../utility/Font-Declarations'

export const SegmentComponent = ({onClickSegmentChanged,badgesValue=[2, 2, 0],selectedIndexTab=0,segment_Value=['OPEN', 'CLOSED', 'ASSIGNED'],width='100%',for_allUser=false}) => {
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexTab);
  
  return (
      <View
        style={{
          height: '6.5%',
          backgroundColor: '#ddd',
          width: width,
          justifyContent: 'flex-end',
        }}>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          selectedIndex={selectedIndex}
          badges={badgesValue}
          activeTabBadgeContainerStyle={styles.activeTabBadgeContainerStyle}
          activeTabBadgeStyle={styles.activeTabBadgeStyle}
          tabBadgeContainerStyle={styles.tabBadgeContainerStyle}
          tabBadgeStyle={styles.tabBadgeStyle}
          allowFontScaling={true}
          values={segment_Value}
          onTabPress={index => {
            if (for_allUser){
              setSelectedIndex(index)
              onClickSegmentChanged(segment_Value[index])
            } else {
              setSelectedIndex(index)
              onClickSegmentChanged(index == 0 ? 'open' : index == 1 ? 'closed':'assign_chat')
            }
          }}
        />
      </View>
    
  );
};

const styles = StyleSheet.create({
  tabsContainerStyle: {
    //custom styles
    borderRadius: 0,
    borderBottomColor: 'red',
    height: 35,
  },
  tabStyle: {
    //custom styles
    borderRadius: 0,
    borderColor: '#ddd',
    backgroundColor: '#ddd',
  },
  firstTabStyle: {
    //custom styles
  },
  lastTabStyle: {
    //custom styles
  },
  tabTextStyle: {
    //custom styles
    color: '#657180',
    // fontFamily:fontFamily.Alte_DIN,
    fontSize:16

  },
  activeTabStyle: {
    //custom styles
    borderBottomColor: '#0070FC',
    backgroundColor: '#ddd',
    // color:'#000'
  },
  activeTabTextStyle: {
    //custom styles
    color: '#0070FC',

  },
  tabBadgeContainerStyle: {
    //custom styles
    backgroundColor:'rgba(95, 99, 104, 0.1)',
    borderRadius:9,
    // top:3,
    height:16,
    width:22,
    justifyContent:'center'
  },
  activeTabBadgeContainerStyle: {
    //custom styles
    backgroundColor:'#D8E9FF',
    borderRadius:9,
    // top:3,
    height:16,
    width:22,
    justifyContent:'center'

  },
  tabBadgeStyle: {
    //custom styles
    color:'#rgba(95, 99, 104, 1)',
    fontSize:10,
    // fontFamily:fontFamily.Poppins,
    textAlign:'center'
  },
  activeTabBadgeStyle: {
      color:'#0070FC',
      fontSize:10,
      // fontFamily:fontFamily.Poppins,
      textAlign:'center'
    //custom styles
  },
});
