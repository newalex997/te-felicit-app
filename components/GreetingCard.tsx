import { View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import {
  Card,
  CardButtonsContainer,
  CardFrame,
  CardOverlay,
} from "../app/index.styles";
import { CardFontButtons } from "./CardFont/CardFontButtons";
import { CardImageButtons } from "./CardImageButtons";
import { CardFont } from "./CardFont";

const OVERLAY_COLORS = ["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"] as const;
const OVERLAY_START = { x: 0, y: 0 };
const OVERLAY_END = { x: 0, y: 1 };
const cardViewStyle = { flex: 1, backgroundColor: "black" } as const;

type Props = {
  cardStyle: AnimatedStyle<ViewStyle>;
};

export function GreetingCard({ cardStyle }: Props) {
  const { imageUrl } = useGreetingContext();
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

      <CardButtonsContainer>
        <CardImageButtons />
        <CardFontButtons />
      </CardButtonsContainer>
    </Animated.View>
  );
}
