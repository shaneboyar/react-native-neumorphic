# react-native-neumorphic

Neumorph your components!

## Installation

```sh
npm install react-native-neumorphic
```

## Usage

```js
import Component from 'some-module';
import Neumorphic from 'react-native-neumorphic';

// ...
// You can pass an optional configuration object, if you don't this is what it will default to
const config = {
  distance: 50,
  intensity: 0.15,
  blur: 60,
  shape: NeumorphConfigShapes.Flat,
};
const NeumorphicComponent = Neumorphic(Component, config);

// ...

<Neumorphic />;
```

## License

MIT
