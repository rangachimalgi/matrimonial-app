import { Redirect } from 'expo-router';
import { useProfile } from '@/context/ProfileContext';

/** Boot route: returning users go to tabs; fresh installs see welcome. */
export default function Index() {
  const { ready, status } = useProfile();

  if (!ready) return null;

  if (status === 'verified' || status === 'pending') {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/welcome" />;
}
