import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

type Props = {
  onPress: () => void;
  label?: string;
};

export function GetStartedButton({ onPress, label = 'Get Started' }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
      {/* <View style={styles.dot}>
        <Text style={styles.heart}>♥</Text>
      </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.black,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: radius.xl,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
});
