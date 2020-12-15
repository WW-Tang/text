<template>
  <!-- 分类页面 -->
  <div class="classify">
    <!-- 头部 -->
    <div class="classify_head">
      <headshot :title="'分类'" />
    </div>
    <!-- loading动画 -->
    <div class="loading" v-if="loading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>

    <!-- 主要展示部分 -->
    <div class="main" v-else>
      <!-- 男生 -->
      <div class="man">
        <div class="title">男生</div>
        <ul>
          <li
            @click.stop="goRouteClassifycationFn('male', item.name)"
            v-for="(item, index) in man"
            :key="index"
          >
            <p>{{item.name}}</p>
            <span>{{item.monthlyCount}}</span>
          </li>
        </ul>
      </div>
      <!-- 女生 -->
      <div class="nv">
        <div class="title">女生</div>
        <ul>
          <li
            @click.stop="goRouteClassifycationFn('female', item.name)"
            v-for="(item, index) in nv"
            :key="index"
          >
            <p>{{item.name}}</p>
            <span>{{item.monthlyCount}}</span>
          </li>
        </ul>
      </div>
      <!-- 出版 -->
      <div class="chuban">
        <div class="title">出版</div>
        <ul>
          <li
            @click.stop="goRouteClassifycationFn('press', item.name)"
            v-for="(item, index) in chuban"
            :key="index"
          >
            <p>{{item.name}}</p>
            <span>{{item.monthlyCount}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import headshot from "../components/headshot";
export default {
  data() {
    return {
      loading: true,
      man: [],
      nv: [],
      chuban: []
    };
  },
  components: {
    headshot
  },
  methods: {
    goRouteClassifycationFn(str, name) {
      this.$router.push({
        path: "/Classifycation/" + name,
        query: {
          gender: str
        }
      });
    }
  },
  created() {
    this.axios.get("http://novel.kele8.cn/categories").then(res => {
      window.console.log(res);
      this.man = res.data.male;
      this.nv = res.data.female;
      this.chuban = res.data.press;

      this.loading = false;
    });
  }
};
</script>

<style lang="less" scoped>
.classify {
  width: 100%;
  .loading {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 5%;
    .van-loading {
      margin-top: 24px;
    }
  }
  .main {
    .man,
    .nv,
    .chuban {
      .title {
        width: 100%;
        text-align: left;
        height: 50px;
        line-height: 50px;
        color: #999;
        font-weight: 400;
        font-size: 12px;
        padding-left: 15px;
      }
      ul {
        width: 100%;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        li {
          width: 33%;
          height: 60px;
          //   line-height: 60px;
          float: left;
          border: 1px solid #f8f8f8;
          border-left: none;
          padding: 10px;
          p {
            margin: 0;
            color: #333;
            font-size: 15px;
            font-weight: bold;
          }
          span {
            // display: block;
            color: #ccc;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>