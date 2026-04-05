import { Ionicons } from "@expo/vector-icons";
import { View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import {
  Card,
  CardButtons,
  CardFrame,
  CardIconButton,
  CardOverlay,
} from "../app/index.styles";
import { CardFont } from "./CardFont";

const OVERLAY_COLORS = ["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"] as const;
const OVERLAY_START = { x: 0, y: 0 };
const OVERLAY_END = { x: 0, y: 1 };
const cardViewStyle = { flex: 1, backgroundColor: "black" } as const;

type Props = {
  cardStyle: AnimatedStyle<ViewStyle>;
};

export function GreetingCard({ cardStyle }: Props) {
  const { imageUrl, changeFont, changeSloganFont, changeImage, changeColor } =
    useGreetingContext();
  const { cardRef } = useShareContext();

  return (
    <Animated.View style={cardStyle}>
      <CardFrame>
        <View ref={cardRef} collapsable={false} style={cardViewStyle}>
          <Card source={{ uri: imageUrl }} resizeMode="cover">
            <CardOverlay
              colors={OVERLAY_COLORS}
              start={OVERLAY_START}
              end={OVERLAY_END}
            >
              <CardFont />
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

        <CardIconButton onPress={changeSloganFont}>
          <Ionicons
            name="text-outline"
            size={14}
            color="rgba(255,255,255,0.6)"
          />
        </CardIconButton>

        <CardIconButton onPress={changeColor}>
          <Ionicons name="color-palette-outline" size={18} color="white" />
        </CardIconButton>
      </CardButtons>
    </Animated.View>
  );
}
