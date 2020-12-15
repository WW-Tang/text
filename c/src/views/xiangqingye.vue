<template>
  <div class="xiangqingye">
    <headshot class="head" :title="name" />
    <section class="shuxinxi">
      <div class="shuxinxi_wrapper">
        <div class="left">
          <img :src="cover" alt />
        </div>
        <div class="right">
          <h4>{{data.title}}</h4>
          <div>
            <span>{{data.author}}</span>
            <span>|</span>
            <span>{{data.cat}}</span>
            <span>|</span>
            <span>{{wordCount}}字</span>
          </div>
          <span>{{this.data._gg? '完结' : formating(Date.now() - Date.parse(this.data.updated), false)}}</span>
        </div>
      </div>
    </section>
    <section class="anniu">
      <div class="btn-wrapper">
        <div class="left delete" @click.stop="deleteBookFn" v-show="bookstate">撤出书架</div>
        <div class="left" @click.stop="addBookFn" v-show="!bookstate">加入书架</div>
        <div class="right" @click.stop="goRouteryuedubook">开始阅读</div>
      </div>
    </section>
    <section class="renqi">
      <div class="item">
        <p>追人气</p>
        <span>{{(data.latelyFollower/10000).toFixed(1)}}万</span>
      </div>
      <div class="item">
        <p>读者留存率</p>
        <span>{{data.retentionRatio}}%</span>
      </div>
      <div class="item">
        <p>日更字数/天</p>
        <span>{{data.serializeWordCount}}</span>
      </div>
    </section>
    <section class="juqing">
      <div class="text" :style="{display: jieshao?'block':'-webkit-box'}">{{data.longIntro}}</div>
      <div
        class="jiantou"
        :style="{transform: jieshao? 'rotate(180deg)' : ''}"
        @click.stop="jiantouFn"
      ></div>
    </section>
    <section class="mulu">
      <div class="mulu-box">
        目录
        <div
          class="right"
          @click.stop="goRouterCataklogueFn(data.title, cover)"
        >{{updateAndprogress}}</div>
      </div>
    </section>

    <!-- 热门书评 -->
    <section class="remenshupin">
      <div class="pinlun">
        <div class="title">热门书评</div>
        <comment v-for="(item, index) in pinlun" :key="index" :obj="item" />
      </div>
    </section>

    <!-- 无评论时显示 -->
    <section class="lingpinlun"></section>

    <!-- 相关推荐 -->
    <section class="relate">
      <interestList :obj="relate" />
    </section>

    <!-- 版权声明 -->
    <section class="banquan"></section>

    <!-- 底部 -->
    <section class="footer"></section>
  </div>
</template>

<script>
import Vue from "vue";
import headshot from "../components/headshot";
import comment from "../components/comment";
import interestList from "../components/interestList";
export default {
  data() {
    return {
      name: "书籍详情",
      activeName: "1",
      data: {},
      pinlun: [],
      relate: [],
      jieshao: false
    };
  },
  watch: {
    $route() {
      window.location.reload();
    }
  },
  computed: {
    cover() {
      // 加上slice，是为了去掉头部的/agent/
      return window.unescape(this.data.cover).slice(7);
    },
    wordCount() {
      return this.data.wordCount > 9999
        ? (this.data.wordCount / 10000).toFixed(0) + "万"
        : this.data.wordCount;
    },
    updateAndprogress() {
      return (
        this.formating(Date.now() - Date.parse(this.data.updated), true) +
        this.data.lastChapter
      );
    },
    bookstate() {
      return this.$store.getters.getBookById(this.$route.query.id);
    }
  },
  components: {
    headshot,
    comment,
    interestList
  },
  created() {
    // 请求评论
    Vue.axios
      .get("http://novel.kele8.cn/book/reviews?book=" + this.$route.query.id)
      .then(res => {
        window.console.log("评论", res);

        window.console.log(res.data.reviews.slice(0, 2));
        this.pinlun = res.data.reviews.slice(0, 2);
      });
    // 请求相关推荐
    Vue.axios
      .get("http://novel.kele8.cn/recommend/" + this.$route.query.id)
      .then(res => {
        window.console.log("相关推荐", res);
        this.relate = res.data.books.slice(0, 4);
      });
  },
  beforeRouteEnter(to, from, next) {
    // 请求书籍信息info
    Vue.axios
      .get("http://novel.kele8.cn/book-info/" + to.query.id)
      .then(response => {
        window.console.log("当前书籍信息", response);
        next(vm => {
          vm.data = response.data;
        });
      });
  },
  methods: {
    formating(str, kuohao) {
      var miao = str / 1000;
      var fen = miao / 60;
      var xiaoshi = fen / 60;
      var tian = xiaoshi / 24;
      var pre = "";
      var next = "";
      if (kuohao) {
        pre = "[";
        next = "] ";
      } else {
        next = "";
      }

      if (tian > 1) {
        return pre + parseInt(tian) + "天前更新" + next;
      }

      if (xiaoshi >= 1) {
        return pre + parseInt(xiaoshi) + "小时前更新" + next;
      } else if (fen >= 1) {
        return pre + parseInt(fen) + "小时前更新" + next;
      }
    },
    goRouteryuedubook() {
      // 开始阅读还是 继续阅读，需要判断本地是否保存有该书籍的阅读记录
      var bookrack = JSON.parse(localStorage.getItem("bookrack"));
      var index = 0;
      if (bookrack) {
        for (let i = 0; i < bookrack.length; i++) {
          if (bookrack[i].id === this.$route.query.id) {
            index = bookrack[i].index;
          }
        }
      }

      this.$router.push({
        path: "/yuedubook",
        query: {
          id: this.$route.query.id,
          index: index ? index : 1
        }
      });
    },

    goRouterCataklogueFn(title, cover) {
      this.$router.push({
        path: "/Catalogue",
        query: {
          id: this.$route.query.id,
          title: title,
          cover: cover
        }
      });
    },

    jiantouFn() {
      this.jieshao = !this.jieshao;
    },

    addBookFn() {
      // 第一 渲染时确认书架中没有该书 决定渲染的是加入书架还是撤出书架(用类名控制)，查询vuex数据
      // 第二 确认是否阅读过该书 查询本地数据,主要是获取页码
      // var bookrack = JSON.parse(localStorage.getItem("bookrack"));
      // var index = null;
      // if (bookrack) {
      //   for (let i = 0; i < bookrack.length; i++) {
      //     if (bookrack[i].id === this.$route.query.id) {
      //       index = bookrack[i].index;
      //     }
      //   }
      // }
      this.$store.commit("addBookrack", {
        // 基本信息 书名 封面 阅读章节数(本地)  距离现在的时间多少前更新过(需要格式化字符串)
        // 最后一章节
        // title: this.data.title,
        // cover: this.cover,
        id: this.$route.query.id
        // index: index ? index : 1,
        // time:
        //   this.formating(Date.now() - Date.parse(this.data.updated), false) +
        //   " : " +
        //   this.data.lastChapter
      });
    },

    deleteBookFn() {
      this.$store.commit("deleteBook", this.$route.query.id);
    }
  }
};
</script>

<style lang="less" scoped>
.shuxinxi {
  width: 100%;
  padding: 15px;
  position: relative;
  .shuxinxi_wrapper {
    width: 100%;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .left {
      float: left;
      width: 1.73333rem;
      height: 2.33333rem;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      text-align: left;
      float: left;
      h4 {
        margin: 0;
        padding: 0;
        font-size: 16px;
      }

      & > div {
        margin: 2px 0;

        span:nth-child(1) {
          color: #b93321;
        }

        & > span {
          margin: 0 5px;
          font-size: 12px;
          color: #999;
        }
      }

      & > span {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

// btn
.anniu {
  width: 100%;
  padding: 15px;
  padding-top: 0;
  border-bottom: 1px solid #ebebeb;
  .btn-wrapper {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    div {
      width: 45%;
      height: 1.17333rem;
      line-height: 1.17333rem;
    }
    div.left {
      float: left;
      border: 1px solid #b93321;
      color: #b93321;
    }
    div.left.delete {
      background-color: #999;
      color: #fff;
      border: none;
    }
    div.right {
      float: right;
      color: white;
      background-color: #b93321;
    }
  }
}

// 人气
.renqi {
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ebebeb;
  .item {
    width: 33%;
    display: inline-block;
    p {
      color: #999;
      font-size: 12px;
      margin: 0;
      padding: 0;
      margin-bottom: 5px;
    }
    span {
      color: black;
      font-size: 16px;
    }
  }
}

// juqing
.juqing {
  width: 100%;
  padding: 0.53333rem;
  position: relative;
  text-align: left;
  .text {
    font-size: 13px;
    width: 100%;
    overflow: hidden;
    // display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    transition: all 0.3s;
  }
  .jiantou {
    width: 0.53333rem;
    height: 0.53333rem;
    position: absolute;
    right: 10px;
    bottom: 15px;
    background-image: url(../assets/xialalist.png);
    background-size: 60% 60%;
    background-position: center center;
    background-repeat: no-repeat;
  }
  &.active {
    .jiantou {
      transform: rotate(180deg);
    }
    .text {
      // display: block;
      -webkit-line-clamp: none;
    }
  }
}

// 目录
.mulu {
  width: 100%;
  padding-left: 15px;
  border-bottom: 1px solid #ebebeb;
  .mulu-box {
    width: 100%;
    padding: 15px 0;
    border-top: 1px solid #ebebeb;
    text-align: left;
    .right {
      width: 65%;
      float: right;
      margin-right: 9px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #999;
      &::after {
        content: "";
        position: absolute;
        right: 0px;
        width: 0.53333rem;
        height: 0.53333rem;
        background-image: url(../assets/xialalist.png);
        background-size: 60% 60%;
        background-position: center;
        background-repeat: no-repeat;
        transform: rotate(270deg);
        margin-left: 10px;
      }
    }
  }
}

// 热门书评
.remenshupin {
  width: 100%;
  padding: 15px;
  text-align: left;
  .pinlun {
    width: 100%;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>