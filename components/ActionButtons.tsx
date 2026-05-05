import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  loading: boolean;
  share: () => void;
  sharing: boolean;
};

export function ActionButtons({ swipe, loading, share, sharing }: ActionButtonsProps) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

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
