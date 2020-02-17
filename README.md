# react-native-neumorphic

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![CircleCI](https://circleci.com/gh/shaneboyar/react-native-neumorphic.svg?style=svg)](https://circleci.com/gh/shaneboyar/react-native-neumorphic)

Neumorph your components!
Inspired by [Neumorphism.io](https://neumorphism.io/)

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
