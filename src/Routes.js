/*
 **
 *
 **  =====================================================
 **
 ** AppName: Connect2.0
 ** Version: X.0.0
 ** FileName: Routes.js
 ** UsedFor: Navigation routes for all the pages at connect 2.0 app
 ** Author:
 **
 ** ========================================================
 *
 **
 **
 *
 ** ==========================================================
 ** Navigation route component
 ** ==========================================================
 *
 **
 */

/*
 **
 *
 ** Common react packages import
 *
 **
 */

import React, {useEffect, useMemo, useReducer, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './homeScreen';
import openWebview from './openWebview';
import studentLounge from "./studentLounge";
import studentHolidays from "./studentHolidays";
import Announcements from "./Announcements";

Announcements

const Stack = createStackNavigator();

/**
 * Routes matain the navigation stacks
 */
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={homeScreen} name="homeScreen" />
        <Stack.Screen component={openWebview} name="openWebview" />
        <Stack.Screen component={studentLounge} name="studentLounge" />
        <Stack.Screen component={studentHolidays} name="studentHolidays" />
        <Stack.Screen component={Announcements} name="Announcements" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
