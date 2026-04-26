import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TextEffect } from "../../context/useTextBlockState";
import { StrokeText } from "./StrokeText";
import { TextElementState } from "./useTextElementState";
import { useTextGestures } from "./useTextGestures";

type Props = {
  children: string;
  state: TextElementState;
  style: StyleProp<TextStyle>;
  animatedStyle?: AnimatedStyle<ViewStyle>;
  onTap?: () => void;
  textEffect?: TextEffect;
  strokeColor?: string;
};

export function DraggableText({
  children,
  state,
  style,
  animatedStyle,
  onTap,
  textEffect,
  strokeColor,
}: Props) {
  const { gesture, dragStyle } = useTextGestures(state, { onTap });

  const sizeStyle = useAnimatedStyle(() => ({
    fontSize: state.baseFontSize.value,
    lineHeight: state.baseLineHeight.value,
  }));

  function renderText() {
    if (textEffect === "border" && strokeColor) {
      return (
        <StrokeText
          style={style}
          sizeStyle={sizeStyle}
          strokeColor={strokeColor}
        >
          {children}
        </StrokeText>
      );
    }
    return <Animated.Text style={[style, sizeStyle]}>{children}</Animated.Text>;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={dragStyle}>
        <Animated.View style={animatedStyle}>
          <View style={{ padding: 6 }}>{renderText()}</View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
