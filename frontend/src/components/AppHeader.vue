<script setup lang="ts">
import { useUserStore } from "~/store/user";

// ユーザーストアを取得
const userStore = useUserStore();

const isTopPage = ref(false); // トップページかどうかを判定するリアクティブな変数

onMounted(() => {
  // 例としてmountedフック内でURLをチェックし、トップページかどうかを判定
  isTopPage.value = window.location.pathname === "/"; // ルートパスがトップページであるかどうか
});
</script>

<template>
  <!-- アプリケーションの共通ヘッダー -->
  <header class="header">
    <div class="header__inner">
      <h1>
        <NuxtLink to="/">メモアプリ</NuxtLink>
      </h1>
      <div v-if="userStore.isLoggedIn" class="signin">
        <p>ようこそ！<br />{{ userStore.email }}さん</p>
        <button type="button" @click="userStore.logout()">ログアウト</button>
      </div>
      <div v-else="!userStore.isLoggedIn">
        <NuxtLink to="/signin">サインイン</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 90%;
    padding: 30px 0;
    margin: 0 auto;
  }
}
.signin {
  display: flex;
  justify-content: flex-end;
  width: 70%;
  img {
    height: 40px;
    margin-right: 10px;
  }
  button {
    height: 30px;
  }
}
</style>
