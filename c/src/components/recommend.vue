<template>
  <div class="shabi">
    <div class="recommend-box">
      <div class="title">{{obj.title}}</div>
      <div class="list">
        <recommendBookitem
          v-for="(item, index) in list"
          :key="index"
          :book="item"
          :index="false"
        />
      </div>

      <div @click.stop="goRoutegenduoFn" class="gogengduo">
        查看更多
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import recommendBookitem from "../components/recommendBookitem";
export default {
  name: "recommend",
  props: ["obj"],
  data() {
    return {
      type: "",
      id: null,
      list: []
    };
  },
  components: {
    recommendBookitem
  },
  computed: {
    // 使用vuex
    sex() {
      return this.$store.state.sex;
    }
  },
  watch: {
    //
    id(newValue, value) {
      window.console.log(newValue, value);
    },
    // 监听计算属性，发生变化则更换页面数据
    sex() {
      this.tabdata();
    }
  },
  methods: {
    goRoutegenduoFn() {
      this.$router.push({
        path: "/genduo",
        query: {
          value: this.obj.title,
          id: this.id
        }
      });
    },
    tabdata() {
      window.console.log("请求数据");
      // 使用本组件的计算属性 判断vuex中的sex，决定是man还是nv
      if (this.sex === "男") {
        this.id = JSON.parse(localStorage.getItem("Search")).Ranking.man[
          this.obj.id
        ]._id;
      } else {
        this.id = JSON.parse(localStorage.getItem("Search")).Ranking.nv[
          this.obj.id
        ]._id;
      }
      // 根据上面的结果id，请求数据
      this.axios.get("http://novel.kele8.cn/rank/" + this.id).then(response => {
        // window.console.log(response);
        // 保存数据
        this.list = response.data.ranking.books.slice(0, 4);
        // 循环遍历，根据每一个数据的id请求出书籍详细信息
        for (let i = 0; i < this.list.length; i++) {
          this.axios
            .get("http://novel.kele8.cn/book-info/" + this.list[i]._id)
            .then(res => {
              this.list[i]._gg = res.data._gg;
              this.list[i].majorCate = res.data.majorCate;
            });
        }
      });
    }
  },
  created() {
    // 执行方法
    this.tabdata();
  }
};
</script>

<style lang="less" scoped>
.shabi {
  width: 100%;
  background-color: #fff;
  padding: 15px 0;
  margin-bottom: 15px;
  .recommend-box {
    width: 100%;
    .title {
      text-align: left;
      border-left: 3px solid #b93321;
      padding-left: 10px;
      font-weight: bolder;
      font-size: 14px;
    }
    .list {
      padding: 0 0.4rem;
    }
    .gogengduo {
      margin-top: 5px;
      padding: 0 10px;
      font-size: 12px;
      width: 100%;
      background-size: 100% 1px;
      background-image: linear-gradient(0deg, transparent 50%, #ddd 0);
      background-repeat: no-repeat;
      background-position: top;
      background-clip: content-box;
      height: 30px;
      line-height: 40px;
      color: #b93321;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border: 1px solid #b93321;
        border-left-color: transparent;
        border-top-color: transparent;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>