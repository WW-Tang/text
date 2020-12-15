<template>
  <div class="wrapper">
    <div class="wrapper-box">
      <span>最近阅读</span>
      <span>|</span>
      <template v-if="ischange">
        <span @click.stop="goRouteyuedubookFn">{{book.title}} 第{{book.index}}章</span>
      </template>
      <template v-else>
        <span>暂无阅读记录</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recentlyread",
  data() {
    return {
      ischange: null,
      book: null
    };
  },
  methods: {
    goRouteyuedubookFn() {
      this.$router.push({
        path: "/yuedubook",
        query: { ...this.book }
      });
    }
  },
  created() {
    var bookrack = JSON.parse(localStorage.getItem("bookrack"));
    if (bookrack) {
      this.book = bookrack[bookrack.length - 1];
      this.ischange = true;
    } else {
      this.ischange = false;
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 1.06667rem;
  padding: 0 30px;
  margin-bottom: 15px;
  background-color: #fff;
  .wrapper-box {
    width: 100%;
    height: 100%;
    line-height: 1.06667rem;
    text-align: left;
    span {
      margin-right: 5px;
      &:nth-child(1) {
        color: #999;
        font-size: 12px;
      }
      &:nth-child(2) {
        color: #999;
        font-size: 14px;
        font-weight: 100;
      }
      &:nth-child(3) {
        color: #da6161;
      }
    }
  }
}
</style>