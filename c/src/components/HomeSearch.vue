<template>
  <div class="search">
    <div class="search-box">
      <div class="content" @click.stop="searchClickFn">
        <div
          :class="[text]"
          :style="{transform: 'translateY(-'+(shanhui? shanhui : searchIndex*speed)+'px)',transition:isTransitionStr}"
        >
          <!-- , {tran:isTransition} -->
          <!--  -->
          <p v-for="(item, index) in hotWords" :key="index">{{item}}</p>
        </div>
        <div class="search-btn" @click.stop="searchBtnClickFn"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from "vue";
export default {
  data() {
    return {
      // 热门搜索数据
      hotWords: [],

      searchIndex: 0,
      speed: 27,
      // 使用行内样式控制
      isTransitionStr: "all 1s",
      // 使用类名控制
      isTransition: true,
      shanhui: null,
      id: null,
      text: "text"
    };
  },
  computed: {
    searchValue: function() {
      return this.hotWords[this.searchIndex];
    }
  },
  methods: {
    //   搜索按钮被点击 跳转到 搜索结果
    searchBtnClickFn() {
      this.$router.push({
        path: "/SearchList",
        query: {
          value: this.searchValue
        }
      });
    },
    // input被点击进入搜索界面
    searchClickFn() {
      this.$router.push({
        path: "/Search"
      });
    },
    autoplay: function() {
      // 只有最后一张的假尾巴可以闪回，最后一张的索引值(length - 1)才会大于 lenght- 2
      if (this.searchIndex > this.hotWords.length - 2) {
        // 不触发过渡效果下，更新dom的位置回到起点
        // this.isTransition = false;
        this.isTransitionStr = "none";
        // 开启闪回
        this.shanhui = "0";
        // 闪后要去的位置
        this.searchIndex = 0;
        // 清除定时器
        window.clearInterval(this.id);
        // 异步可以使里面更新视图独立出来成为一帧,异步闪回
        setTimeout(() => {
          // 恢复过渡效果
          // this.isTransition = true;
          this.isTransitionStr = "all 1s";
          // 关闭闪回
          this.shanhui = null;
          // 更新视图
          this.searchIndex++;
          // this.autoplay();
          this.id = setInterval(this.autoplay.bind(this), 3000);
        });
        return;
      } else {
        // 只有滚动到后一个图片才需要闪回，其他索引下关闭
        this.shanhui = null;
      }

      this.searchIndex++;
    }
  },
  beforeCreate() {
    // 请求热门搜索关键字
    this.axios.get("http://novel.kele8.cn/hot-books").then(response => {
      // 截取取六个数据
      this.hotWords = response.data.hotWords.slice(0, 6);
      this.hotWords.push(this.hotWords[0]);
    });
  },
  // beforeRouteEnter(to, from, next) {
  //   Vue.axios.get("http://novel.kele8.cn/hot-books").then(response => {
  //     next(vm => {
  //       window.console.log(response.data.hotWords);
  //       vm.hotWords = response.data.hotWords.slice(0, 6);
  //     });
  //   });
  // },
  created() {
    this.id = setInterval(this.autoplay.bind(this), 3000);
  }
};
</script>
<style lang="less">
.search {
  width: 100%;
  height: 34px;
  padding: 3px 6px;
  background-color: white;
  // position: fixed;
  // top: 42px;
  // z-index: 99;
  .search-box {
    width: 100%;
    height: 100%;
    background-color: #e9e9e9;
    border-radius: 5px;
    padding: 5px 10px;
    .content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      .text {
        flex: 1;
        height: 100%;
        // 这里要加CSS3自定义动画, CSS3自定义动画无法实现 无过渡效果下 从最后一张闪回第一张
        // animation: mylunbo 10s ease 0.5s infinite;
        // transition: all 0.3s;
        transform: translateY(0px);
        &.tran {
          transition: all 0.3s;
        }
        p {
          text-align: left;
          font-size: 0.32rem;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin: 15px 0;
        }
      }
      .search-btn {
        width: 0.66667rem;
        height: 0.66667rem;
        background-image: url(../assets/search.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>