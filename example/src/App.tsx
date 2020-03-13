/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import Neumorph, { NeumorphConfigShapes } from 'react-native-neumorphic';

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

const config = {
  distance: 50,
  intensity: 0.15,
  blur: 60,
  shape: NeumorphConfigShapes.Flat,
};

const NeumorphicBox = Neumorph(Box, config);

export default function App() {
  const [neumorph, setNuemorph] = React.useState(false);
  return (
    <View style={styles.container}>
      <Switch
        value={neumorph}
        onValueChange={setNuemorph}
        style={{ marginBottom: 32 }}
      />
      {neumorph ? <NeumorphicBox /> : <Box borderWidth={1} />}
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
