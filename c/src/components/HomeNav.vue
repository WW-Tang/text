<template>
  <div class="nav">
    <div class="nav-box">
      <div class="logo"></div>
      <div class="sex">
        <button :class="{active: $store.state.sex === '男'}" @click="ClickFnMan">男生</button>
        <button :class="{active: $store.state.sex === '女'}" @click="ClickFnWoMan">女生</button>
      </div>
      <div class="icon">
        <span @click="bookrackClickFn">
          <van-icon name="hotel-o" />
        </span>
        <span>
          <van-icon name="contact" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeNav",
  methods: {
    ClickFnMan() {
      this.$store.commit("setSex", "男");
      window.console.log(this.$store.state.sex);
    },
    ClickFnWoMan() {
      window.console.log("女");
      this.$store.commit("setSex", "女");
      window.console.log(this.$store.state.sex);
    },
    bookrackClickFn() {
      this.$router.push({ path: "/bookrack" });
    }
  }
};
</script>
<style lang="less">
.nav {
  width: 100%;
  height: 42px;
  background: #b83320;
  padding: 10px 15px;
  // position: fixed;
  // left: 0;
  // top: 0;
  // z-index: 99;
  .nav-box {
    width: 100%;
    height: 100%;
    position: relative;
    .logo {
      width: 2.08rem;
      height: 0.48rem;
      background-image: url(../assets/fictionLogo.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      margin-top: -0.24rem;
    }
    .sex {
      display: inline-block;
      width: 2.61333rem;
      height: 0.77333rem;
      font-size: 0.37333rem;
      // 文字和图片垂直居中
      // vertical-align: middle;
      // margin: 0 auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      button {
        border: none;
        outline: none;
        color: white;
        border: 1px solid white;
        background-color: transparent;
        width: 50%;
        height: 100%;
        line-height: 22px;
        &:nth-child(1) {
          border-radius: 15px 0px 0px 15px;
        }
        &:nth-child(2) {
          border-radius: 0px 15px 15px 0px;
        }
      }

      .active {
        background: white;
        color: #999;
      }
    }
    .icon {
      color: white;
      float: right;
      height: 100%;
      font-size: 0.6rem;
      span {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
</style>