import { styled } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";

const Overlay = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl}px;
  padding: ${({ theme }) => theme.space.xxl}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  font-weight: 700;
  text-align: center;
`;

const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.65);
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  text-align: center;
  line-height: 24px;
`;

const IconWrapper = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: center;
`;

export function OfflineScreen() {
  const { t } = useI18n();

  return (
    <Overlay colors={["#1a1a2e", "#2d2d5e", "#1a1a2e"]} locations={[0, 0.5, 1]}>
      <IconWrapper>
        <Ionicons name="wifi-outline" size={40} color="rgba(255,255,255,0.7)" />
      </IconWrapper>
      <Title>{t("offlineTitle")}</Title>
      <Subtitle>{t("offlineSubtitle")}</Subtitle>
    </Overlay>
  );
}
