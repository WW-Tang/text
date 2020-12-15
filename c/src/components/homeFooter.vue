<template>
  <div class="home_footer">
    <div class="home_footer-box">
      <div class="home_footer_search">
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="category">
        <div @click.stop="goRouteClassifyFn">分类</div>
        <div @click.stop="goRoutebookrackFn">书架</div>
        <div>联系我们</div>
      </div>
      <div class="banquan"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: "/SearchList",
        query: {
          value: this.value
        }
      });
    },
    goRouteClassifyFn() {
      this.$router.push({
        path: "/Classify"
      });
    },
    goRoutebookrackFn() {
      this.$router.push({
        path: "/bookrack"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home_footer {
  width: 100%;
  padding: 0 15px;
  .home_footer-box {
    width: 100%;
    .home_footer_search {
      height: auto;
      .van-search {
        background: #f4f4f4 !important;
        .van-search__content {
          background: white;
        }
      }
    }
    .category {
      width: 100%;
      margin-top: 15px;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      & > div {
        float: left;
        width: 33%;
        border-right: 1px solid #ccc;
        &:last-child {
          border-color: transparent;
        }
      }
    }
  }
}
</style>