import { Redirect } from 'expo-router';

/** First route: send users to the welcome / get-started experience. */
export default function Index() {
  return <Redirect href="/welcome" />;
}
