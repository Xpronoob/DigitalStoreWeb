import { userModel } from '@/models/user.models';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: userModel | null;
  setUser: (user: userModel) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null })
      }),
      {
        name: 'user-auth'
      }
    ),
    { name: 'UserStore' }
  )
);
