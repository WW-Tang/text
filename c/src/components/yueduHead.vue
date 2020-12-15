<template>
  <div class="yueduHead">
    <van-nav-bar :title="title" left-text="返回" @click-left="onClickLeft" left-arrow>
      <van-icon slot="right">
        <ul class="drop-down">
          <li class="home" @click.stop="goRouteHomeFn">
            <span></span> 首页
          </li>
          <li class="bookrack" @click.stop="goRouteBookrack">
            <span></span> 书架
          </li>
          <li class="xiangqing" @click.stop="goRoutexiangqing">
            <span></span> 详情
          </li>
        </ul>
      </van-icon>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: ["title", "id"],
  methods: {
    onClickLeft() {
      window.console.log('返回');
      this.$router.go(-1);
    },
    goRouteHomeFn() {
      this.$router.push({
        path: "/"
      });
    },

    goRouteBookrack() {
      this.$router.push({
        path: "/bookrack"
      });
    },

    goRoutexiangqing() {
      this.$router.push({
        path: "/xiangqingye",
        query: {
          id: this.id
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.yueduHead {
  width: 100%;
  .van-nav-bar {
    height: 1.17333rem;
    background-color: rgba(50, 51, 52, 0.9);
    .van-nav-bar__left {
      i {
        transform: translate(0, 16%);
      }
      span {
        transform: translate(-5px, 10%);
      }
    }
    .van-nav-bar__text {
      color: #fff;
      line-height: 1.17333rem;
      font-size: 12px;
    }
    .van-nav-bar__title {
      color: #fff;
      line-height: 1.17333rem;
      font-size: 14px;
      font-weight: bold;
    }
    .van-nav-bar__right {
      width: 20px;
      height: 20px;
      background-image: url(../assets/yuedu-right.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      position: absolute;
      top: 50%;
      margin-top: -10px;
      .drop-down {
        position: absolute;
        top: 13px;
        right: -12px;
        background: #333;
        width: 75px;
        height: 80px;
        border-radius: 3px;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: -5px;
          right: 10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0.10667rem 0.16rem;
          border-color: transparent transparent #333 transparent;
        }
        li {
          font-size: 12px;
          height: 25px;
          line-height: 25px;
          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 3px;
          }
        }
        li:nth-child(2) {
          height: 27px;
          border-width: 1px;
          border-color: #000 transparent #000 transparent;
          border-style: solid;
          line-height: 25px;
        }
        li.home {
          span {
            background-image: url(../assets/yuedu_right_home.png);
          }
        }
        li.bookrack {
          background-color: #333;
          span {
            background-image: url(../assets/yuedu_right_bookrack.png);
          }
        }
        li.xiangqing {
          span {
            background-image: url(../assets/yuedu_right_xiangqing.png);
          }
        }
      }
    }
    .van-icon {
      color: #fff;
    }
  }
}
</style>