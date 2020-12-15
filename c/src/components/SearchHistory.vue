<template>
  <div class="history">
    <div class="history-box">
      <div class="title">
        <div class="title-text">搜索历史</div>
        <div class="icon-delete" @click.stop="ClickdeleteFn">删除历史</div>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="(item, index) in history"
            :key="index"
            @click.stop="routegoSearchListClickFn(item)"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      history: []
    };
  },
  methods: {
    ClickdeleteFn() {
      // 删除本地缓存的数据
      var Search = JSON.parse(localStorage.getItem("Search"));
      Search.KeyWords = [];
      localStorage.setItem("Search", JSON.stringify(Search));

      // 删除data临时保存的
      this.history = [];
    },
    // 逆转数组
    reverseArr(arr) {
      var newArr = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
      }
      return newArr;
    },
    routegoSearchListClickFn(item) {
      // 保存搜索记录
      // 需要判断是否是首次存储
      if (!localStorage.Search) {
        window.console.log("首次");
        let Search = { KeyWords: [] };
        Search.KeyWords.push(this.value);
        // 重新设置，更新旧的，保存作用
        localStorage.setItem("Search", JSON.stringify(Search));
      } else {
        let Search = JSON.parse(localStorage.getItem("Search"));
        for (let i = 0; i < Search.KeyWords.length; i++) {
          if (item === Search.KeyWords[i]) {
            Search.KeyWords.splice(i, 1);
          }
        }
        Search.KeyWords.push(item);
        // 重新设置，更新旧的，保存作用
        localStorage.setItem("Search", JSON.stringify(Search));
      }

      // 跳转路由
      this.$router.push({
        path: "/SearchList",
        query: {
          value: item
        }
      });
    }
  },
  created() {
    let str = localStorage.getItem("Search");
    this.history = this.reverseArr(JSON.parse(str).KeyWords);
  }
};
</script>
<style lang="less" scoped>
.history {
  width: 100%;
  padding: 0 15px;
  margin-top: 30px;
  .history-box {
    width: 100%;
    .title {
      width: 100%;
      height: 0.8rem;
      display: flex;
      text-align: left;
      .title-text {
        flex: 1;
        height: 100%;
        line-height: 0.8rem;
        font-size: 0.58867rem;
        color: #6b6b6b;
      }
      .icon-delete {
        width: 65px;
        height: 100%;
        line-height: 0.8rem;
        color: #8a8a8a;
        font-size: 0.32rem;
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 0.42667rem;
          height: 0.42667rem;
          background-image: url(../assets/history-delete.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: absolute;
          top: 50%;
          margin-top: -0.21333rem;
          right: 0;
        }
      }
    }
    .list {
      width: 100%;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 1.38667rem;
          border-bottom: 1px solid #ebebf0;

          line-height: 1.38667rem;
          color: #9b9ba3;
          font-size: 0.4533rem;
          text-align: left;

          white-space: nowrap;
          text-emphasis: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>