<template>
  <div class="home">
    <div class="home-top">
      <HomeNav />

      <HomeSearch />
    </div>

    <!-- ====== -->
    <!-- <div class="nav-vant">
      <van-nav-bar>
        <van-icon name="logo" slot="left">
          <div class="logo"></div>
        </van-icon>
        <van-icon name="title" slot="title">
          <div class="sex">
            <button class="man" @click="ClickFnMan">男生</button>
            <button class="woman active" @click="ClickFnWoMan">女生</button>
          </div>
        </van-icon>

        <van-icon name="contact" class="icon" slot="right" />
        <van-icon name="hotel-o" class="icon" slot="right" />
      </van-nav-bar>
    </div>-->

    <div class="home-main">
      <!-- 轮播图 -->
      <slideshow />

      <!-- 功能栏 -->
      <functionnal />

      <!-- 最近阅读 -->
      <Recentlyread />

      <!-- 畅销短篇 -->
      <recommend v-for="(item, index) in current" :key="index" :obj="item" />

      <!-- 底部搜索以及分类 -->
      <homeFooter />
    </div>
  </div>
</template>

<script>
import HomeNav from "../components/HomeNav";
import HomeSearch from "../components/HomeSearch";
import slideshow from "../components/slideshow";
import functionnal from "../components/functionnal";
import Recentlyread from "../components/Recentlyread";
import recommend from "../components/recommend";
import homeFooter from "../components/homeFooter";

export default {
  name: "home",
  components: {
    HomeNav,
    HomeSearch,
    slideshow,
    functionnal,
    Recentlyread,
    recommend,
    homeFooter
  },
  data() {
    return {
      recommendArr: [
        [
          {
            title: "男生热门",
            id: 0
          },
          {
            title: "男生完本",
            id: 5
          },
          {
            title: "男生大神区",
            id: 15
          }
        ],
        [
          {
            title: "畅销短篇",
            id: 0
          },
          {
            title: "女生佳作",
            id: 5
          },
          {
            title: "女生红文区",
            id: 3
          }
        ]
      ],
      current: []
    };
  },
  computed: {
    sex() {
      return this.$store.state.sex;
    }
  },
  watch: {
    sex(newValue) {
      this.tabData(newValue);
    }
  },
  methods: {
    tabData(newValue) {
      if (newValue === "男") {
        this.current = this.recommendArr[0];
      } else {
        this.current = this.recommendArr[1];
      }
    },
    ClickFnMan() {
      window.console.log("男");
    },
    ClickFnWoMan() {
      window.console.log("女");
    }
  },
  created() {
    this.tabData(this.sex);
  }
};
</script>

<style lang="less">
.home {
  .home-top {
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    overflow: hidden;
  }
  .home-main {
    padding-top: 76px;
    overflow-y: auto;
    background-color: #f4f4f4;
  }
  .nav-vant {
    .van-nav-bar {
      margin-top: 20px;
      background-color: #b83320;
      .logo {
        width: 2.08rem;
        height: 0.48rem;
        background-image: url(../assets/fictionLogo.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .sex {
        display: inline-block;
        vertical-align: middle;
        width: 2.61333rem;
        height: 0.77333rem;
        font-size: 0.37333rem;

        button {
          border: none;
          outline: none;
          color: white;
          border: 1px solid white;
          background-color: transparent;
          width: 50%;
          height: 100%;
          line-height: 1px;
          box-sizing: border-box;
        }
        .man {
          border-radius: 15px 0px 0px 15px;
        }
        .woman {
          border-radius: 0px 15px 15px 0px;
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
        margin-left: 10px;
        margin-bottom: 13.5px;
        // transform: translateY(-50%);
      }
    }
  }
}

@keyframes mylunbo {
  0% {
    animation-play-state: running;
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-17px);
  }
  40% {
    transform: translateY(-34px);
  }
  60% {
    transform: translateY(-51px);
  }
  80% {
    transform: translateY(-68px);
  }
  99% {
    transform: translateY(-85px);
    animation-play-state: paused;
  }
  100% {
    transform: translate(0px);
  }
}
</style>