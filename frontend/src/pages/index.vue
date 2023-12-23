<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "~/store/user";
import { SignInResponse } from "~/types/api";
</script>

<template>
  <div class="container">
    <div class="left">
      <p>left</p>
    </div>
    <div class="center">
      <!-- メモの追加ボタン -->
      <div class="memoAdd"></div>
      <div class="memoDB">
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
    <div class="right">
      <p>right</p>
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 74%;
  justify-content: flex-start;

  // メモの追加ボタンの指定
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
