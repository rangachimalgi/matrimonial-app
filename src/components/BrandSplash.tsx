import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants/theme';

const logo = require('../../assets/splash-icon.png');

/** In-app branded splash while native splash hands off. */
export function BrandSplash() {
  return (
    <View style={styles.root}>
      <View style={styles.glow} />
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Matrimonial</Text>
      <Text style={styles.tagline}>Find your life partner</Text>
      <View style={styles.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.orangeWash,
  },
  logo: {
    width: 112,
    height: 112,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.black,
    letterSpacing: -0.6,
  },
  tagline: {
    marginTop: spacing.sm,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSubtle,
  },
  accent: {
    marginTop: spacing.xl,
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
});
