<template>
  <div class="searchList">
    <headshot :title="$route.params.id" />
    <div class="wrapper">
      <div class="item">
        <!-- 一级筛选type -->
        <div class="top1">
          <ul>
            <li
              :class="{active: index === index1}"
              @click.stop="onClickTypeFn(item.type, index)"
              v-for="(item, index) in top1"
              :key="index"
            >{{item.title}}</li>
          </ul>
        </div>
      </div>
      <div class="item">
        <!-- 二级筛选 -->
        <div class="top2">
          <ul>
            <li @click.stop="onclickMinorOne" :class="{active: -1 === index2}">全部</li>
            <li
              @click.stop="onClickMinorFn(item, index)"
              :class="{active: index === index2}"
              v-for="(item, index) in top2"
              :key="index"
            >{{item}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="main">
      <ul>
        <li
          v-for="(item, index) in SearchList"
          :key="index"
          @click.stop="goRoutexiangqingyeFn(item._id)"
        >
          <searchitem :item="item" />
        </li>
        <li class="footer">
          <span>没有更多书籍</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import headshot from "../components/headshot";
import searchitem from "../components/searchitem";
export default {
  name: "SearchList",
  data() {
    return {
      SearchList: [],
      type: "hot",
      minor: "",
      index1: 0,
      index2: -1,
      top1: [
        {
          title: "热门",
          type: "hot"
        },
        {
          title: "新书",
          type: "new"
        },
        {
          title: "好评",
          type: "reputation"
        },
        {
          title: "完结",
          type: "over"
        },
        {
          title: "包月",
          type: "monthly"
        }
      ],
      top2: []
    };
  },
  computed: {},
  components: {
    headshot,
    searchitem
  },
  methods: {
    goRoutexiangqingyeFn(id) {
      this.$router.push({
        path: "/xiangqingye",
        query: {
          id: id
        }
      });
    },
    onClickTypeFn(type, index) {
      this.type = type;
      this.index1 = index;
      this.ajaxupdata();
    },
    onClickMinorFn(minor, index) {
      this.minor = minor;
      this.index2 = index;
      this.ajaxupdata();
    },
    onclickMinorOne() {
      this.minor = "";
      this.index2 = -1;
      this.ajaxupdata();
    },
    ajaxupdata() {
      this.axios
        .get(
          "http://novel.kele8.cn/category-info?gender=" +
            this.$route.query.gender +
            "&type=" +
            this.type +
            "&major=" +
            this.$route.params.id +
            "&minor=" +
            this.minor +
            "&start=0&limit=20"
        )
        .then(response => {
          window.console.log(response);
          this.SearchList = response.data.books;
        });
    }
  },
  // 组件内的守卫
  // 在本组件被渲染时，被调用 / 组件实例被创建前执行
  // 不能调用 组件实例 this
  // 因为当前守卫执行时，组件实例还没有被创建
  beforeRouteEnter(to, from, next) {
    Vue.axios.get("http://novel.kele8.cn/sub-categories").then(res => {
      next(vm => {
        for (let i = 0; i < res.data[to.query.gender].length; i++) {
          if (res.data[to.query.gender][i].major === to.params.id) {
            vm.top2 = res.data[to.query.gender][i].mins;
          }
        }

        vm.axios
          .get(
            "http://novel.kele8.cn/category-info?gender=" +
              to.query.gender +
              "&type=" +
              vm.type +
              "&major=" +
              to.params.id +
              "&minor=" +
              vm.minor +
              "&start=0&limit=20"
          )
          .then(response => {
            window.console.log(response);
            vm.SearchList = response.data.books;
          });
      });
    });
  }
};
</script>
<style lang='less' scoped>
.searchList {
  width: 100%;
  height: auto;
  background-color: #f5f2ed;
  .main {
    padding-top: 80px;
    & > ul {
      width: 100%;
      height: auto;
      margin-top: 10px;
      & > li {
        width: 100%;
        margin-bottom: 10px;
        padding-left: 15px;
      }
      & > li.footer {
        padding: 10px 0;
        margin-bottom: 0px;
        height: 30px;
        line-height: 0px;
        span {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }

  .wrapper {
    position: fixed;
    top: 38px;
    left: 0;
    width: 100%;
    color: #666;
    background-color: #fff;
    z-index: 100;
    .item {
      background-size: 100% 1px;
      background-image: linear-gradient(180deg, transparent 50%, #ddd 0);
      background-repeat: no-repeat;
      background-position: bottom;
      position: relative;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      overflow: hidden;
      .top1,
      .top2 {
        height: 100%;
        overflow-x: auto;
        ul {
          width: auto;
          height: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0;
          li {
            display: inline-block;
            height: 100%;
            padding: 0 0.26667rem;
            font-size: 13px;
            text-align: left;
            &.active {
              color: #b93321;
            }
            &.first-child {
              padding-left: 0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>>
