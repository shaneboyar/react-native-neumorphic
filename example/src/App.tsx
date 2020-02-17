/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Neumorph, {
  NeumorphConfig,
  NeumorphConfigShapes,
} from 'react-native-neumorphic';

const Box = ({ borderWidth = 0 }) => (
  <View
    style={{
      height: 300,
      width: 300,
      backgroundColor: '#f360df',
      borderWidth,
    }}
  />
);

const config: NeumorphConfig = {
  distance: 40,
  intensity: 0.6,
  blur: 40,
  shape: NeumorphConfigShapes.Flat,
};

const NeumorphicBox = Neumorph(Box, config);

export default function App() {
  return (
    <View style={styles.container}>
      <NeumorphicBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f360df',
  },
});
