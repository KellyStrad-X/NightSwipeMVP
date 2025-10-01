import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { colors, typography, spacing, layout } from '@/constants/theme';

export default function Landing() {
  const router = useRouter();

  const handleStartSearching = () => {
    router.push('/swipe-deck');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <Logo size="large" />

          {/* Tagline */}
          <Text style={styles.tagline}>Swipe. Decide. Go.</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Find the perfect place for you and your partner with just a few swipes
          </Text>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <Button
            title="Start Searching"
            onPress={handleStartSearching}
            variant="primary"
            size="large"
            fullWidth
          />
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
    gap: spacing.xl,
  },
  tagline: {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.normal,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.size.lg * typography.lineHeight.relaxed,
    maxWidth: 320,
  },
  ctaContainer: {
    width: '100%',
    marginTop: spacing.xl,
  },
});
