import { create } from "zustand";

export interface authState {
  user: any;
  authorized: boolean;
  error: string;
}
export interface authFuncs {
  getUser: () => void;
}

const useStore = create<authState & authFuncs>((set) => ({
  user: null,
  authorized: false,
  error: "",

  getUser: () => {
    fetch(`/api/auth?token=${localStorage.getItem("token")}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Authorization required") {
          set(() => ({ user: null }));
          set(() => ({ authorized: false }));
          set(() => ({ error: data.msg }));
        } else {
          set(() => ({ user: data.user }));
          set(() => ({ authorized: true }));
        }
      });
  },
}));

export default useStore;
