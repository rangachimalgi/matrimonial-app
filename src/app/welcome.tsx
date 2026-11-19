import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetStartedButton } from '@/components/welcome/GetStartedButton';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';
import { colors, radius, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/create-profile');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <WelcomeHero />

      <View style={styles.copy}>
        <Text style={styles.headline}>
          Discover, Chat,{'\n'}& Find Your
        </Text>

        <View style={styles.sparkBadge}>
          <Text style={styles.sparkBadgeText}>Spark.</Text>
        </View>

        <Text style={styles.subhead}>
          Unveil your story, values, and dreams. Let's match, chat, and explore
          meaningful connections waiting to meet you.
        </Text>
      </View>

      <View style={styles.footer}>
        <GetStartedButton onPress={handleGetStarted} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  blobTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.backgroundSoft,
    top: -40,
    right: -60,
    opacity: 0.55,
  },
  blobBottom: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.backgroundDeep,
    bottom: -80,
    left: -80,
    opacity: 0.35,
  },
  copy: {
    marginTop: spacing.sm,
    paddingRight: spacing.md,
  },
  headline: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  sparkBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    backgroundColor: colors.black,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  sparkBadgeText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subhead: {
    marginTop: spacing.lg,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    fontWeight: '500',
    maxWidth: 320,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: spacing.lg,
  },
});
