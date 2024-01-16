import { defineStore } from "pinia";

interface State {
  id: Number;
  token: string;
  email: string;
  user_id: Number;
  memo_id?: number | null;
}

export const useUserStore = defineStore("user", {
  /**
   * ユーザーの認証情報を保持するためのState
   */
  state: (): State => {
    return {
      id: 0,
      token: "",
      email: "",
      user_id: 0,
      memo_id: null, // ここを変更
    };
  },

  actions: {
    /**
     * ログアウト
     */
    logout() {
      this.$reset();
    },
    /**
     * ログイン
     */
    login({ token, email, user_id }: State) {
      this.token = token;
      this.email = email;
      this.user_id = user_id;
    },
  },

  getters: {
    /**
     * ログイン状態の判定
     */
    isLoggedIn: (state) => {
      return state.token !== "";
    },
  },
});
