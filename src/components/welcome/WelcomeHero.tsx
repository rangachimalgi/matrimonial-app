import { Image, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

const avatar1 = require('../../assets/images/avatar-1.jpg');
const avatar2 = require('../../assets/images/avatar-2.jpg');
const avatar3 = require('../../assets/images/avatar-3.jpg');

export function WelcomeHero() {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} viewBox="0 0 390 360">
        <Circle
          cx="195"
          cy="170"
          r="128"
          stroke={colors.orbit}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          fill="none"
        />
        <Circle
          cx="195"
          cy="170"
          r="88"
          stroke={colors.orbit}
          strokeWidth="1.2"
          strokeDasharray="4 7"
          fill="none"
        />
        <Path
          d="M260 40 C300 70, 330 110, 320 160"
          stroke={colors.orbit}
          strokeWidth="1.2"
          strokeDasharray="4 6"
          fill="none"
        />
        <Path
          d="M300 50 C340 40, 360 90, 340 130"
          stroke={colors.cloud}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          opacity={0.45}
        />
        <Path
          d="M330 70 C360 65, 370 95, 350 115"
          stroke={colors.white}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
      </Svg>

      <View style={[styles.avatarWrap, styles.avatarLarge]}>
        <Image source={avatar1} style={styles.avatarImage} />
      </View>

      <View style={[styles.avatarWrap, styles.avatarMedium]}>
        <Image source={avatar2} style={styles.avatarImage} />
      </View>

      <View style={[styles.avatarWrap, styles.avatarSmall]}>
        <Image source={avatar3} style={styles.avatarImage} />
      </View>

      <View style={[styles.iconChip, styles.heart]}>
        <Ionicons name="heart" size={14} color={colors.orange} />
      </View>

      <View style={[styles.iconChip, styles.music]}>
        <Ionicons name="musical-notes" size={14} color={colors.black} />
      </View>

      <View style={[styles.iconChip, styles.play]}>
        <Ionicons name="play" size={12} color={colors.black} />
      </View>

      <Ionicons
        name="sparkles-outline"
        size={28}
        color={colors.white}
        style={styles.sparkle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: '100%',
    marginTop: 12,
  },
  avatarWrap: {
    position: 'absolute',
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.backgroundSoft,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarLarge: {
    width: 118,
    height: 118,
    top: 28,
    left: '28%',
  },
  avatarMedium: {
    width: 86,
    height: 86,
    top: 118,
    right: '14%',
  },
  avatarSmall: {
    width: 64,
    height: 64,
    top: 210,
    left: '22%',
  },
  iconChip: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    top: 96,
    left: '18%',
  },
  music: {
    top: 52,
    right: '22%',
  },
  play: {
    top: 188,
    right: '28%',
  },
  sparkle: {
    position: 'absolute',
    top: 150,
    right: 36,
  },
});
