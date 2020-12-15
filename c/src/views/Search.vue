<template>
  <div class="SearchInterface">
    <!-- 顶部 功能：返回上一级界面，，进入我的书架，直接返回主界面-->
    <Headshot :title="title"></Headshot>

    <!-- 如果要细分搜索组件则使用vuex，搜索组件的value要记录给搜索历史 ，热门推荐的关键词可以变成关键字-->
    <!-- 搜索框 功能：实时补全用户输入，-->
    <div class="Search">
      <div class="Search-box">
        <div class="input">
          <div class="icon-search"></div>
          <input type="text" placeholder="请输入关键字" @input="inputFn" v-model.trim="value" />
          <div class="icon-delete" v-show="value" @click.stop="deleteClickFn"></div>
        </div>
        <!-- 点击确定按钮 跳转到搜索结果界面 -->
        <div class="btn" @click.stop="routegoSearchListClickFn">确定</div>
      </div>
    </div>
    <!-- 实时变化的模糊搜索 -->
    <div class="search-list">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click.stop="routegoSearchListClickFn"
        >{{item}}</li>
      </ul>
    </div>

    <!-- 热门推荐 -->
    <Searchhot />
    <!-- 搜索历史 -->
    <SearchHistory />
  </div>
</template>
<script>
import Headshot from "../components/headshot";
import Searchhot from "../components/Searchhot";
import SearchHistory from "../components/SearchHistory";
export default {
  name: "Search",
  components: {
    Headshot,
    Searchhot,
    SearchHistory
  },
  data() {
    return {
      title: "搜索",
      list: [],
      value: ""
    };
  },
  methods: {
    inputFn() {
      window.console.log(
        "http://novel.kele8.cn/auto-complete?query=" + this.value
      );
      if (this.value) {
        this.axios
          .get("http://novel.kele8.cn/auto-complete?query=" + this.value)
          .then(response => {
            window.console.log(response);
            this.list = response.data.keywords;
          });
      } else {
        this.list = [];
      }
    },
    deleteClickFn() {
      this.value = "";
      this.list = [];
    },
    routegoSearchListClickFn() {
      // 保存到本地存储
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
          if (this.value === Search.KeyWords[i]) {
            Search.KeyWords.splice(i, 1);
          }
        }
        Search.KeyWords.push(this.value);
        // 重新设置，更新旧的，保存作用
        localStorage.setItem("Search", JSON.stringify(Search));
      }

      // 跳转到搜索结果
      this.$router.push({
        path: "/SearchList",
        query: {
          value: this.value
        }
      });
    }
  }
};
</script>
<style lang="less">
.SearchInterface {
  .Search {
    width: 100%;
    height: 0.93333rem;
    box-sizing: border-box;
    padding: 0 15px;
    margin: 10px 0;
    .Search-box {
      display: flex;
      width: 100%;
      height: 100%;
      .input {
        flex: 1;
        height: 100%;
        background-color: #ebebf0;
        border-radius: 0.46667rem;
        padding: 5px 10px;
        position: relative;
        input {
          float: left;
          height: 100%;
          background-color: transparent;
          border: none;
          outline: none;
          line-height: 0.93333rem;
        }
        .icon-search {
          float: left;
          width: 0.6rem;
          height: 100%;
          background-image: url(../assets/search.png);
          background-repeat: no-repeat;
          background-size: 0.6rem 0.6rem;
          margin-right: 1px;
        }
        .icon-delete {
          width: 0.4rem;
          height: 0.4rem;
          background-image: url(../assets/search-delete.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;

          position: absolute;
          right: 8px;
          top: 50%;
          margin-top: -0.2rem;
        }
      }
      .btn {
        width: 42px;
        height: 100%;
        color: #748389;
        line-height: 15px;
      }
    }
  }
  .search-list {
    width: 100%;
    padding: 0 15px;
    ul {
      width: 100%;
      li {
        position: relative;
        width: 100%;
        height: 1.38667rem;
        line-height: 1.38667rem;
        text-align: left;
        padding-left: 0.52667rem;
        &::before {
          content: "";
          display: block;
          width: 0.42667rem;
          height: 0.42667rem;
          background-image: url(../assets/searchlist-icon.png);
          background-repeat: no-repeat;
          background-size: 0.42667rem 0.42667rem;

          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -0.21333rem;
        }
      }
    }
  }
}
</style>