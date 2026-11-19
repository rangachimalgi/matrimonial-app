import { router } from 'expo-router';
import { useMemo, useState } from 'react';
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
import { useProfile } from '@/context/ProfileContext';
import { useToast } from '@/context/ToastContext';
import { colors, radius, spacing } from '@/constants/theme';

const GENDERS = ['Woman', 'Man', 'Other'] as const;

type Errors = Partial<Record<'name' | 'age' | 'gender' | 'caste' | 'gotra', string>>;

export default function CreateProfileScreen() {
  const { draft, submitForVerification, skipProfile } = useProfile();
  const { showToast } = useToast();

  const [name, setName] = useState(draft?.name ?? '');
  const [age, setAge] = useState(draft?.age ?? '');
  const [gender, setGender] = useState<(typeof GENDERS)[number] | null>(
    (draft?.gender as (typeof GENDERS)[number] | undefined) ?? null,
  );
  const [caste, setCaste] = useState(draft?.caste ?? '');
  const [gotra, setGotra] = useState(draft?.gotra ?? '');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const ageNumber = useMemo(() => Number(age), [age]);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!age.trim()) next.age = 'Age is required';
    else if (!Number.isFinite(ageNumber) || ageNumber < 18 || ageNumber > 80) {
      next.age = 'Enter age 18–80';
    }
    if (!gender) next.gender = 'Select gender';
    if (!caste.trim()) next.caste = 'Caste is required';
    if (!gotra.trim()) next.gotra = 'Gotra is required';
    return next;
  };

  const goHome = async () => {
    await skipProfile();
    router.replace('/(tabs)');
  };

  const handleContinue = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await submitForVerification({
        name: name.trim(),
        age: age.trim(),
        gender: gender!,
        caste: caste.trim(),
        gotra: gotra.trim(),
      });
      showToast('Sent for verification');
      router.replace('/(tabs)');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
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
          </View>

          <View style={styles.card}>
            <Field
              label="Full name"
              placeholder="Your name"
              value={name}
              onChangeText={(v) => {
                setName(v);
                if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
              }}
              autoCapitalize="words"
              error={errors.name}
            />

            <View style={styles.row}>
              <View style={styles.ageField}>
                <Field
                  label="Age"
                  placeholder="25"
                  value={age}
                  onChangeText={(v) => {
                    setAge(v.replace(/[^0-9]/g, ''));
                    if (errors.age) setErrors((e) => ({ ...e, age: undefined }));
                  }}
                  keyboardType="number-pad"
                  maxLength={2}
                  error={errors.age}
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
                        onPress={() => {
                          setGender(option);
                          if (errors.gender) {
                            setErrors((e) => ({ ...e, gender: undefined }));
                          }
                        }}
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
                {errors.gender ? (
                  <Text style={styles.inlineError}>{errors.gender}</Text>
                ) : null}
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Community</Text>

            <Field
              label="Caste"
              placeholder="e.g. Brahmin"
              value={caste}
              onChangeText={(v) => {
                setCaste(v);
                if (errors.caste) setErrors((e) => ({ ...e, caste: undefined }));
              }}
              autoCapitalize="words"
              error={errors.caste}
            />

            <Field
              label="Gotra"
              placeholder="e.g. Bharadwaj"
              value={gotra}
              onChangeText={(v) => {
                setGotra(v);
                if (errors.gotra) setErrors((e) => ({ ...e, gotra: undefined }));
              }}
              autoCapitalize="words"
              error={errors.gotra}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label={submitting ? 'Submitting…' : 'Continue'}
            onPress={handleContinue}
            disabled={submitting}
          />
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
    backgroundColor: colors.orange,
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
  inlineError: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.orange,
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
});
