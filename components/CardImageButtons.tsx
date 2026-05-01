import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { styled } from "styled-components/native";
import { useGreetingContext } from "../context/GreetingContext";

type Props = {
  onSave: () => void;
};

const Group = styled.View`
  gap: 8px;
`;

const Button = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
`;

export function CardImageButtons({ onSave }: Props) {
  const { refreshImage, imageLoading, loading } = useGreetingContext();

  if (imageLoading || loading) return null;

  return (
    <Group>
      <Button onPress={onSave}>
        <Feather name="heart" size={18} color="#1a1a2e" />
      </Button>
      <Button onPress={refreshImage}>
        <Feather name="refresh-cw" size={18} color="#1a1a2e" />
      </Button>
    </Group>
  );
}
