import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '@/components/GradientBackground';
import SwipeCard from '@/components/SwipeCard';
import Button from '@/components/Button';
import { useVenues } from '@/hooks/useVenues';
import { useSwipeState } from '@/hooks/useSwipeState';
import { colors, typography, spacing, layout, borderRadius } from '@/constants/theme';

/**
 * SwipeDeck Screen - Phase 2 Implementation
 * Tinder-style swipe interface with dual-user simulation
 */
export default function SwipeDeck() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { venues, loading } = useVenues();
  const {
    currentUser,
    recordSwipe,
    toggleUser,
    resetSession,
    isBothUsersComplete,
    getProgress,
  } = useSwipeState();

  const progress = getProgress(venues.length);
  const bothComplete = isBothUsersComplete(venues.length);

  // Auto-navigate to results when both users complete
  useEffect(() => {
    if (bothComplete && venues.length > 0) {
      router.push('/result');
    }
  }, [bothComplete, venues.length, router]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentUserSwipes < venues.length) {
      recordSwipe(venues[currentUserSwipes].id, direction);
    }
  };

  const handleReset = () => {
    resetSession();
  };

  const handleGoBack = () => {
    router.back();
  };

  // Loading state
  if (loading) {
    return (
      <GradientBackground>
        <View style={[styles.container, { paddingTop: Math.max(spacing.xl, insets.top + spacing.lg) }]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent.cyan} />
            <Text style={styles.loadingText}>Loading venues...</Text>
          </View>
          <StatusBar style="light" />
        </View>
      </GradientBackground>
    );
  }

  // Get current user's swipe count
  const currentUserSwipes = currentUser === 'A' ? progress.userA : progress.userB;
  const isCurrentUserComplete = currentUserSwipes >= venues.length;

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingTop: Math.max(spacing.md, insets.top + spacing.sm) }]}>
        {/* Header with NightSwipe Sign */}
        <View style={styles.header}>
          <View style={styles.signWrapper}>
            {/* Neon frame with gradient border */}
            <LinearGradient
              colors={['#d946ef', '#22d3ee', '#d946ef']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.neonFrame}
            >
              {/* Sign plate */}
              <View style={styles.logoSign}>
                <Image
                  source={require('@/assets/shared/NightSwipe-Logo-1024.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Card Stack */}
        <View style={styles.cardContainer}>
          {isCurrentUserComplete ? (
            <View style={styles.completedContainer}>
              <Text style={styles.completedEmoji}>✓</Text>
              <Text style={styles.completedTitle}>
                {currentUser === 'A' ? 'User A' : 'User B'} Complete!
              </Text>
              <Text style={styles.completedSubtitle}>
                {bothComplete
                  ? 'Both users done! Finding matches...'
                  : `Switch to User ${currentUser === 'A' ? 'B' : 'A'} to continue`}
              </Text>
            </View>
          ) : (
            <>
              {/* Render next 3 cards for stack effect - reversed so active card renders last (on top) */}
              {(() => {
                const upcomingCards = venues.slice(currentUserSwipes, currentUserSwipes + 3);
                const stackLength = upcomingCards.length;

                return upcomingCards
                  .slice()
                  .reverse()
                  .map((venue, index) => {
                    const stackIndex = stackLength - 1 - index;
                    const isActive = stackIndex === 0;
                    return (
                      <SwipeCard
                        key={`${venue.id}-${currentUser}-${stackIndex}`}
                        venue={venue}
                        onSwipe={handleSwipe}
                        isActive={isActive}
                        stackIndex={stackIndex}
                        stackLength={stackLength}
                      />
                    );
                  });
              })()}
            </>
          )}
        </View>

        {/* Instructions / Actions */}
        <View style={styles.footer}>
          {!isCurrentUserComplete && (
            <Text style={styles.instructions}>
              👈 Swipe left for No • Swipe right for Yes 👉
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Reset Session"
              onPress={handleReset}
              variant="outline"
              fullWidth
            />
            <Button
              title="← Back to Landing"
              onPress={handleGoBack}
              variant="outline"
              fullWidth
            />
          </View>
        </View>

        <StatusBar style="light" />
      </View>
    </GradientBackground>
  );
}

const SCREEN_WIDTH = Dimensions.get('window').width;
// Logo aspect ratio from cropped asset (1012 × 348)
const LOGO_ASPECT_RATIO = 348 / 1012;
// Calculate logo width as 82% of card width (card is SCREEN_WIDTH - spacing.lg * 2)
const CARD_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const LOGO_WIDTH = CARD_WIDTH * 0.82;
const LOGO_HEIGHT = LOGO_WIDTH * LOGO_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  loadingText: {
    fontSize: typography.size.lg,
    color: colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  signWrapper: {
    position: 'relative',
  },
  neonFrame: {
    padding: 3,
    borderRadius: borderRadius.xl + 1,
    shadowColor: '#d946ef',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  logoSign: {
    backgroundColor: 'rgba(2, 18, 40, 0.65)',
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  completedContainer: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  completedEmoji: {
    fontSize: 80,
  },
  completedTitle: {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.extrabold,
    color: colors.accent.cyan,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: typography.size.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  footer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  instructions: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    gap: spacing.sm,
  },
});
