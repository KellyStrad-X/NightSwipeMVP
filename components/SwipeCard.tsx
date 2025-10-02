import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Venue, getPriceLevelDisplay } from '@/data/mockVenues';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface SwipeCardProps {
  venue: Venue;
  onSwipe: (direction: 'left' | 'right') => void;
  isActive: boolean;
  stackIndex: number; // 0 = active/top, 1 = second, 2 = third
  stackLength: number; // Total cards in current stack (1-3)
}

export default function SwipeCard({ venue, onSwipe, isActive, stackIndex, stackLength }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const promotionProgress = useSharedValue(0);

  // Detect when card transitions from inactive to active (promotion animation)
  useEffect(() => {
    if (isActive && stackIndex === 0) {
      // Animate from stacked position to active position
      promotionProgress.value = withTiming(1, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
    } else if (!isActive) {
      // Reset for next potential promotion
      promotionProgress.value = 0;
      translateX.value = 0;
      translateY.value = 0;
    }
  }, [isActive, stackIndex, promotionProgress, translateX, translateY]);

  const panGesture = Gesture.Pan()
    .enabled(isActive)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        // Fire callback immediately for instant state update
        runOnJS(onSwipe)('right');
        // Animate card off screen with smooth easing for polished feel
        translateX.value = withTiming(SCREEN_WIDTH + 100, {
          duration: 350,
          easing: Easing.out(Easing.cubic)
        });
      } else if (shouldSwipeLeft) {
        // Fire callback immediately for instant state update
        runOnJS(onSwipe)('left');
        // Animate card off screen with smooth easing for polished feel
        translateX.value = withTiming(-SCREEN_WIDTH - 100, {
          duration: 350,
          easing: Easing.out(Easing.cubic)
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-30, 0, 30]);

    // Stack effect: inactive cards have reduced scale, opacity, and vertical offset
    // Aggressive opacity reduction to eliminate ghosting: only next card is slightly visible
    // Guardrail: if this is the only card left (stackLength === 1), keep it fully visible
    const isTrailingCard = stackLength === 1;
    const baseScale = isActive || isTrailingCard ? 1 : 0.92 - stackIndex * 0.04;
    const baseOpacity = isActive || isTrailingCard ? 1 : stackIndex === 1 ? 0.08 : 0;
    const baseStackOffset = stackIndex * 12; // Push inactive cards down more noticeably

    // Trailing card motion: as active card moves, next card slides up slightly
    // Only apply to the immediate next card (stackIndex === 1)
    let adjustedScale = baseScale;
    let adjustedOffset = baseStackOffset;
    let adjustedOpacity = baseOpacity;

    if (!isActive && stackIndex === 1) {
      // Calculate progress based on how far the active card has moved
      const swipeProgress = Math.abs(translateX.value) / SWIPE_THRESHOLD;
      const clampedProgress = Math.min(swipeProgress, 1);

      // Slide up and scale up slightly as the active card moves
      adjustedOffset = interpolate(clampedProgress, [0, 1], [baseStackOffset, 0]);
      adjustedScale = interpolate(clampedProgress, [0, 1], [baseScale, 0.96]);
    }

    // Promotion animation: when card becomes active, smoothly transition from stacked position
    if (promotionProgress.value > 0 && promotionProgress.value < 1) {
      // Animate from previous stacked position (stackIndex 1 equivalent) to active
      const stackedScale = 0.92;
      const stackedOffset = 12;
      const stackedOpacity = 0.08;

      adjustedScale = interpolate(promotionProgress.value, [0, 1], [stackedScale, 1]);
      adjustedOffset = interpolate(promotionProgress.value, [0, 1], [stackedOffset, 0]);
      adjustedOpacity = interpolate(promotionProgress.value, [0, 1], [stackedOpacity, 1]);
    }

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + adjustedOffset },
        { scale: adjustedScale },
        { rotate: `${rotation}deg` },
      ],
      opacity: adjustedOpacity,
      zIndex: 3 - stackIndex, // Active card (stackIndex 0) gets zIndex 3, etc.
    };
  });

  const likeStampStyle = useAnimatedStyle(() => {
    // Show stamp earlier: reach 60% opacity at 40% of threshold, 100% at threshold
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD * 0.4, SWIPE_THRESHOLD],
      [0, 0.6, 1]
    );
    // More pronounced scale: start smaller and slightly overshoot
    const scale = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD * 0.4, SWIPE_THRESHOLD],
      [0.7, 1, 1.1]
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const nopeStampStyle = useAnimatedStyle(() => {
    // Show stamp earlier: reach 60% opacity at 40% of threshold, 100% at threshold
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 0.4, 0],
      [1, 0.6, 0]
    );
    // More pronounced scale: start smaller and slightly overshoot
    const scale = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 0.4, 0],
      [1.1, 1, 0.7]
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]} pointerEvents={isActive ? 'auto' : 'none'}>
        {/* Venue Image */}
        <Image source={{ uri: venue.photo_url }} style={styles.image} resizeMode="cover" />

        {/* Like Stamp */}
        <Animated.View style={[styles.stamp, styles.likeStamp, likeStampStyle]}>
          <Text style={styles.stampText}>YES</Text>
        </Animated.View>

        {/* Nope Stamp */}
        <Animated.View style={[styles.stamp, styles.nopeStamp, nopeStampStyle]}>
          <Text style={styles.stampText}>NOPE</Text>
        </Animated.View>

        {/* Venue Info Overlay */}
        <View style={styles.infoOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.venueName} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={styles.priceLevel}>{getPriceLevelDisplay(venue.price_level)}</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.rating}>{venue.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.address} numberOfLines={1}>
              {venue.address}
            </Text>
          </View>

          <View style={styles.typesRow}>
            {venue.types.slice(0, 3).map((type, index) => (
              <View key={index} style={styles.typeTag}>
                <Text style={styles.typeText}>{type.replace('_', ' ')}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: '94%',
    backgroundColor: colors.surface.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  stamp: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 4,
    borderRadius: borderRadius.md,
  },
  likeStamp: {
    right: 30,
    borderColor: colors.ui.success,
    transform: [{ rotate: '15deg' }],
  },
  nopeStamp: {
    left: 30,
    borderColor: colors.ui.error,
    transform: [{ rotate: '-15deg' }],
  },
  stampText: {
    fontSize: typography.size['4xl'],
    fontWeight: typography.weight.extrabold,
    color: colors.text.primary,
  },
  infoOverlay: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  venueName: {
    flex: 1,
    fontSize: typography.size['2xl'],
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  priceLevel: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.accent.cyan,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingIcon: {
    fontSize: typography.size.base,
  },
  rating: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  separator: {
    fontSize: typography.size.base,
    color: colors.text.secondary,
    marginHorizontal: spacing.sm,
  },
  address: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  typeTag: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    fontSize: typography.size.xs,
    color: colors.accent.purple,
    fontWeight: typography.weight.medium,
    textTransform: 'capitalize',
  },
});
