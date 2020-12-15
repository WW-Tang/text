<template>
  <div class="searchList">
    <headshot :title="title" />
    <ul>
      <li
        v-for="(item, index) in list"
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
</template>
<script>
import Vue from "vue";
import headshot from "../components/headshot";
import searchitem from "../components/searchitem";
export default {
  name: "genduo",
  data() {
    return {
      list: []
    };
  },
  computed: {
    title() {
      return '跟"' + this.$route.query.value + '"有关的书籍';
    }
  },
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
    }
  },
  // 组件内的守卫
  // 在本组件被渲染时，被调用 / 组件实例被创建前执行
  // 不能调用 组件实例 this
  // 因为当前守卫执行时，组件实例还没有被创建
  beforeRouteEnter(to, from, next) {
    // 因为使用不了this ，只能在导入一次vue
      // 根据上面的结果id，请求数据
      Vue.axios.get("http://novel.kele8.cn/rank/" + to.query.id).then(response => {
        // window.console.log(response);
        // 保存数据
        next(vm=>{
            vm.list = response.data.ranking.books.slice(4, 20);
        })
        
      });
  }
};
</script>
<style lang='less' scoped>
.searchList {
  width: 100%;
  height: auto;
  background-color: #f5f2ed;
  ul {
    width: 100%;
    height: auto;
    margin-top: 10px;
    li {
      width: 100%;
      margin-bottom: 10px;
      padding-left: 15px;
    }
    li.footer {
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
</style>>
