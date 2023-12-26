<script setup lang="ts">
// Vue 3のComposition APIの一部であるref関数をインポート
import { ref } from "vue";

// refを使用して、memoTitleとmemoDescという名前のリアクティブな参照を作成
// これらはそれぞれinputとtextareaの値を保持します
const memoTitle = ref("");
const memoDesc = ref("");

// addMemoという名前の関数を定義
// この関数は、ユーザーが保存ボタンをクリックしたときに実行されます
const addMemo = () => {
  // memoTitleとmemoDescの現在の値をコンソールに出力
  console.log(memoTitle.value, memoDesc.value);
};

// タイトルを入力後、Enterキーを押すと次のテキストエリアにフォーカスを移動
const handleEnter = (event: KeyboardEvent) => {
  event.preventDefault();
  // 次のテキストエリアにフォーカスを移動
  (document.getElementById("Memo__desc") as HTMLInputElement).focus();
};
</script>

<template>
  <div class="container">
    <!-- 省略 -->
    <div class="center">
      <div class="memo__header">
        <NuxtLink to="/">
          <img src="../assets/images/back.svg" alt="前の画面に戻る" />
        </NuxtLink>
        <!-- 保存ボタンのクリックイベントにaddMemo関数をバインド -->
        <!-- .prevent修飾子は、クリックイベントのデフォルトの動作（この場合、フォームの送信）を防ぐ -->
        <button @click.prevent="addMemo" class="save__btn">保存</button>
      </div>

      <form>
        <!-- 省略 -->
        <!-- v-modelディレクティブを使用して、inputの値をmemoTitleにバインド -->
        <input
          class="memo__title"
          name="memo__ttl"
          type="text"
          id="memo__ttl"
          placeholder="タイトルを入力してください"
          v-model="memoTitle"
          @keydown.enter="handleEnter"
        />

        <!-- v-modelディレクティブを使用して、textareaの値をmemoDescにバインド -->
        <textarea
          name="memo__desc"
          id="Memo__desc"
          class="memo__desc"
          placeholder="内容を入力してください"
          v-model="memoDesc"
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
  // メモの追加ボタンの指定
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
