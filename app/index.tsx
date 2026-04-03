import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useI18n } from "../context/I18nContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { useDraggableText } from "../hooks/useDraggableText";
import { Container } from "./index.styles";
import { GreetingCard } from "../components/GreetingCard";
import { ActionButtons } from "../components/ActionButtons";

export default function Index() {
  const insets = useSafeAreaInsets();
  const {
    text,
    image,
    loading,
    font,
    textColor,
    greetingAnimatedStyle,
    fetchGreeting,
    changeFont,
    changeImage,
    changeColor,
  } = useGreetingContext();
  const { gesture, dragStyle } = useDraggableText();
  const { cardStyle, swipe } = useCardSwipe(fetchGreeting);
  const { cardRef, share, sharing } = useShareContext();
  const { t } = useI18n();

  return (
    <Container>
      <GreetingCard
        cardRef={cardRef}
        cardStyle={cardStyle}
        image={image}
        gesture={gesture}
        dragStyle={dragStyle}
        greetingAnimatedStyle={greetingAnimatedStyle}
        text={text}
        font={font}
        changeImage={changeImage}
        changeFont={changeFont}
        changeColor={changeColor}
        textColor={textColor}
      />
      <ActionButtons
        swipe={swipe}
        loading={loading}
        share={share}
        sharing={sharing}
        t={t}
        paddingBottom={insets.bottom + 16}
      />
    </Container>
  );
}
