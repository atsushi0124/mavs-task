<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/store/user";
import { getResponse, deleteResponse } from "~/types/api";
import Memo from "../layouts/Memo.vue";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

// ユーザーストアを取得
const userStore = useUserStore();
const token = userStore.token;
const user_id = userStore.user_id;
console.log(`index 17行目 ========= ${userStore.memo_id}`);
// 転送処理を行うためのフック
const $router = useRouter();

// DOM要素への参照を作成
let deleteIcon = ref(true);
const cancelBtn = ref(null);
const deleteBtn = ref(null);
let contents = ref<getResponse | null>(null);

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
};

// DBからメモを取得
const getMemo = async () => {
  try {
    const { data } = await useFetch<getResponse>(
      `${apiBaseUrl}/getArticle/getArticle`,
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      }
    );
    contents.value = data.value;
    return contents.value;
  } catch (error) {
    console.log(error);
  }
};

// メモをクリックするとクリックしたIDを取得
const handleMemoClick = (event: MouseEvent) => {
  const clickedElement = event.currentTarget as HTMLElement;
  const Memo_id = parseInt(clickedElement.id);
  userStore.memo_id = Memo_id;
  console.log(`index 72行目 ========= ${userStore.memo_id}`);
  // $router.push("/createArticle");
};

// メモの削除
const deleteMemo = async () => {
  try {
    console.log(user_id);
    const { data } = await useFetch<deleteResponse>(
      `${apiBaseUrl}/deleteArticle/deleteArticle`,
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          user_id: user_id,
          memo_id: userStore.memo_id,
        }),
      }
    );
    getMemo();
    return contents.value;
  } catch (error) {
    console.log(error);
  }
};
getMemo();
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
        <button
          @click="deleteMemo"
          ref="deleteBtn"
          id="deleteBtn"
          class="delete"
        >
          削除
        </button>
      </div>
    </div>
    <div class="center">
      <!-- メモの追加ボタン -->
      <NuxtLink to="/createArticle" class="memoAddLink">
        <div class="memoAdd"></div>
      </NuxtLink>
      <ul class="memoDB">
        <Memo :MemoList="contents" @click="handleMemoClick" />
      </ul>
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
