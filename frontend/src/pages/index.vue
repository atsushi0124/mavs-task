<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";
import { ref } from "vue";

// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// DOM要素への参照を作成します。
const deleteIcon = ref(null);

// サインインしているかチェック
// していない場合はサインインページに飛ばす
if (!userStore.isLoggedIn) {
  $router.push("/signin");
}

// メモ選択の処理
const MemoDelete = () => {
  if (deleteIcon.value) {
    deleteIcon.value.classList.add("deleteIcon_none");
    console.log(deleteIcon.value);
  } else {
    console.error("Delete icon not found");
  }
};
</script>

<template>
  <div class="container">
    <div class="delToggleBtn">
      <img
        ref="deleteIcon"
        @click="MemoDelete"
        id="deleteIcon"
        src="../assets/images/delete.svg"
        alt="削除アイコン"
      />
      <button ref="select" class="select none">キャンセル</button>
      <button ref="deletBtn" class="delete none">削除</button>
    </div>
    <div class="center">
      <!-- メモの追加ボタン -->
      <NuxtLink to="/createArticle" class="memoAddLink">
        <div class="memoAdd"></div>
      </NuxtLink>
      <div class="memoDB">
        <div class="page">
          <!-- <List :memo="memos" /> -->
          <!-- <Memo v-for="memo in memos" :key="memo" :memo="memo" /> -->
        </div>
        <!-- メモをDBから持ってきてタイトル/内容/日付を表示 -->
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
        <div class="memo">
          <p class="description">
            ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
          </p>
          <h4 class="title">タイトル</h4>
          <p class="date">2023.12.00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// メモ一覧画面の全体の指定
.delToggleBtn {
  display: flex;
  justify-content: right;
  flex-wrap: nowrap;
  width: 75%;
  margin: 20px auto;
  img {
    width: 40px;
  }
  .select {
    margin-right: 10px;
  }
  .delete {
    background-color: $colorRed;
    border: 2px solid $colorRed;
    border-radius: 5px;
    color: $colorWhite;
  }
  .none {
    display: none;
  }
}
.deleteIcon_none {
  display: none;
}

// メモの一覧表示の指定
.center {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 0 auto;

  // メモの追加ボタンの指定
  .memoAddLink {
    height: 140px;
  }
  .memoAdd {
    width: 160px;
    height: 140px;
    background-color: $background;
    border-radius: 5px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      border-radius: 5px;
      width: 40px;
      height: 6px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      background-color: $colorGray;
    }
    &::after {
      content: "";
      border-radius: 5px;
      position: absolute;
      width: 6px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      background-color: $colorGray;
    }
  }

  .memoDB {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    height: 200px;
  }
  .memo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    .description {
      width: 220px;
      height: 200px;
      background-color: $background;
      border-radius: 5px;
      margin-left: 30px;
      padding: 10px;
    }
    .title {
      margin-top: 5px;
      font-size: 15px;
    }
    .date {
      margin-top: 3px;
      font-size: 13px;
    }
  }
}
</style>
