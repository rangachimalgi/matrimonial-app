import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Field } from '@/components/ui/Field';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, radius, spacing } from '@/constants/theme';

const GENDERS = ['Woman', 'Man', 'Other'] as const;

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<(typeof GENDERS)[number] | null>(null);
  const [caste, setCaste] = useState('');
  const [gotra, setGotra] = useState('');

  const goHome = () => {
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Step 1 · Basics</Text>
          <Text style={styles.headerTitle}>Your profile</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip"
          onPress={goHome}
          hitSlop={12}
          style={({ pressed }) => [styles.skipBtn, pressed && styles.pressed]}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '28%' }]} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCopy}>
            <Text style={styles.headline}>Who are we matching for?</Text>
            <Text style={styles.subhead}>
              Just the essentials for now. You can refine caste, family, and
              photos later.
            </Text>
          </View>

          <View style={styles.card}>
            <Field
              label="Full name"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <View style={styles.row}>
              <View style={styles.ageField}>
                <Field
                  label="Age"
                  placeholder="25"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
              <View style={styles.genderField}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <View style={styles.chips}>
                  {GENDERS.map((option) => {
                    const selected = gender === option;
                    return (
                      <Pressable
                        key={option}
                        onPress={() => setGender(option)}
                        style={[styles.chip, selected && styles.chipSelected]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            selected && styles.chipTextSelected,
                          ]}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Community</Text>

            <Field
              label="Caste"
              placeholder="e.g. Brahmin"
              value={caste}
              onChangeText={setCaste}
              autoCapitalize="words"
            />

            <Field
              label="Gotra"
              placeholder="e.g. Bharadwaj"
              value={gotra}
              onChangeText={setGotra}
              autoCapitalize="words"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={goHome} />
          <Text style={styles.footerHint}>Takes under a minute · editable later</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.homeBg,
    paddingHorizontal: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.spark,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  headerTitle: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  skipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSubtle,
  },
  pressed: {
    opacity: 0.7,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(10,10,10,0.08)',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.black,
  },
  scroll: {
    paddingBottom: spacing.xl,
  },
  heroCopy: {
    marginBottom: spacing.lg,
  },
  headline: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  subhead: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSubtle,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  ageField: {
    width: 88,
  },
  genderField: {
    flex: 1,
    gap: spacing.sm,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: colors.homeBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: -4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSubtle,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: -8,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  footerHint: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSubtle,
  },
});
