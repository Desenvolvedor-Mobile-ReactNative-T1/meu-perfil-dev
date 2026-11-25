import { ReactNode, useRef } from "react";
import {
  Animated,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";

const PressableAnimado = Animated.createAnimatedComponent(Pressable);

type BotaoAcaoProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function BotaoAcao({ children, onPress, style }: BotaoAcaoProps) {
  const escala = useRef(new Animated.Value(1)).current;

  function afundar() {
    Animated.spring(escala, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  function soltar() {
    Animated.spring(escala, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <PressableAnimado
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={afundar}
      onPressOut={soltar}
      style={[style, { transform: [{ scale: escala }] }]}
    >
      {children}
    </PressableAnimado>
  );
}
