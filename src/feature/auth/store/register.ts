import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Fields = {
  firstName: string;
  lastName: string;
  handle: string;
  avatar?: string;
  bio?: string;
};

type State = Fields & {
  setProfile: (fields: Fields) => void;
  clear: () => void;
};

export const useRegisterStore = create(
  persist<State>(
    (set) => ({
      firstName: "",
      lastName: "",
      handle: "",
      avatar: "",
      bio: "",
      setProfile: (fields) => set(fields),
      clear: () =>
        set({ firstName: "", lastName: "", handle: "", avatar: "", bio: "" }),
    }),
    {
      name: "register-profile",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
