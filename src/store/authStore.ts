import { create } from "zustand";

interface User {
  email: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  gender ?: string,
  passport_number ?: string,
  date_of_birth ?: string,
  citizenship ?: string,
  international_passport_number ?: string,
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string | null, user?: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("access") || null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  isAuthenticated: !!localStorage.getItem("access"),

  setAuth: (token, user) => {
    if (token) {
      localStorage.setItem("access", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        set({ accessToken: token, user, isAuthenticated: true });
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
