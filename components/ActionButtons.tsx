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
  t: (key: string) => string;
  paddingBottom: number;
};

export function ActionButtons({
  swipe,
  loading,
  share,
  sharing,
  t,
  paddingBottom,
}: ActionButtonsProps) {
  return (
    <Buttons style={{ paddingBottom }}>
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
