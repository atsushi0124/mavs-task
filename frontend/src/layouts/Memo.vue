<script>
// Memoコンポーネントの定義
const Memo = defineComponent({
  // ...
  emits: ["click"],
  methods: {
    handleClick(event) {
      this.$emit("click", event);
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
        {{ content.content }}
        {{ content.id }}
      </p>
      <h4 class="title">{{ content.title }}</h4>
      <p class="date">{{ content.createdDate }}</p>
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
