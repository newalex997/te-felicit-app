import { Ionicons } from "@expo/vector-icons";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { useDraggableText } from "../hooks/useDraggableText";
import {
  Buttons,
  Card,
  CardButtons,
  CardOverlay,
  Container,
  Greeting,
  ImageToggleButton,
  ShareButton,
  ShareText,
  StyleToggleButton,
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

  return (
    <Container>
      <Animated.View style={cardStyle}>
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

            <CardButtons>
              <ImageToggleButton onPress={changeImage}>
                <Ionicons name="image-outline" size={18} color="white" />
              </ImageToggleButton>

              <StyleToggleButton onPress={changeFont}>
                <Ionicons name="text-outline" size={18} color="white" />
              </StyleToggleButton>
            </CardButtons>
          </CardOverlay>
        </Card>
      </Animated.View>

      <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
        <TryAnotherButton onPress={swipe} disabled={loading}>
          <TryAnotherText>
            {loading ? "Loading..." : "Try another"}
          </TryAnotherText>
        </TryAnotherButton>

        <ShareButton onPress={() => {}}>
          <ShareText>Share</ShareText>
        </ShareButton>
      </Buttons>
    </Container>
  );
}
