import { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import {
  Card,
  CardButtonsContainer,
  CardFrame,
  CardOverlay,
} from "../styles/index.styles";
import { CardImageButtons } from "./CardImageButtons";
import { CardFont } from "./CardFont";
import { Watermark } from "./Watermark";

const CARD_FADE_DURATION = 800;
const OVERLAY_COLORS = ["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"] as const;
const OVERLAY_START = { x: 0, y: 0 };
const OVERLAY_END = { x: 0, y: 1 };
const cardViewStyle = { flex: 1, backgroundColor: "black" } as const;

type Props = {
  cardStyle: AnimatedStyle<ViewStyle>;
};

export function GreetingCard({ cardStyle }: Props) {
  const { imageUrl, setImageLoaded } = useGreetingContext();
  const { cardRef } = useShareContext();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = 0;
  }, [imageUrl, opacity]);

  function handleImageLoad() {
    setImageLoaded();
    opacity.value = withTiming(1, { duration: CARD_FADE_DURATION });
  }

  const imageStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={cardStyle}>
      <CardFrame>
        <View ref={cardRef} collapsable={false} style={cardViewStyle}>
          <Animated.View style={[{ flex: 1 }, imageStyle]}>
            <Card source={imageUrl ? { uri: imageUrl } : undefined} resizeMode="cover" onLoadEnd={handleImageLoad}>
              <CardOverlay
                colors={OVERLAY_COLORS}
                start={OVERLAY_START}
                end={OVERLAY_END}
              >
                <CardFont />
                <Watermark />
              </CardOverlay>
            </Card>
          </Animated.View>
        </View>
      </CardFrame>

      <CardButtonsContainer>
        <CardImageButtons />
      </CardButtonsContainer>
    </Animated.View>
  );
}
