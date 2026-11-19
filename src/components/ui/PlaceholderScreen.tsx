import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';

type Props = {
  title: string;
  subtitle: string;
};

export function PlaceholderScreen({ title, subtitle }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
  header: {
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.4,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSubtle,
    fontWeight: '500',
    maxWidth: 280,
  },
});
