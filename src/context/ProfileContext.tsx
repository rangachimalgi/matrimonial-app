import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  emptyDraft,
  loadProfileState,
  saveProfileState,
  type ProfileDraft,
  type ProfileState,
  type ProfileStatus,
} from '@/lib/profile-storage';

type ProfileContextValue = {
  ready: boolean;
  status: ProfileStatus;
  draft: ProfileDraft | null;
  submitForVerification: (draft: ProfileDraft) => Promise<void>;
  skipProfile: () => Promise<void>;
  markVerified: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<ProfileState>({
    status: 'incomplete',
    draft: null,
  });

  useEffect(() => {
    let mounted = true;
    loadProfileState().then((loaded) => {
      if (!mounted) return;
      setState(loaded);
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: ProfileState) => {
    setState(next);
    await saveProfileState(next);
  }, []);

  const submitForVerification = useCallback(
    async (draft: ProfileDraft) => {
      await persist({ status: 'pending', draft });
    },
    [persist],
  );

  const skipProfile = useCallback(async () => {
    await persist({
      status:
        state.status === 'pending' || state.status === 'verified'
          ? state.status
          : 'incomplete',
      draft: state.draft ?? emptyDraft,
    });
  }, [persist, state.draft, state.status]);

  const markVerified = useCallback(async () => {
    await persist({
      status: 'verified',
      draft: state.draft,
    });
  }, [persist, state.draft]);

  // Demo: auto-approve after waiting for confirmation
  useEffect(() => {
    if (state.status !== 'pending') return;
    const timer = setTimeout(() => {
      void markVerified();
    }, 4000);
    return () => clearTimeout(timer);
  }, [state.status, markVerified]);

  const value = useMemo(
    () => ({
      ready,
      status: state.status,
      draft: state.draft,
      submitForVerification,
      skipProfile,
      markVerified,
    }),
    [
      ready,
      state.status,
      state.draft,
      submitForVerification,
      skipProfile,
      markVerified,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return ctx;
}
