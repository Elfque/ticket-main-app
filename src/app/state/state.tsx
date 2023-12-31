import { create } from "zustand";

export interface authState {
  user: any;
  authorized: boolean;
  error: string;
  months: string[];
  days: string[];
  // alert: any[];
}
export interface authFuncs {
  getUser: () => void;
  // addAlert: (text: string, type: string) => void;
}

const useStore = create<authState & authFuncs>((set) => ({
  user: null,
  authorized: false,
  error: "",
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
  // alert: [],

  getUser: () => {
    fetch("https://r3tro.pythonanywhere.com/auth/user/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Authorization required") {
          set(() => ({ user: null }));
          set(() => ({ authorized: false }));
          set(() => ({ error: data.msg }));
        } else {
          set(() => ({ user: data }));
          set(() => ({ authorized: true }));
        }
      });
  },
  // addAlert: (text: string, type: string) => {
  //   const id = uuidv4();
  //   set((state) => ({ alert: [...state.alert, { text, type, id: id }] }));

  //   setTimeout(() => {
  //     set((state) => ({ alert: state.alert.filter((ale) => ale.id !== id) }));
  //   }, 3000);
  // },
}));

export default useStore;
