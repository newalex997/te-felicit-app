import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { useDraggableText } from "../hooks/useDraggableText";
import {
  Buttons,
  Card,
  CardButtons,
  CardFrame,
  CardIconButton,
  CardOverlay,
  Container,
  Greeting,
  ShareButton,
  ShareText,
  TryAnotherButton,
  TryAnotherText,
} from "./index.styles";

const OVERLAY_COLORS = ["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"] as const;
const OVERLAY_START = { x: 0, y: 0 };
const OVERLAY_END = { x: 0, y: 1 };

export default function Index() {
  const insets = useSafeAreaInsets();
  const {
    text,
    image,
    loading,
    font,
    greetingAnimatedStyle,
    fetchGreeting,
    changeFont,
    changeImage,
  } = useGreetingContext();
  const { gesture, dragStyle } = useDraggableText();
  const { cardStyle, swipe } = useCardSwipe(fetchGreeting);
  const { cardRef, share, sharing } = useShareContext();

  return (
    <Container>
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
                      <Greeting style={font}>{text}</Greeting>
                    </Animated.View>
                  </Animated.View>
                </GestureDetector>
              </CardOverlay>
            </Card>
          </View>
        </CardFrame>

        <CardButtons>
          <CardIconButton onPress={changeImage}>
            <Ionicons name="image-outline" size={18} color="white" />
          </CardIconButton>

          <CardIconButton onPress={changeFont}>
            <Ionicons name="text-outline" size={18} color="white" />
          </CardIconButton>
        </CardButtons>
      </Animated.View>

      <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
        <TryAnotherButton onPress={swipe} disabled={loading}>
          <TryAnotherText>
            {loading ? "Loading..." : "Try another"}
          </TryAnotherText>
        </TryAnotherButton>

        <ShareButton onPress={share} disabled={sharing}>
          <ShareText>{sharing ? "Sharing..." : "Share"}</ShareText>
        </ShareButton>
      </Buttons>
    </Container>
  );
}
