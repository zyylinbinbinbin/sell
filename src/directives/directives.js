import { isLogin } from "../assets/base";

export const notLogin = {
  bind(el) {
    if (isLogin()) {
      el.style.display = 'none';
    }
  }
};
