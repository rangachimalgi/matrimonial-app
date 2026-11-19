import { BlurView } from 'expo-blur';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

const previewPhoto = require('../../assets/images/avatar-2.jpg');

/** Teaser match card — content stays readable in silhouette, details stay locked. */
export function BlurredMatchCard() {
  return (
    <View style={styles.card}>
      <Image source={previewPhoto} style={styles.photo} />

      <View style={styles.meta}>
        <Text style={styles.name}>Ananya, 26</Text>
        <Text style={styles.detail}>Bengaluru · Software Engineer</Text>
        <Text style={styles.detail}>Brahmin · Bharadwaj gotra</Text>
      </View>

      <BlurView intensity={38} tint="light" style={styles.blur} />
      <View style={styles.veil} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.backgroundSoft,
  },
  photo: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  meta: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    zIndex: 1,
    gap: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },
  detail: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  blur: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  veil: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(184, 196, 255, 0.18)',
    zIndex: 3,
  },
});
