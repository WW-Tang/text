<template>
  <div class="catalogue">
    <headshot title="优质书源" />
    <div class="title">
      <div class="left">
        <span>目录</span>
        <span>共{{chapters.length}}章</span>
      </div>

      <div class="right" @click.stop="reversedFn">倒序</div>
    </div>

    <ul class="catalogueList">
      <li
        class="catalogueItem"
        v-for="(item, index) in chapters"
        :key="index"
        @click.stop="goRouterYuedubookFn(item.order)"
      >
        <span class="catalogueIndex">{{item.order}}</span>
        <span class="catalogueTitle">{{item.title}}</span>
        <!-- <span class="vip" :style="{display: item.isVip? 'block': 'none'}"> -->
        <span class="vip" v-if="item.isVip">
          <i class="glyphicon glyphicon-lock"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import headshot from "../components/headshot";
import Vue from "vue";
export default {
  components: {
    headshot
  },
  data() {
    return {
      chapters: []
    };
  },
  methods: {
    reversedFn() {
      this.chapters = this.chapters.reverse();
    },
    goRouterYuedubookFn(order) {
      this.$router.push({
        path: "/yuedubook",
        query: {
          id: this.$route.query.id,
          title: this.$route.query.title,
          cover: this.$route.query.cover, 
          index: order
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    window.console.log("目录区");
    window.console.log("传过来的id", to.query.id);

    // 先请求出章节列表
    // 第一次请求书源
    window.console.log(
      "第一次请求书源" +
        "http://novel.kele8.cn/book-sources?view=summary&book=" +
        to.query.id
    );

    Vue.axios(
      "http://novel.kele8.cn/book-sources?view=summary&book=" + to.query.id
    ).then(response => {
      // 再根据书源返回的数据，请求章节列表，第二次请求章节列表
      Vue.axios(
        "http://novel.kele8.cn/book-chapters/" + response.data[0]._id
      ).then(response2 => {
        window.console.log(response2.data.chapters);
        next(vm => {
          vm.chapters = response2.data.chapters;
        });
      });
    });
  }
};
</script>

<style lang='less' scoped>
.catalogue {
  .title {
    width: 100%;
    display: flex;
    flex-wrap: no-wrap;
    padding: 15px 20px;
    border-bottom: 1px solid #f8f8f8;
    .left {
      flex: 1;
      text-align: left;

      span:nth-of-type(1) {
        color: #333;
        font-size: 15px;
        margin-right: 10px;
        font-weight: bold;
      }
      span:nth-of-type(2) {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      text-align: right;
      flex: 1;
    }
  }
}

.catalogueList {
  width: 100%;
  padding-left: 15px;
  .catalogueItem {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-right: 15px;
    border-bottom: 1px solid #f8f8f8;
    text-align: left;
    color: #999;
    font-size: 12px;
    .catalogueIndex {
      margin-right: 5px;
    }
    .vip {
      float: right;
    }
  }
}
</style>