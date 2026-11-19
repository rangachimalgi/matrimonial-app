import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '@/context/ProfileContext';
import { colors, radius, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const { draft, status } = useProfile();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{draft?.name?.trim() || 'Your profile'}</Text>
        <Text style={styles.meta}>
          {[draft?.age, draft?.gender, draft?.caste].filter(Boolean).join(' · ') ||
            'Add your details to stand out'}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {status === 'verified'
              ? 'Verified'
              : status === 'pending'
                ? 'Pending verification'
                : 'Incomplete'}
          </Text>
        </View>
      </View>

      {draft?.gotra ? (
        <View style={styles.row}>
          <Text style={styles.label}>Gotra</Text>
          <Text style={styles.value}>{draft.gotra}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.homeBg,
    paddingHorizontal: spacing.lg,
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  meta: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSubtle,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    backgroundColor: colors.orangeWash,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.orange,
  },
  row: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    color: colors.textSubtle,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
  },
});
