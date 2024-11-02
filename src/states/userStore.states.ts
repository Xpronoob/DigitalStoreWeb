import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null })
    }),
    {
      name: 'user-auth'
    }
  )
);
