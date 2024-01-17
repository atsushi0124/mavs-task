<script setup lang="ts">
// Vue 3のComposition APIの一部であるref関数をインポート
import { ref } from "vue";
import { AddMemoResponse, viewResponse } from "~/types/api";
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { watch } from "vue";

// 環境変数（.env参照）からAPIのベースURLを取得
const $config = useRuntimeConfig();
const apiBaseUrl = $config.public.apiBaseUrl;

// ユーザーストアを取得
const userStore = useUserStore();
const token = userStore.token;
const user_id = userStore.user_id;
const memo_id = userStore.memo_id;

// 転送処理を行うためのフック
const $router = useRouter();

// resTitle, resMemo_id, resContentをリアクティブな参照として定義
const resTitle = ref("");
const resMemo_id = ref();
const resContent = ref("内容を入力してください");

// resTitleが変更されたときにmemoTitleを更新するウォッチャ
watch(resTitle, (newTitle) => {
  memoTitle.value = newTitle;
});

watch(resContent, (newContent) => {
  memoDesc.value = newContent;
});
// フォームの設定
// handleSubmitとisSubmittingはvee-validateから取得
const { handleSubmit, isSubmitting } = useForm({
  // バリデーションルール
  // memoTitleとmemoDescは必須
  validationSchema: {
    memoTitle(value: string) {
      if (!value) {
        return "タイトルを入力してください";
      }
      return true;
    },
    memoDesc(value: string) {
      if (!value) {
        return "内容を入力してください";
      }
      return true;
    },
  },
});

// フィールドの値とエラーメッセージを取得
// useFieldはvee-validateから取得
const { value: memoTitle, errorMessage: titleErrorMessage } =
  useField("memoTitle");

const { value: memoDesc, errorMessage: memoDescErrorMessage } =
  useField("memoDesc");

// addMemoという名前の関数を定義
// この関数は、ユーザーが保存ボタンをクリックしたときに実行
// メモのタイトルと内容をログに出力し、APIを呼び出してメモを保存
const addMemo = handleSubmit(async () => {
  try {
    // const { signin } = await useFetch<SignInResponse>
    console.log(memoTitle.value, memoDesc.value);
    const { data } = await useFetch<AddMemoResponse>(
      `${apiBaseUrl}/articles/createArticle`,
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          title: memoTitle.value,
          content: memoDesc.value,
          user_id: user_id,
        }),
      }
    );
    console.log(data.value);
    $router.push("/");
  } catch (error) {
    console.log(error);
  }
});

// メモidがある場合は表示する
const viewMemo = async () => {
  try {
    console.log(user_id, memo_id);
    const { data } = await useFetch<viewResponse>(
      `${apiBaseUrl}/viewArticle/viewArticle`,
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          user_id: user_id,
          memo_id: memo_id,
        }),
      }
    );
    if (data.value) {
      resMemo_id.value = data.value.memo_id;
      resTitle.value = data.value.title;
      resContent.value = data.value.content;
    }
    return data.value;
  } catch (error) {
    console.log(error);
  }
};

// メモの更新
const updateMemo = handleSubmit(async () => {
  try {
    // const { signin } = await useFetch<SignInResponse>
    console.log(memoTitle.value, memoDesc.value);
    const { data } = await useFetch<AddMemoResponse>(
      `${apiBaseUrl}/updateArticle/updateArticle`,
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: JSON.stringify({
          title: memoTitle.value,
          content: memoDesc.value,
          user_id: user_id,
          memo_id: memo_id,
        }),
      }
    );
    console.log(data.value);
    $router.push("/");
  } catch (error) {
    console.log(error);
  }
});

if (userStore.memo_id) {
  console.log(`👹${userStore.memo_id}`);
  viewMemo();
}

const addUp = () => {
  if (userStore.memo_id) {
    updateMemo();
  } else {
    addMemo();
  }
};

// ページのタイトルなどを設定
useHead({
  title: "メモ追加ページ",
});
</script>

<template>
  <div class="container">
    <div class="center">
      <div class="memo__header">
        <NuxtLink to="/">
          <img src="../assets/images/back.svg" alt="前の画面に戻る" />
        </NuxtLink>
        <NuxtLink to="/">
          <button
            @click.prevent="addUp"
            class="save__btn"
            :disabled="isSubmitting"
          >
            保存
          </button>
        </NuxtLink>
        <!-- 保存ボタンのクリックイベントにaddMemo関数をバインド -->
        <!-- .prevent修飾子は、クリックイベントのデフォルトの動作（この場合、フォームの送信）を防ぐ -->
      </div>

      <form @submit.prevent="">
        <p class="title-err">{{ titleErrorMessage }}</p>
        <input
          class="memo__title"
          name="memo__ttl"
          type="text"
          id="memo__ttl"
          v-model="memoTitle"
          placeholder="タイトルを入力してください"
        />

        <!-- v-modelディレクティブを使用して、textareaの値をmemoDescにバインド -->
        <!-- ユーザーがここに入力した内容がmemoDescに保存されます -->
        <p class="content-err">{{ memoDescErrorMessage }}</p>
        <textarea
          v-model="memoDesc"
          v-bind="resContent.value"
          name="memo__desc"
          id="Memo__desc"
          class="memo__desc"
          placeholder="内容を入力してください"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// メモ一覧画面の全体の指定
.container {
  display: flex;
  justify-content: space-around;
  height: calc(100vh - 108px);
}
.left {
  border-right: #000 solid 2px;
  width: 100px;
}

// メモの一覧表示の指定
.center {
  width: 74%;
  .memo__header {
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: 0 0 34px 10px;
    img {
      width: 30px;
    }
    .save__btn {
      border: $colorPurple solid 3px;
      background-color: $colorPurple;
      border-radius: 5px;
      color: $colorWhite;
      width: 65px;
      font-size: 20px;
      padding: 5px;
      transition: 0.5s;
      &:hover {
        background-color: $colorWhite;
        border: $colorPurple solid 3px;
        color: $colorPurple;
      }
    }
  }
}

form {
  display: flex;
  margin: 0 0 0 10px;
  flex-direction: column;
  width: 80%;

  .date {
    font-size: 15px;
    margin-bottom: 30px;
  }
  .title-err {
    color: $colorRed;
    margin-bottom: 5px;
  }
  .content-err {
    color: $colorRed;
    margin-bottom: 5px;
  }
  .memo__title {
    border: none;
    font-size: 30px;
    margin-bottom: 15px;
  }
  .memo__desc {
    border: none;
    font-size: 18px;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
