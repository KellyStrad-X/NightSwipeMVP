import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '@/components/GradientBackground';
import SwipeCard from '@/components/SwipeCard';
import UserToggle from '@/components/UserToggle';
import Button from '@/components/Button';
import { useVenues } from '@/hooks/useVenues';
import { useSwipeState } from '@/hooks/useSwipeState';
import { colors, typography, spacing, layout } from '@/constants/theme';

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
      <View style={[styles.container, { paddingTop: Math.max(spacing.xl, insets.top + spacing.lg) }]}>
        {/* Header with User Toggle */}
        <View style={styles.header}>
          <UserToggle currentUser={currentUser} onToggle={toggleUser} />
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

        {/* NightSwipe Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/shared/NightSwipe-Logo-1024.png')}
            style={styles.logo}
            resizeMode="contain"
          />
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
    marginBottom: spacing.xl,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
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
