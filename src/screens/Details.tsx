import {View, Text} from 'react-native';
import React from 'react';

export default function Details({route}) {
  const item = route.params;
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}
