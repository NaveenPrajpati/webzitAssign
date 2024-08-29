import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Details from './Details';
import GreenLivingTips from './GreenLivingTips';

const Stack = createNativeStackNavigator();
export default function DetailNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GreenLivingTips" component={GreenLivingTips} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
