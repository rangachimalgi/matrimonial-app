import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MATCHES, type MatchProfile } from '@/data/matches';
import { colors, radius, spacing } from '@/constants/theme';
import { MatchCard } from './MatchCard';

const SWIPE_X = 140;

type Props = {
  profiles?: MatchProfile[];
};

export function SwipeDeck({ profiles = MATCHES }: Props) {
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const current = profiles[index];
  const next = profiles[index + 1];
  const remaining = useMemo(
    () => Math.max(profiles.length - index, 0),
    [profiles.length, index],
  );

  const advance = (_dir: 'left' | 'right') => {
    setIndex((i) => i + 1);
    translateX.value = 0;
    translateY.value = 0;
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-18, 18])
    .failOffsetY([-14, 14])
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.15;
    })
    .onEnd((e) => {
      const shouldSwipe =
        Math.abs(e.translationX) > SWIPE_X || Math.abs(e.velocityX) > 900;

      if (shouldSwipe) {
        const dir = e.translationX > 0 ? 'right' : 'left';
        const toX = dir === 'right' ? 420 : -420;
        translateX.value = withTiming(toX, { duration: 220 }, (finished) => {
          if (finished) runOnJS(advance)(dir);
        });
        translateY.value = withTiming(e.translationY * 0.2, { duration: 220 });
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
        translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
      }
    });

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [-220, 0, 220],
          [-12, 0, 12],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [40, 140],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-140, -40],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          Math.abs(translateX.value),
          [0, 160],
          [0.96, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, 160],
      [0.85, 1],
      Extrapolation.CLAMP,
    ),
  }));

  if (!current) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>You're all caught up</Text>
        <Text style={styles.emptyBody}>
          New profiles will show up here soon.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      {next ? (
        <Animated.View style={[styles.cardLayer, backStyle]} pointerEvents="none">
          <MatchCard profile={next} />
        </Animated.View>
      ) : null}

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardLayer, frontStyle]}>
          <MatchCard profile={current} />

          <Animated.View style={[styles.stamp, styles.like, likeStyle]}>
            <Text style={styles.stampLike}>INTEREST</Text>
          </Animated.View>
          <Animated.View style={[styles.stamp, styles.nope, nopeStyle]}>
            <Text style={styles.stampNope}>PASS</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      <Text style={styles.counter}>{remaining} left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  cardLayer: {
    ...StyleSheet.absoluteFill,
  },
  stamp: {
    position: 'absolute',
    top: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  like: {
    left: 20,
    borderColor: colors.orange,
    transform: [{ rotate: '-12deg' }],
  },
  nope: {
    right: 20,
    borderColor: colors.blueDeep,
    transform: [{ rotate: '12deg' }],
  },
  stampLike: {
    color: colors.orange,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stampNope: {
    color: colors.blueDeep,
    fontWeight: '900',
    letterSpacing: 1,
  },
  counter: {
    position: 'absolute',
    bottom: -2,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSubtle,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  emptyBody: {
    marginTop: spacing.sm,
    fontSize: 14,
    textAlign: 'center',
    color: colors.textSubtle,
    fontWeight: '500',
  },
});
