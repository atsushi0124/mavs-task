<script>
// Memoコンポーネントの定義
const Memo = defineComponent({
  // ...
  emits: ["click"],
  methods: {
    // クリックイベントを親ページに渡す処理
    handleClick(event) {
      this.$emit("click", event);
    },
    // 表示文字数を制限する処理
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },
    // 日付を正しく表示するための処理
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  props: ["MemoList"],

  // ...
});
export default Memo;
</script>
<template>
  <li
    v-for="content in MemoList"
    :key="content.id"
    :id="content.id"
    @click="handleClick"
  >
    <div class="memo">
      <p class="description">
        {{ truncateText(content.content, 80) }}
      </p>
      <h4 class="title">{{ truncateText(content.title, 10) }}</h4>
      <p class="date">{{ formatDate(content.createdDate) }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
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
    transition: 0.3s;
    word-break: break-all;
    line-height: 25px;
    letter-spacing: 1px;
    font-size: 15px;
  }
  .memoActive {
    border: $colorPurple solid 4px;
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
</style>
