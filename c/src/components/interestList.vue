<template>
  <div class="interestList">
    <div class="head">
      <div class="title">你可能感兴趣</div>
      <div class="more">更多</div>
    </div>
    <div class="list">
      <div class="list-box">
        <div class="item" v-for="(item, index) in obj" :key="index" @click.stop='goRoutexiangqingyeFn(item._id)'>
          <img :src="formating(item.cover)" alt />
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "interestList",
  props: ["obj"],
  methods: {
    formating(str) {
      return window.unescape(str).slice(7);
    },
    goRoutexiangqingyeFn(id) {
      this.$router.push({
        path: "/xiangqingye",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.interestList {
  width: 100%;
  padding: 0 15px;

  .head {
    width: 100%;
    height: 1.2rem;
    .title {
      position: relative;
      float: left;
      height: 100%;
      line-height: 1.2rem;
      font-weight: 700;
      font-size: 14px;
      &::before {
        content: "";
        display: block;
        background-color: #b93321;
        width: 3px;
        height: 50%;
        position: absolute;
        left: -15px;
        top: 50%;
        margin-top: -0.3rem;
      }
    }
    .more {
      height: 100%;
      line-height: 1.2rem;
      float: right;
      color: #b93321;
      font-weight: 700;
      font-size: 12px;
    }
  }

  //   列表
  .list {
    width: 100%;
    // padding: 10px 20px 10px 15px;
    .list-box {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      .item {
        width: 20%;
        margin-right: 15px;
        display: inline-block;

        img {
          max-width: 100%;
          height: 2.13333rem;
        }
        span {
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>