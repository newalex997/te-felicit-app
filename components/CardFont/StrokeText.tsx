import { StyleProp, TextStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { styled } from "styled-components/native";

const STROKE_OFFSETS: [number, number][] = [
  [-1.5, -1.5],
  [-1.5, 0],
  [-1.5, 1.5],
  [0, -1.5],
  [0, 1.5],
  [1.5, -1.5],
  [1.5, 0],
  [1.5, 1.5],
];

const StrokeLayer = styled(Animated.Text)`
  position: absolute;
`;

type Props = {
  children: string;
  style: StyleProp<TextStyle>;
  sizeStyle: AnimatedStyle<TextStyle>;
  strokeColor: string;
};

export function StrokeText({ children, style, sizeStyle, strokeColor }: Props) {
  return (
    <Animated.View>
      {STROKE_OFFSETS.map(([dx, dy]) => (
        <StrokeLayer
          key={`${dx}-${dy}`}
          style={[
            style,
            sizeStyle,
            {
              color: strokeColor,
              transform: [{ translateX: dx }, { translateY: dy }],
            },
          ]}
          aria-hidden
        >
          {children}
        </StrokeLayer>
      ))}
      <Animated.Text style={[style, sizeStyle]}>{children}</Animated.Text>
    </Animated.View>
  );
}
