<template>
  <div class="ranking">
    <!-- 头部 -->
    <Headshot :title="title" />
    <!-- 一级水平分类 -->
    <div class="justify">
      <van-tabs v-model="active" @click="tabsClickFn">
        <van-tab title="男频">
          <!-- 二级左边垂直分类 -->
          <div class="zhanwei">
            <div></div>
          </div>
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="onclickTab('man', item.shortTitle)"
              v-for="(item, index) in currentArr"
              :key="index"
              :title="item.shortTitle"
            />
            <!-- <van-sidebar-item title="最热榜" />
            <van-sidebar-item title="潜力榜" />
            <van-sidebar-item title="飙升榜" />
            <van-sidebar-item title="热搜榜" />
            <van-sidebar-item title="完结榜" />
            <van-sidebar-item title="好评榜" />
            <van-sidebar-item title="VIP榜" />
            <van-sidebar-item title="留存榜" />
            <van-sidebar-item title="免费榜" />-->

            <!-- 右边排行榜数据列表 -->
          </van-sidebar>
          <div class="right">
            <div class="right-box">
              <booksList
                v-for="(item, index) in currentArr2"
                :key="index"
                :book="item"
                :index="index"
              />
            </div>
          </div>
        </van-tab>
        <van-tab title="女频">
          <!-- 二级左边垂直分类 -->
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="onclickTab('nv', item.shortTitle)"
              v-for="(item, index) in currentArr"
              :key="index"
              :title="item.shortTitle"
            />
          </van-sidebar>
          <div class="right">
            <div class="right-box">
              <booksList
                v-for="(item, index) in currentArr2"
                :key="index"
                :book="item"
                :index="index"
              />
            </div>
          </div>
        </van-tab>
        <van-tab title="出版">
          <!-- 二级左边垂直分类 -->
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              @click="onclickTab('chuban', item.shortTitle)"
              v-for="(item, index) in currentArr"
              :key="index"
              :title="item.shortTitle"
            />
             <div class="right">
            <div class="right-box">
              <booksList
                v-for="(item, index) in currentArr2"
                :key="index"
                :book="item"
                :index="index"
              />
            </div>
          </div>
          </van-sidebar>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Headshot from "../components/headshot";
import booksList from "../components/booksList";
import Vue from "vue";
export default {
  data() {
    return {
      title: "排行榜",
      active: 0,
      activeKey: 0,
      man: [],
      nv: [],
      chuban: [],
      man2: [],
      nv2: [],
      chuban2: [],
      currentArr: [],
      currentArr2: [],
      tabs: [
        "畅销榜",
        "最热榜",
        "潜力榜",
        "飙升榜",
        "热搜榜",
        "完结榜",
        "好评榜",
        "VIP榜",
        "留存榜"
      ]
    };
  },
  components: {
    Headshot,
    booksList
  },
  methods: {
    // 一级tab
    tabsClickFn(index, title) {
      window.console.log(title, index);
      if (index === 0) {
        if (this.man2.length > 0) {
          this.currentArr = this.man;
          this.currentArr2 = this.man2[0].books;
        } else {
          this.isdefaut("man");
        }
        // 男生为默认进入时选中,所以请求数据应该放在created
        // 男生,根据男生的数据数组里面的id号获取各个榜的排名
      } else if (index === 1) {
        // 女生
        if (this.nv2.length > 0) {
          this.currentArr = this.nv;
          this.currentArr2 = this.nv2[0].books;
        } else {
          this.isdefaut("nv");
        }
      } else if (index === 2) {
        // 出版
        if (this.chuban2.length > 0) {
          this.currentArr = this.chuban;
          this.currentArr2 = this.chuban2[0].books;
        } else {
          this.isdefaut("chuban");
        }
      }
    },
    // 二级tab
    onclickTab(sex, title) {
      window.console.log(title, sex + 2);
      for (let i = 0; i < this[sex + 2].length; i++) {
        if (this[sex + 2][i].shortTitle === title) {
          this.currentArr2 = this[sex + 2][i].books;
        }
      }
    },
    isdefaut(sex) {
      window.console.log(sex);
      for (let i = 0; i < this[sex].length; i++) {
        Vue.axios
          .get("http://novel.kele8.cn/rank/" + this[sex][i]._id)
          .then(response => {
            // 保存二级tab的每一项数据
            this[sex + "2"].push(response.data.ranking);
            if (i === 0) {
              this.currentArr2 = this[sex + "2"][i].books;
            }
          });
      }
      // 确定二级tab
      this.currentArr = this[sex];
    }
  },
  created() {
    window.console.log("created");
  },
  // 组件守卫，本组件被渲染或调用前执行这里的代码
  // 注意在组件创建前运行，意味着组件没被创建，所以this不存在
  beforeRouteEnter(to, from, next) {
    window.console.log("beforeRouteEnter");
    var Search = JSON.parse(localStorage.getItem("Search"));
    //   这里无法使用this,请求三大模块的数据,这里加判断可以设置是否缓存
    if (Search.Ranking) {
      // 已缓存的情况
      next(vm => {
        vm.man = Search.Ranking.man;
        vm.nv = Search.Ranking.nv;
        vm.chuban = Search.Ranking.chuban;
        window.console.log("读取缓存");
        vm.isdefaut("man");
      });
    } else {
      // 第一次获取数据
      var obj = {};

      Vue.axios.get("http://novel.kele8.cn/rank-category").then(response => {
        window.console.log(response);
        // 必须要运行next函数
        next(vm => {
          // 三大模块的各个xx榜
          vm.man = response.data.male;
          vm.nv = response.data.female;
          vm.chuban = response.data.epub;

          obj.man = response.data.male;
          obj.nv = response.data.female;
          obj.chuban = response.data.epub;
          Search.Ranking = obj;
          // 更新本地
          localStorage.setItem("Search", JSON.stringify(Search));
          window.console.log("数据获取完成");

          vm.isdefaut("man");
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ranking {
  .justify {
    width: 100%;
    position: fixed;
    top: 1.17333rem;
    left: 0;
    .van-tab__pane {
      display: flex;
      flex-flow: row;
      .zhanwei {
        min-width: 85px;
        height: 100%;
      }
      .van-sidebar {
        position: fixed;
        overflow-y: scroll;
        overflow-x: hidden;

        // 要设置top和bottom才会发生滚动条
        top: 81px;
        bottom: 0;
      }

      .right {
        flex-grow: 1;
        .right-box {
          width: 235px;
          // 设置了绝对定位flex-grow会失效
          position: fixed;
          left: 85px;
          top: 81px;
          bottom: 0;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>