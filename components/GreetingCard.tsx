import { Ionicons } from "@expo/vector-icons";
import { View, ImageSourcePropType, ViewStyle } from "react-native";
import { GestureDetector, PanGesture } from "react-native-gesture-handler";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import {
  Card,
  CardButtons,
  CardFrame,
  CardIconButton,
  CardOverlay,
  Greeting,
} from "../app/index.styles";

const OVERLAY_COLORS = ["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"] as const;
const OVERLAY_START = { x: 0, y: 0 };
const OVERLAY_END = { x: 0, y: 1 };

type Props = {
  cardRef: React.RefObject<null>;
  cardStyle: AnimatedStyle<ViewStyle>;
  image: ImageSourcePropType;
  gesture: PanGesture;
  dragStyle: AnimatedStyle<ViewStyle>;
  greetingAnimatedStyle: AnimatedStyle<ViewStyle>;
  text: string;
  font: { fontFamily: string; fontSize: number; lineHeight: number };
  textColor: string;
  changeImage: () => void;
  changeFont: () => void;
  changeColor: () => void;
};

export function GreetingCard({
  cardRef,
  cardStyle,
  image,
  gesture,
  dragStyle,
  greetingAnimatedStyle,
  text,
  font,
  textColor,
  changeImage,
  changeFont,
  changeColor,
}: Props) {
  return (
    <Animated.View style={cardStyle}>
      <CardFrame>
        <View ref={cardRef} collapsable={false} style={{ flex: 1 }}>
          <Card source={image} resizeMode="cover">
            <CardOverlay
              colors={OVERLAY_COLORS}
              start={OVERLAY_START}
              end={OVERLAY_END}
            >
              <GestureDetector gesture={gesture}>
                <Animated.View style={dragStyle}>
                  <Animated.View style={greetingAnimatedStyle}>
                    <Greeting style={[font, { color: textColor }]}>{text}</Greeting>
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            </CardOverlay>
          </Card>
        </View>
      </CardFrame>

      <CardButtons
        colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <CardIconButton onPress={changeImage}>
          <Ionicons name="image-outline" size={18} color="white" />
        </CardIconButton>

        <CardIconButton onPress={changeFont}>
          <Ionicons name="text-outline" size={18} color="white" />
        </CardIconButton>

        <CardIconButton onPress={changeColor}>
          <Ionicons name="color-palette-outline" size={18} color="white" />
        </CardIconButton>
      </CardButtons>
    </Animated.View>
  );
}
