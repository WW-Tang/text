<template>
  <!-- 头部组件 -->
  <!-- 容器 -->
  <div class="roqi">
    <div class="Headshot">
      <!-- 内容容器 -->
      <div class="Headshot-box">
        <van-nav-bar left-text="返回" left-arrow @click-left.stop="onClickLeft">
          <div class="title" slot="title">{{title}}</div>
          <div class="Headshot-icon__right" slot="right">
            <div class="right_bookshelf" @click.stop="bookshelfClickFn"></div>
            <div class="right_home" @click.stop="homeClickFn"></div>
          </div>
        </van-nav-bar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Headshot",
  props: ["title"],
  methods: {
    // 返回按钮的事件处理函数
    onClickLeft() {
      this.$router.go(-1);
    },
    bookshelfClickFn() {
      this.$router.push({
        path: "/bookrack"
      });
    },
    homeClickFn() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.roqi {
  position: relative;
  height: 1.17333rem;
  width: 100%;
  .Headshot {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .Headshot-box {
      width: 100%;
      .van-nav-bar {
        height: 1.17333rem;
        background-color: #b93321 !important;

        .van-nav-bar__left {
          display: flex;
          justify-content: center;
          left: 5px;
          &:active{
            background-color: transparent;
          }
          i {
            &::before {
              color: white;
              line-height: 1.17333rem;
              font-size: 16px;
            }
          }
          span {
            color: white;
            line-height: 1.17333rem;
            font-size: 12px;
          }
        }

        .van-nav-bar__title {
          .title {
            color: white;
            line-height: 1.17333rem;
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        .van-nav-bar__right {
          right: 10px;

          .Headshot-icon__right {
            div {
              width: 0.66667rem;
              height: 1.17333rem;
              background-size: 100% 60%;
              background-repeat: no-repeat;
              background-position: 50%;
              float: left;
            }
            .right_bookshelf {
              background-image: url(../assets/bookshelf.png);
              margin-right: 5px;
            }
            .right_home {
              background-image: url(../assets/home.png);
            }
          }
        }
      }
    }
  }
}
</style>