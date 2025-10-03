import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

interface UserToggleProps {
  currentUser: 'A' | 'B';
  onToggle: (user: 'A' | 'B') => void;
}

export default function UserToggle({ currentUser, onToggle }: UserToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Swiping as:</Text>
      <View style={styles.toggleContainer}>
        <Pressable
          style={[styles.toggleButton, currentUser === 'A' && styles.toggleButtonActive]}
          onPress={() => onToggle('A')}
        >
          <Text
            style={[styles.toggleText, currentUser === 'A' && styles.toggleTextActive]}
          >
            User A
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, currentUser === 'B' && styles.toggleButtonActive]}
          onPress={() => onToggle('B')}
        >
          <Text
            style={[styles.toggleText, currentUser === 'B' && styles.toggleTextActive]}
          >
            User B
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  toggleButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  toggleButtonActive: {
    backgroundColor: colors.accent.cyan,
  },
  toggleText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.secondary,
  },
  toggleTextActive: {
    color: colors.text.inverse,
  },
});
