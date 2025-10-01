import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Button from '@/components/Button';
import { colors, typography, spacing, layout } from '@/constants/theme';

/**
 * Result Screen - Placeholder
 * Full implementation in Phase 3
 */
export default function Result() {
  const router = useRouter();

  const handleStartOver = () => {
    router.push('/');
  };

  const handleOpenMaps = () => {
    // TODO: Implement Google Maps deep link in Phase 3
    console.log('Opening Google Maps...');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>It's a Match!</Text>
          <Text style={styles.subtitle}>Phase 3 - Coming Soon</Text>
          <Text style={styles.description}>
            This screen will show the final venue you both agreed on, with options to open in
            Google Maps or start a new search.
          </Text>

          <View style={styles.placeholderCard}>
            <Text style={styles.venueName}>Sample Restaurant</Text>
            <Text style={styles.venueDetails}>⭐️ 4.5 • $$ • 0.5 mi away</Text>
            <Text style={styles.venueAddress}>123 Main St, Los Angeles, CA</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Open in Google Maps"
              onPress={handleOpenMaps}
              variant="primary"
              fullWidth
            />
            <Button title="Start Over" onPress={handleStartOver} variant="outline" fullWidth />
          </View>
        </View>

        <StatusBar style="light" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing['4xl'],
    paddingBottom: spacing['2xl'],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  emoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.size['4xl'],
    fontWeight: typography.weight.extrabold,
    color: colors.accent.cyan,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.accent.purple,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.size.base * typography.lineHeight.relaxed,
    maxWidth: 320,
    marginBottom: spacing.md,
  },
  placeholderCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.lg,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surface.cardBorder,
  },
  venueName: {
    fontSize: typography.size['2xl'],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  venueDetails: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  venueAddress: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
