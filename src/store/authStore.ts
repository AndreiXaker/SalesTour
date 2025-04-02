import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access") || null,
  isAuthenticated: !!localStorage.getItem("access"),
  setAuth: (token) => {
    if (token) {
      localStorage.setItem("access", token);
      set({ accessToken: token, isAuthenticated: true });
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      set({ accessToken: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
