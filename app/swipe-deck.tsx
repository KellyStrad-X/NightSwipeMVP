import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Button from '@/components/Button';
import { colors, typography, spacing, layout } from '@/constants/theme';

/**
 * SwipeDeck Screen - Placeholder
 * Full implementation in Phase 2
 */
export default function SwipeDeck() {
  const router = useRouter();

  const handleNavigateToResult = () => {
    router.push('/result');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Swipe Deck</Text>
          <Text style={styles.subtitle}>Phase 2 - Coming Soon</Text>
          <Text style={styles.description}>
            This screen will display Tinder-style cards with venues. Users will swipe left (No) or
            right (Yes) on each venue.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Simulate Match → Result"
              onPress={handleNavigateToResult}
              variant="primary"
              fullWidth
            />
            <Button title="← Back to Landing" onPress={handleGoBack} variant="outline" fullWidth />
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
    marginTop: spacing.md,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
