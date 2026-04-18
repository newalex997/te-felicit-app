import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { AnimatedStyle, useAnimatedStyle } from "react-native-reanimated";
import { styled } from "styled-components/native";
import { TextEffect } from "../../context/useTextBlockState";
import { TextElementState } from "./useTextElementState";

const STROKE_OFFSETS: [number, number][] = [
  [-1.5, -1.5], [-1.5, 0], [-1.5, 1.5],
  [0, -1.5],               [0, 1.5],
  [1.5, -1.5],  [1.5, 0],  [1.5, 1.5],
];

const SelectionBorder = styled.View<{ $selected: boolean }>`
  border-width: 1.5px;
  border-style: dashed;
  border-color: ${({ $selected }) => ($selected ? "rgba(255, 255, 255, 0.7)" : "transparent")};
  border-radius: 6px;
  padding: 6px;
`;

const StrokeLayer = styled(Animated.Text)`
  position: absolute;
`;

type Props = {
  children: string;
  state: TextElementState;
  style: StyleProp<TextStyle>;
  animatedStyle?: AnimatedStyle<ViewStyle>;
  isSelected?: boolean;
  onTap?: () => void;
  textEffect?: TextEffect;
  strokeColor?: string;
};

export function DraggableText({
  children,
  state,
  style,
  animatedStyle,
  isSelected = false,
  onTap,
  textEffect,
  strokeColor,
}: Props) {
  const { x, y, baseFontSize, baseLineHeight } = state;

  const panGesture = Gesture.Pan().onChange((e) => {
    x.value += e.changeX;
    y.value += e.changeY;
  });

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => onTap?.());

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const sizeStyle = useAnimatedStyle(() => ({
    fontSize: baseFontSize.value,
    lineHeight: baseLineHeight.value,
  }));

  const textContent =
    textEffect === "border" && strokeColor ? (
      <Animated.View>
        {STROKE_OFFSETS.map(([dx, dy]) => (
          <StrokeLayer
            key={`${dx}-${dy}`}
            style={[style, sizeStyle, { color: strokeColor, transform: [{ translateX: dx }, { translateY: dy }] }]}
            aria-hidden
          >
            {children}
          </StrokeLayer>
        ))}
        <Animated.Text style={[style, sizeStyle]}>{children}</Animated.Text>
      </Animated.View>
    ) : (
      <Animated.Text style={[style, sizeStyle]}>{children}</Animated.Text>
    );

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture, tapGesture)}>
      <Animated.View style={dragStyle}>
        <Animated.View style={animatedStyle}>
          <SelectionBorder $selected={isSelected}>
            {textContent}
          </SelectionBorder>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
