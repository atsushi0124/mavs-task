<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;
// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// フォームの設定
const { handleSubmit, isSubmitting } = useForm({
  // バリデーションルール
  validationSchema: {
    email(value: string) {
      // 必須
      if (!value) {
        return "メールアドレスを入力してください";
      }
      // メールアドレスの形式
      const emailPattern =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return "メールアドレスの形式が正しくありません";
      }
      return true;
    },
    password(value: string) {
      if (!value) {
        return "パスワードを入力してください";
      }
      return true;
    },
  },
});
// フィールドの値とエラーメッセージを取得
const { value: email, errorMessage: emailErrorMessage } = useField("email");
const { value: password, errorMessage: passwordErrorMessage } =
  useField("password");

/**
 * サインイン処理
 */
const onSubmit = handleSubmit(async () => {
  try {
    // ログインAPIを呼び出す -> /backend/src/routes/auth/auth.router.tsを参照
    const { data } = await useFetch<SignInResponse>(
      `${apiBaseUrl}/auth/signin`,
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      }
    );

    // レスポンスのデータを取得（ref値）
    const response = data.value;
    console.log(data.value);
    // トークンの有無でログインできたか判断
    const hasToken = response && !!response.token;
    if (hasToken) {
      // 成功の場合はトークンを保存
      userStore.token = response.token;
      userStore.email = response.email;
      // トップページに遷移
      $router.push("/");
    } else {
      // 失敗の場合はフィールドをクリア
      email.value = "";
      password.value = "";
    }
    console.log(data);
    console.log(hasToken);
  } catch (error) {
    console.log(error);
  }
});

// ページのタイトルなどを設定
useHead({
  title: "サインインページ",
});
</script>

<template>
  <div class="Container">
    <div class="Block__main">
      <h2>サインイン</h2>
      <form @submit="onSubmit">
        <label for="E-mail">
          <p class="label">E-mail</p>
          <p class="error">{{ emailErrorMessage }}</p>
          <input
            v-model="email"
            class="email__input"
            name="email"
            type="email"
            id="E-mail"
          />
        </label>

        <label for="PassWord">
          <p class="label">パスワード</p>
          <p class="error">{{ passwordErrorMessage }}</p>
          <input
            v-model="password"
            name="password"
            type="password"
            autocomplete="on"
            id="PassWord"
            class="passWord__input"
          />
        </label>
        <button class="submit__btn" type="submit" :disabled="isSubmitting">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ブロックのcss
.Container {
  position: relative;
  .Block__main {
    height: auto;
    width: 50%;
    max-width: 600px;
    background: #cdcdcd;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    flex-direction: column;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -15%);
    -webkit-transform: translate(-50%, 25%);
    -ms-transform: translate(-50%, -50%);
  }
}

// フォームのcss
form {
  width: 70%;
  margin: 0 auto;
  label {
    display: block;
    .label {
      text-align: left;
      margin: 5px 0;
    }
    input {
      width: 100%;
      height: 35px;
      border-radius: 5px;
      border: none;
    }
    .email__input {
      margin-bottom: 20px;
    }
    .passWord__input {
      margin-bottom: 60px;
    }
  }

  // ボタンのcss
  .submit__btn {
    width: 100%;
    margin-bottom: 50px;
    height: 35px;
    font-weight: 400;
    border-radius: 5px;
    border: none;
    background-color: $colorPurple;
    color: $colorWhite;
    border: $colorPurple solid 2px;
    transition: 0.5s;
    &:hover {
      background-color: $colorWhite;
      color: $colorPurple;
    }
  }
}

h2 {
  padding: 30px;
  font-size: 1.8rem;
  @media #{$pc} {
    font-size: 2.4rem;
  }
}
.error {
  text-align: left;
  /* ~/assets/style/_variables.scssで定義した変数を使うことができます */
  color: $colorRed;
  margin-top: -5px;
}
</style>
