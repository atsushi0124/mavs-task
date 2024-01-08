<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";
import { ref } from "vue";

// ユーザーストアを取得
const userStore = useUserStore();
// 転送処理を行うためのフック
const $router = useRouter();

// DOM要素への参照を作成
let deleteIcon = ref(true);
const cancelBtn = ref(null);
const deleteBtn = ref(null);

// サインインしているかチェック
// していない場合はサインインページに飛ばす
if (!userStore.isLoggedIn) {
  $router.push("/signin");
}

// ゴミ箱アイコンの削除
const MemoDelete = () => {
  // deleteIconを非表示にし、cancelBtnとdeleteBtnを表示
  if (deleteIcon.value) {
    deleteIcon.value = false;
  } else {
    deleteIcon.value = true;
  }
  return deleteIcon;
  // if (cancelBtn.value && deleteBtn.value) {
  //   cancelBtn.value.classList.remove("none");
  //   deleteBtn.value.classList.remove("none");
  // }
};

// キャンセルボタンを押した時にゴミ箱アイコンを表示
// const cancel = () => {
//   if (deleteIcon.value) {
//     deleteIcon.value.classList.remove("deleteIcon_none");
//   }
//   if (cancelBtn.value && deleteBtn.value) {
//     cancelBtn.value.classList.add("none");
//     deleteBtn.value.classList.add("none");
//   }
//   return deleteIcon.value;
// };

console.log(deleteIcon.value);
</script>

<template>
  <div class="container">
    <div id="delToggleBtn" class="delToggleBtn">
      <img
        v-if="deleteIcon"
        @click="MemoDelete"
        ref="deleteIcon"
        id="deleteIcon"
        src="../assets/images/delete.svg"
        alt="削除アイコン"
      />
      <div v-else>
        <button
          @click="MemoDelete"
          ref="cancelBtn"
          id="cancelBtn"
          class="cancel"
        >
          キャンセル
        </button>
        <button ref="deleteBtn" id="deleteBtn" class="delete">削除</button>
      </div>
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
          <div class="checked checked_active"></div>
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
    width: 35px;
    height: 35px;
  }
  .cancel {
    margin-right: 10px;
    height: 35px;
    color: $colorPurple;
    border-radius: 5px;
    background-color: $colorWhite;
    border: $colorPurple 2px solid;
    &:hover {
      background-color: $colorPurple;
      color: $colorWhite;
    }
  }
  .delete {
    background-color: $colorRed;
    border: 2px solid $colorRed;
    border-radius: 5px;
    color: $colorWhite;
    height: 35px;
    transition: 0.5s;
    &:hover {
      background-color: $colorWhite;
      color: $colorRed;
    }
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
    position: relative;
    .description {
      width: 220px;
      height: 200px;
      background-color: $background;
      border-radius: 5px;
      margin-left: 30px;
      padding: 10px;
    }
    .checked {
      position: absolute;
      content: "";
      bottom: 25%;
      right: 5%;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: none;
      border: 2px solid $colorWhite;
    }
    .checked_active {
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 20;
      padding-top: 2px;
      background-color: $colorPurple;
      background-position: center;
      background-size: 15px;
      background-repeat: no-repeat;
      background-image: url("../assets/images/check.png");
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
