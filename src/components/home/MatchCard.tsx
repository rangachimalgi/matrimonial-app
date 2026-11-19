import type { ReactNode } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import type { MatchProfile } from '@/data/matches';
import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  profile: MatchProfile;
};

export function MatchCard({ profile }: Props) {
  const { height } = useWindowDimensions();
  const heroHeight = Math.round(height * 0.62);

  return (
    <View style={styles.card}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        nestedScrollEnabled
      >
        <View style={[styles.hero, { height: heroHeight }]}>
          <Image source={profile.photo} style={styles.photo} />
          <View style={styles.heroFade} />
          <View style={styles.heroMeta}>
            <Text style={styles.name}>
              {profile.name}, {profile.age}
            </Text>
            <Text style={styles.line}>
              {profile.city} · {profile.profession}
            </Text>
            <View style={styles.scrollHint}>
              <Ionicons name="chevron-down" size={16} color="rgba(255,255,255,0.85)" />
              <Text style={styles.scrollHintText}>Scroll for details</Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <DetailBlock title="About">
            <Text style={styles.body}>{profile.about}</Text>
          </DetailBlock>

          <DetailBlock title="Basics">
            <Row label="Height" value={profile.height} />
            <Row label="Mother tongue" value={profile.motherTongue} />
            <Row label="Education" value={profile.education} />
            <Row label="Profession" value={profile.profession} />
          </DetailBlock>

          <DetailBlock title="Community">
            <Row label="Religion" value={profile.religion} />
            <Row label="Caste" value={profile.caste} />
            <Row label="Gotra" value={profile.gotra} />
          </DetailBlock>

          <DetailBlock title="Family">
            <Text style={styles.body}>{profile.family}</Text>
          </DetailBlock>

          <View style={styles.bottomPad} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  hero: {
    width: '100%',
    backgroundColor: colors.blueMute,
  },
  photo: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
    backgroundColor: 'rgba(11, 11, 12, 0.55)',
  },
  heroMeta: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    gap: 4,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.4,
  },
  line: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
  },
  scrollHint: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollHintText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  details: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
    backgroundColor: colors.white,
  },
  block: {
    gap: spacing.sm,
  },
  blockTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.orange,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    fontSize: 14,
    color: colors.textSubtle,
    fontWeight: '500',
  },
  rowValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  bottomPad: {
    height: spacing.xxl,
  },
});
