import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: { email: string } | null;
  isAuthenticated: boolean;
  setAuth: (token: string | null, email?: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access") || null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  isAuthenticated: !!localStorage.getItem("access"),
  
  setAuth: (token, email) => {
    if (token) {
      localStorage.setItem("access", token);
      if (email) {
        localStorage.setItem("user", JSON.stringify({ email }));
        set({ accessToken: token, user: { email }, isAuthenticated: true });
      }
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("user");
      set({ accessToken: null, user: null, isAuthenticated: false });
    }
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    set({ accessToken: null, user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
