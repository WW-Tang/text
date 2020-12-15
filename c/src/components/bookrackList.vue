<template>
  <div class="wrapper">
    <div class="bookrackList">
      <div class="bookrackList-box" @click.stop="goRoutexiangqingyeFn">
        <div class="left" :style="{backgroundImage:'url('+item.cover+')'}"></div>
        <div class="right">
          <h4 class="name">{{item.title}}</h4>
          <p>{{item.time}}</p>
          <p class="history">阅读到第{{item.index}}章</p>
        </div>
        <div class="toDetail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    goRoutexiangqingyeFn() {
      this.$router.push({
        path: "/xiangqingye",
        query: {
          id: this.item.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 2.8rem;
  padding-left: 0.4rem;
  background-color: white;
  .bookrackList {
    width: 100%;
    height: 100%;
    padding: 0.4rem;
    padding-left: 0;
    border-bottom: 1px solid #ccc;
    .bookrackList-box {
      width: 100%;
      height: 100%;
      padding-right: 0.4rem;
      position: relative;

      .left {
        float: left;
        width: 1.6rem;
        height: 2rem;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .right {
        margin-left: 2rem;
        text-align: left;
        p {
          height: 0.53333rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        h4,
        p {
          margin: 0;
        }
        .name {
          font-size: 14px;
          color: #333;
          line-height: 0.50667rem;
          font-weight: bold;
        }
        p {
          font-size: 12px;
          color: #999;
        }
      }
      .toDetail {
        width: 1.33333rem;
        height: 1.33333rem;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.65555rem;
        background-image: url(https://wechatapp.zhuishushenqi.com/zhuishu/images/icon/toBookDetail.png);
        background-size: 0.66667rem 0.66667rem;
        background-repeat: no-repeat;
        background-position: 100% 0%;
      }
    }
  }
}
</style>