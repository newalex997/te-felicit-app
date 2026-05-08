import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useI18n } from "../context/I18nContext";
import {
  Buttons,
  ShareButton,
  ShareText,
  TryAnotherButton,
  TryAnotherText,
} from "../styles/index.styles";

type ActionButtonsProps = {
  swipe: () => void;
};

export function ActionButtons({ swipe: swipeCard }: ActionButtonsProps) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { loading, setFocusedBlockId } = useGreetingContext();
  const { share, sharing } = useShareContext();

  const swipe = useCallback(() => {
    setFocusedBlockId(null);
    swipeCard();
  }, [setFocusedBlockId, swipeCard]);

  return (
    <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
      <TryAnotherButton onPress={swipe} disabled={loading}>
        <TryAnotherText>
          {loading ? t("loading") : t("tryAnother")}
        </TryAnotherText>
      </TryAnotherButton>

      <ShareButton onPress={share} disabled={sharing}>
        <ShareText>{sharing ? t("sharing") : t("share")}</ShareText>
      </ShareButton>
    </Buttons>
  );
}
