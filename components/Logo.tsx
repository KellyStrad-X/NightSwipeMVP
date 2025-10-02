import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

type SizeVariant = {
  container: ViewStyle;
  text: TextStyle;
  brandText: TextStyle;
};

const sizeVariants: Record<'small' | 'medium' | 'large', SizeVariant> = {
  small: {
    container: {
      gap: spacing.xs,
    },
    text: {
      fontSize: 32,
    },
    brandText: {
      fontSize: typography.size.lg,
    },
  },
  medium: {
    container: {
      gap: spacing.sm,
    },
    text: {
      fontSize: 48,
    },
    brandText: {
      fontSize: typography.size['2xl'],
    },
  },
  large: {
    container: {
      gap: spacing.md,
    },
    text: {
      fontSize: 72,
    },
    brandText: {
      fontSize: typography.size['4xl'],
    },
  },
};

/**
 * Placeholder logo component
 * TODO: Replace with actual logo asset when provided
 */
export default function Logo({ size = 'large' }: LogoProps) {
  const sizeStyles = sizeVariants[size];

  return (
    <View style={[styles.container, sizeStyles.container]}>
      <Text style={[styles.text, sizeStyles.text]}>🌙</Text>
      <Text style={[styles.brandText, sizeStyles.brandText]}>NightSwipe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  brandText: {
    fontWeight: typography.weight.extrabold,
    color: colors.accent.cyan,
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
});
