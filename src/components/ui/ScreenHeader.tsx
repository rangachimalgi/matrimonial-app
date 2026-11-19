import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants/theme';

type Props = {
  title?: string;
  skipLabel?: string;
  onSkip?: () => void;
};

export function ScreenHeader({ title, skipLabel = 'Skip', onSkip }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title ?? ''}</Text>
      {onSkip ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={skipLabel}
          onPress={onSkip}
          hitSlop={12}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.skip}>{skipLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  skip: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSubtle,
  },
  spacer: {
    width: 40,
  },
  pressed: {
    opacity: 0.6,
  },
});
