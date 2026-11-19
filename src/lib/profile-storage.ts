import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProfileStatus = 'incomplete' | 'pending' | 'verified';

export type ProfileDraft = {
  name: string;
  age: string;
  gender: string;
  caste: string;
  gotra: string;
};

export type ProfileState = {
  status: ProfileStatus;
  draft: ProfileDraft | null;
};

const KEY = 'spark.profile.v1';

export const emptyDraft: ProfileDraft = {
  name: '',
  age: '',
  gender: '',
  caste: '',
  gotra: '',
};

export async function loadProfileState(): Promise<ProfileState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) {
      return { status: 'incomplete', draft: null };
    }
    return JSON.parse(raw) as ProfileState;
  } catch {
    return { status: 'incomplete', draft: null };
  }
}

export async function saveProfileState(state: ProfileState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}
