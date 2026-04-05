import { useGreetingContext } from "../context/GreetingContext";
import { useTextElementState } from "../hooks/useTextElementState";
import { DraggableText } from "./DraggableText";

const SLOGAN_FONT_SIZE = 13;
const SLOGAN_LINE_HEIGHT = 20;

export function CardFont() {
  const {
    text,
    slogan,
    font,
    sloganFont,
    textColor,
    greetingAnimatedStyle,
    sloganAnimatedStyle,
  } = useGreetingContext();

  const messageState = useTextElementState({
    fontSize: font.fontSize,
    lineHeight: font.lineHeight,
  });
  const sloganState = useTextElementState({
    fontSize: SLOGAN_FONT_SIZE,
    lineHeight: SLOGAN_LINE_HEIGHT,
  });

  return (
    <>
      <DraggableText
        state={messageState}
        style={{ ...font, color: textColor }}
        animatedStyle={greetingAnimatedStyle}
      >
        {text}
      </DraggableText>

      {slogan ? (
        <DraggableText
          state={sloganState}
          style={{
            fontFamily: sloganFont.fontFamily,
            fontSize: SLOGAN_FONT_SIZE,
            lineHeight: SLOGAN_LINE_HEIGHT,
            color: textColor,
            letterSpacing: 1.2,
            textAlign: "center",
            textTransform: "uppercase",
          }}
          animatedStyle={sloganAnimatedStyle}
        >
          {slogan}
        </DraggableText>
      ) : null}
    </>
  );
}
