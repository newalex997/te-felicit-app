import {
  Buttons,
  ShareButton,
  ShareText,
  TryAnotherButton,
  TryAnotherText,
} from "../app/index.styles";

type Props = {
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
}: Props) {
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
