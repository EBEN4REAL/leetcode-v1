import { atom } from "recoil";

type AuthModalState_ = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

const initalAuthModalState: AuthModalState_ = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom<AuthModalState_>({
  key: "authModalState",
  default: initalAuthModalState,
});
