import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  authorized: false,
  error: null,

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
