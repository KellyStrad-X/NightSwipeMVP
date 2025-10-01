import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, layout } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];

  const textStyles = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.accent.cyan : colors.text.inverse}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },

  // Variants
  primary: {
    backgroundColor: colors.accent.cyan,
    ...shadows.glow,
  },
  secondary: {
    backgroundColor: colors.accent.purple,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent.cyan,
  },

  // Sizes
  small: {
    height: 40,
    paddingHorizontal: spacing.md,
  },
  medium: {
    height: layout.buttonHeight,
    paddingHorizontal: spacing.xl,
  },
  large: {
    height: 64,
    paddingHorizontal: spacing['2xl'],
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },

  // Text styles
  text: {
    fontWeight: typography.weight.bold,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.text.inverse,
    fontSize: typography.size.lg,
  },
  secondaryText: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
  },
  outlineText: {
    color: colors.accent.cyan,
    fontSize: typography.size.lg,
  },
  smallText: {
    fontSize: typography.size.base,
  },
  mediumText: {
    fontSize: typography.size.lg,
  },
  largeText: {
    fontSize: typography.size.xl,
  },
});
