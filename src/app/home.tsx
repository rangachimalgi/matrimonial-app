import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurredMatchCard } from '@/components/home/BlurredMatchCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useProfile } from '@/context/ProfileContext';
import { colors, radius, spacing } from '@/constants/theme';

export default function HomeScreen() {
  const { status } = useProfile();
  const isPending = status === 'pending';

  const handleCompleteProfile = () => {
    if (isPending) return;
    router.push('/create-profile');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.brand}>Spark</Text>
        <Text style={styles.hint}>Discover</Text>
      </View>

      <View style={styles.stage}>
        <BlurredMatchCard />

        <View style={styles.gate}>
          <View style={styles.gateCard}>
            <Text style={styles.gateTitle}>
              {isPending ? 'Waiting for confirmation' : 'Complete your profile'}
            </Text>
            <Text style={styles.gateBody}>
              {isPending
                ? 'Your profile was sent for verification. We’ll unlock matches once it’s confirmed.'
                : 'Matches are waiting — finish a few details to unlock clear profiles and start connecting.'}
            </Text>
            <PrimaryButton
              label={isPending ? 'Pending verification' : 'Complete profile'}
              onPress={handleCompleteProfile}
              disabled={isPending}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.homeBg,
    paddingHorizontal: spacing.lg,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  hint: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.orange,
  },
  stage: {
    flex: 1,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    position: 'relative',
  },
  gate: {
    ...StyleSheet.absoluteFill,
    zIndex: 5,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  gateCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  gateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    paddingLeft: spacing.sm,
  },
  gateBody: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSubtle,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
});
