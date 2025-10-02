import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
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
}

export default function SwipeCard({ venue, onSwipe, isActive }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

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
        translateX.value = withSpring(SCREEN_WIDTH + 100, {}, () => {
          runOnJS(onSwipe)('right');
        });
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-SCREEN_WIDTH - 100, {}, () => {
          runOnJS(onSwipe)('left');
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-30, 0, 30]);

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
      ],
      opacity: isActive ? 1 : 0.5,
    };
  });

  const likeStampStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]);
    const scale = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0.5, 1]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const nopeStampStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]);
    const scale = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0.5]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
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
    height: '80%',
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
    padding: spacing.lg,
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
