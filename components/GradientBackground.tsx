import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export default function GradientBackground({
  children,
  colors: customColors,
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 1 },
}: GradientBackgroundProps) {
  const gradientColors = customColors || colors.background.gradient;

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} start={start} end={end} style={styles.gradient}>
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
