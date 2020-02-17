import React from 'react';
import { ViewStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InsetShadow from 'react-native-inset-shadow';

export enum NeumorphConfigShapes {
  'Flat' = 'flat',
  'Concave' = 'concave',
  'Convex' = 'convex',
  'Pressed' = 'pressed',
}

export interface NeumorphConfig {
  distance: number;
  intensity: number;
  blur: number;
  shape: NeumorphConfigShapes;
}

interface ShadowStyles {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;

  elevation: number;
}

interface InsetShadowProps {
  shadowColor: string;
  shadowOffset: number;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

type LinearGradientStops = [string, string];

interface LinearGradientProps {
  colors: LinearGradientStops;
  useAngle: true;
  angle: number;
  angleCenter: {
    x: 0.5;
    y: 0.5;
  };
}

const calculateColor = (baseColor: string, intensity: number) => {
  (baseColor = String(baseColor).replace(/[^0-9a-f]/gi, '')).length < 6 &&
    (baseColor =
      baseColor[0] +
      baseColor[0] +
      baseColor[1] +
      baseColor[1] +
      baseColor[2] +
      baseColor[2]),
    (intensity = intensity || 0);
  let hexIntValue: number | string;
  let n: number;
  let hexString = '#';
  for (n = 0; n < 3; n++)
    (hexIntValue = parseInt(baseColor.substr(2 * n, 2), 16)),
      (hexString += (
        '00' +
        (hexIntValue = Math.round(
          Math.min(Math.max(0, hexIntValue + hexIntValue * intensity), 255)
        ).toString(16))
      ).substr(hexIntValue.length));
  return hexString;
};

const calculateGradientStops = (
  shape: NeumorphConfigShapes,
  baseColor: string
): LinearGradientStops => {
  if (
    shape === NeumorphConfigShapes.Flat ||
    shape === NeumorphConfigShapes.Pressed
  ) {
    return [baseColor, baseColor];
  }

  const gradientColor1 = calculateColor(
    baseColor,
    shape === NeumorphConfigShapes.Convex ? 0.07 : -0.1
  );
  const gradientColor2 = calculateColor(
    baseColor,
    shape === NeumorphConfigShapes.Concave ? 0.07 : -0.1
  );
  return [gradientColor1, gradientColor2];
};

const defaultConfig: NeumorphConfig = {
  distance: 50,
  intensity: 0.15,
  blur: 60,
  shape: NeumorphConfigShapes.Flat,
};

const caluclateNuemorph = (
  backgroundColor: string,
  config: NeumorphConfig = defaultConfig
) => {
  let lightShadow: ShadowStyles | InsetShadowProps;
  let darkShadow: ShadowStyles | InsetShadowProps;

  if (config.shape !== NeumorphConfigShapes.Pressed) {
    lightShadow = {
      shadowColor: calculateColor(backgroundColor, config.intensity),
      shadowOffset: {
        width: -config.distance,
        height: -config.distance,
      },
      shadowOpacity: 1,
      shadowRadius: config.blur,

      elevation: 24,
    } as ShadowStyles;
    darkShadow = {
      shadowColor: calculateColor(backgroundColor, -1 * config.intensity),
      shadowOffset: {
        width: config.distance,
        height: config.distance,
      },
      shadowOpacity: 1,
      shadowRadius: config.blur,

      elevation: 24,
    } as ShadowStyles;
  } else {
    lightShadow = {
      shadowColor: calculateColor(backgroundColor, config.intensity),
      shadowOffset: config.distance,
      top: false,
      left: false,
      shadowOpacity: 1,
      shadowRadius: config.blur,
    } as InsetShadowProps;
    darkShadow = {
      shadowColor: calculateColor(backgroundColor, -1 * config.intensity),
      shadowOffset: -config.distance,
      right: false,
      bottom: false,
      shadowOpacity: 1,
      shadowRadius: config.blur,
    } as InsetShadowProps;
  }

  const gradientProps: LinearGradientProps = {
    useAngle: true,
    angle: 145,
    colors: calculateGradientStops(config.shape, backgroundColor),
    angleCenter: {
      x: 0.5,
      y: 0.5,
    },
  };

  console.log('{ lightShadow, darkShadow, gradient }: ', {
    lightShadow,
    darkShadow,
    gradientProps,
  });
  return { lightShadow, darkShadow, gradientProps };
};

interface IConfigParams {
  backgroundColor: string;
  borderRadius: number;
  height: number;
  width: number;
}

const Neumorph = (Component: any, config?: NeumorphConfig) => {
  const c = Component({});
  const cProps = Component({}).props;
  const cStyle = cProps.style as ViewStyle;
  const {
    backgroundColor = '#FFFFFF',
    height,
    width,
  } = cStyle as IConfigParams;
  const { lightShadow, darkShadow, gradientProps } = caluclateNuemorph(
    backgroundColor,
    config
  );
  const NewComponent =
    !config || config.shape !== NeumorphConfigShapes.Pressed ? (
      <View style={[darkShadow as ShadowStyles, { height, width }]}>
        <View style={lightShadow as ShadowStyles}>
          <LinearGradient {...{ style: cStyle, ...gradientProps }}>
            {c.props.children}
          </LinearGradient>
        </View>
      </View>
    ) : (
      <View style={{ height, width }}>
        <InsetShadow {...lightShadow}>
          <InsetShadow {...darkShadow}>
            <LinearGradient {...{ style: cStyle, ...gradientProps }}>
              {c.props.children}
            </LinearGradient>
          </InsetShadow>
        </InsetShadow>
      </View>
    );

  return () => NewComponent;
};

export default Neumorph;
