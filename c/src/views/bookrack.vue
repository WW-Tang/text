<template>
  <!-- 书架 -->
  <div class="bookrack">
    <!-- 头部 -->
    <headshot :title="'书架'" />

    <!-- tab栏 -->
    <div class="tab">
      <p class="item" :class="active === true? 'active': ''" @click="tabClick">我的书架</p>
      <p class="line"></p>
      <p class="item" :class="active === false? 'active': ''" @click="tabClick">阅读记录</p>
    </div>
    <!-- 显示书架总数 -->
    <div class="bookrack_top" v-show="active === true">
      <div class="length">共{{bookrackListData.length}}本</div>
      <!-- <div class="complie" @click.top="">编辑</div> -->
    </div>
    <div class="content">
      <!-- 书架栏 -->
      <div class="wrappers" v-show="active === true">
        <bookrackList v-for="(item, index) in bookrackListData" :key="index" :item="item" />
        <div v-if="bookrackListData.length == 0">空空如也</div>
      </div>
      <div class="wrappers" v-show="active === false">
        <readinglist v-for="(item, index) in Readinghistory" :key="index" :item="item" />
        <div v-if="Readinghistory.length == 0">空空如也</div>
      </div>
      <!-- 阅读记录栏 -->
    </div>

    <div class="toHome" @click.stop="goRouteHomeFn">去书城随便看看</div>
  </div>
</template>
<script>
import Vue from "vue";
import headshot from "../components/headshot";
import bookrackList from "../components/bookrackList";
import readinglist from "../components/readinglist";

export default {
  name: "bookrack",
  components: {
    headshot,
    bookrackList,
    readinglist
  },
  data() {
    return {
      active: true,
      bookrackListData: [],
      Readinghistory: []
    };
  },
  computed: {
    bookrack: {
      get() {
        return this.$store.state.bookrack;
      }
      // setter(newValue){

      // }
    }
  },
  methods: {
    tabClick() {
      this.active = !this.active;
      if (this.active === false) {
        // 从本地获取阅读记录
        var bookrack = JSON.parse(localStorage.getItem("bookrack"));
        if (bookrack) {
          this.Readinghistory = bookrack;
        } else {
          this.Readinghistory = [];
        }
      }
    },

    goRouteHomeFn() {
      this.$router.push({
        path: "/"
      });
    },
    formating(str) {
      var miao = str / 1000;
      var fen = miao / 60;
      var xiaoshi = fen / 60;
      var tian = xiaoshi / 24;

      if (tian > 1) {
        return parseInt(tian) + "天前更新";
      }

      if (xiaoshi >= 1) {
        return parseInt(xiaoshi) + "小时前更新";
      } else if (fen >= 1) {
        return parseInt(fen) + "小时前更新";
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      window.console.log(vm.bookrack);
      for (let i = 0; i < vm.bookrack.length; i++) {
        // 请求书籍信息info
        Vue.axios
          .get("http://novel.kele8.cn/book-info/" + vm.bookrack[i].id)
          .then(response => {
            window.console.log("书架页面", response);
            var obj = {};
            ({
              title: obj.title,
              cover: obj.cover,
              lastChapter: obj.lastChapter,
              updated: obj.updated
            } = { ...response.data });

            obj.cover = window.unescape(obj.cover).slice(7);
            obj.time =
              vm.formating(Date.now() - Date.parse(obj.updated)) +
              ";" +
              obj.lastChapter;
            let bookrack = JSON.parse(localStorage.getItem("bookrack"));
            if (bookrack) {
              let ischange = true;
              for (let j = 0; j < bookrack.length; j++) {
                if (bookrack[j].id === vm.bookrack[i].id) {
                  obj.index = bookrack[j].index;
                  ischange = false;
                }
              }
              if (ischange) {
                obj.index = 1;
              }
            } else {
              obj.index = 1;
            }

            for (let key in obj) {
              vm.$store.commit("setBook", {
                id: vm.bookrack[i].id,
                key: key,
                value: obj[key]
              });
            }
            vm.bookrackListData.push({
              ...obj,
              id: vm.bookrack[i].id
            });
          });
      }
    });
  }
};
</script>
<style lang="less" >
.bookrack {
  background: #f4f4f4;
  .bookrack-nav {
    width: 100%;
    height: 1.17333rem;
    background-color: #b93321;
    // .nav-vant {
    // }
  }
  .tab {
    width: 100%;
    height: 1.3333rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    p {
      margin: 0;
    }
    .item {
      width: 40%;
      height: 100%;
      text-align: center;
      line-height: 1.3333rem;
      color: #999;
      position: relative;
    }
    p.active {
      color: #b93321;
      &::after {
        content: "";
        display: block;
        width: 0.93333rem;
        height: 0.05333rem;
        background-color: #b93321;
        position: absolute;
        bottom: 0px;
        left: 50%;
        margin-left: -0.46667rem;
      }
    }
    .line {
      width: 1px;
      height: 0.26667rem;
      background-color: #dfdfdf;
    }
  }

  .bookrack_top {
    height: 30px;
    line-height: 40px;
    padding: 0 10px;
    color: #999;
    .length {
      float: left;
      height: 100%;
    }
    .complie {
      float: right;
      height: 100%;
    }
  }

  .content {
    margin-top: 10px;
    .wrappers {
      background-color: #fff;
      .wrapper:last-child {
        .bookrackList {
          border-bottom-color: transparent;
        }
      }
    }
  }
  .toHome {
    display: block;
    width: 6.88rem;
    height: 1.06667rem;
    line-height: 1.06667rem;
    text-align: center;
    margin: 20px auto 0;
    border: 1px solid #cf1b1b;
    color: #cf1b1b;
  }
}
</style>