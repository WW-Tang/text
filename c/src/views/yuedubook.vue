<template>
  <div :class="{showControl: control}">
    <van-loading id="yueduqiLoading" size="24px" vertical v-show="startloading">加载中...</van-loading>
    <div class="top">
      <yueduHead :title="info.title" :id="$route.query.id" />
    </div>

    <div class="yuedubook" :class="classObj" @click.stop="yuedubookClickFn">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <h2 :style="{fontSize: (fontSize+4)+'px'}">{{item.title}}</h2>
          <div class="yuedubook-box">
            <p
              v-for="(content, index) in item.cpContent"
              :key="index"
              :style="{fontSize: fontSize+'px'}"
            >{{content}}</p>
          </div>
          <div class="erweima"></div>
        </van-cell>
      </van-list>
    </div>
    <div class="bottom">
      <yuduFooter @setData="setData" :index="page" />
    </div>
    <div class="cataloguejiemian" :class="{show: showCatalogue}">
      <yueduCatalogue
        :chapters="zhangjielist"
        @setData="setData"
        :obj="{ title:info.title,
                index: this.page,}"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import yueduHead from "../components/yueduHead";
import yuduFooter from "../components/yueduFooter";
import yueduCatalogue from "../components/yueduCatalogue";
export default {
  data() {
    return {
      error: false,
      info: {},
      startloading: true,
      zhangjielist: null,
      // 章节数
      index: 0,
      // 数组索引
      page: 0,
      list: [],
      loading: false,
      finished: false,

      control: false,
      showCatalogue: false,
      fontSize: 20,
      classObj: {
        default: true,
        night: false,
        eyeshield: false
      }
    };
  },
  components: {
    yueduHead,
    yuduFooter,
    yueduCatalogue
  },
  methods: {
    yuedubookClickFn() {
      if (this.showCatalogue) {
        this.showCatalogue = !this.showCatalogue;
      } else {
        this.control = !this.control;
      }
    },
    setData({ key, value }) {
      if (key === "index") {
        window.console.log("index被更改", value);
        // page存在的意义 防止请求过后提前把index自增了，导致流向子组件的index流下去了两次，产生点击目录是先红被点击的前一章，然后在调整
        switch (value) {
          case "--":
            this[key] -= 2;
            this.page = this[key];
            break;
          case "++":
            // this[key] = ++this[key];
            this.page = this[key];
            break;
          default:
            this[key] = value;
            this.page = value;
            break;
        }
        

        this.list = [];
        this.onLoad();
      } else {
        this[key] = value;
      }
    },
    updatabookrack() {
      // 获取本地数据
      var bookrack = JSON.parse(localStorage.getItem("bookrack"));
      if (bookrack) {
        window.console.log("存在", bookrack);
        // 存在
        // 在判断本书是否被阅读过
        let ischange = true;
        // 已被阅读过就更新
        for (let i = 0; i < bookrack.length; i++) {
          if (bookrack[i].id === this.$route.query.id) {
            window.console.log("已被阅读");
            // 找到了，让下面不用执行了
            ischange = false;
            bookrack[i].time = new Date();
            bookrack[i].index = this.index;
            bookrack.push(bookrack.splice(i, 1)[0]);

            break;
          }
        }
        // 没被阅读过就添加
        if (ischange) {
          window.console.log("从未阅读过");
          bookrack.push({
            time: new Date(),
            index: this.index,
            id: this.$route.query.id,
            title: this.info.title,
            cover: window.unescape(this.info.cover).slice(7)
          });
        }
      } else {
        window.console.log("不存在，第一次创建阅读记录对象");
        // 不存在
        bookrack = [
          {
            time: new Date(),
            index: this.index,
            id: this.$route.query.id,
            title: this.info.title,
            cover: window.unescape(this.info.cover).slice(7)
          }
        ];
      }
      window.console.log(bookrack);
      // 保存到本地
      localStorage.setItem("bookrack", JSON.stringify(bookrack));
    },
    onLoad() {
      // 这里会在路由进来后，渲染时执行一次，所以这里多了一次初始化数据
      // 这里加判断是为了防止重复初始化数据，使用immediate-check，会导致v-for无法进行渲染
      window.console.log("onLoad执行");

      Vue.axios(
        "http://novel.kele8.cn/chapters/" +
          this.formating(this.zhangjielist[this.index].link)
      ).then(res => {
        var obj = {
          title: res.data.chapter.title,
          cpContent: res.data.chapter.cpContent.split("\n")
        };
        // 添加到渲染列表
        this.list.push(obj);
        this.loading = false;

        // 自增之后就是真正的章节数，没自增之前只是用来做数组下标
        this.page = this.index++;

        // 更新url，防止点去书架再点返回结果还是跳回最初进来时的章数
        if (window.history) {
          // 获取当前url
          let url = window.location.href;
          // 拼接当前页码
          let str = url.slice(0, url.indexOf("index=") + 5 + 1) + this.index;
          // let nextStr = url.slice(url.indexOf("&id"));
          // 更改url
          window.console.log(url);
          window.console.log(str);
          window.history.pushState(null, null, str);
        }

        this.updatabookrack();

        // 如果阅读的书，也存在的书架里，那么书架的阅读记录也要更新
        this.$store.commit("setBook", {
          id: this.$route.query.id,
          value: this.index,
          key: "index"
        });
      });
    },
    formating(str) {
      // : / ? =
      var arr = str.split("");
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === ":") {
          arr[i] = "%3A";
        }
        if (arr[i] === "/") {
          arr[i] = "%2F";
        }
        if (arr[i] === "?") {
          arr[i] = "%3F";
        }
        if (arr[i] === "=") {
          arr[i] = "%3D";
        }
      }
      var newStr = arr.join("");
      return newStr;
    }
  },
  beforeRouteEnter(to, from, next) {
    window.console.log(document.getElementById("yueduqiLoading"));
    window.console.log("beforeRouteEnter开始执行");
    // to和from都储存的是路由的$route对象
    // to是指被访问的路由，也就是当前路由
    // from指的是从哪个路由跳过来的，上一个路由
    window.console.log(to.query.id);
    // 1.0 第一请求书源id
    Vue.axios(
      "http://novel.kele8.cn/book-sources?view=summary&book=" + to.query.id
    )
      .then(res => {
        window.console.log("第一次请求完毕");
        window.console.time("start")
        // 2.0 第二次请求章节列表，得到各个章节的link
        Vue.axios(
          "http://novel.kele8.cn/book-chapters/" + res.data[0]._id
        ).then(res2 => {
          window.console.timeEnd("start");
          window.console.log(res2);
          // 因为第三次请求需要方法处理link字符串，所以这里直接使用next
          next(vm => {
            window.console.log("beforeRouteEnter的next开始执行");
            // 2.1 保存第二次请求的章节列表
            vm.zhangjielist = res2.data.chapters;

            // 2.2 判断页码是否存在，不存在则默认从第一章开始阅读
            if (to.query.index) {
              vm.index = to.query.index - 1;
            } else {
              vm.index = 0;
            }
            vm.startloading = false;

            Vue.axios
              .get("http://novel.kele8.cn/book-info/" + to.query.id)
              .then(res3 => {
                vm.info = res3.data;
              });
          });
        });
      })
  },
  beforeRouteLeave(to, from, next) {
    // 在这里可以进行保存本次阅读记录，保存到本地
    // 获取本地对象
    // var bookrack = localStorage.getItem('bookrack');
    // if(bookrack){
    //   bookrack.yuedujilu.push({
    //     book:{
    //      name:
    // }
    //     endTime: new Date()
    //   })
    // }
    next();
  },
  created() {
    window.console.log("阅读组件已创建");
  }
};
</script>

<style lang='less' spcode>
.cataloguejiemian {
  width: 80%;
  height: 100%;
  position: absolute;
  top: 0;
  left: -100%;
  transition: all 0.3s ease;
  &.show {
    left: 0px;
  }
}
.showControl {
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }
}

.top,
.bottom {
  transition: all 0.3s ease;
}

.top {
  width: 100%;
  position: fixed;
  top: -150px;
}

.bottom {
  width: 100%;
  position: fixed;
  bottom: -500px;
}

.yuedubook {
  width: 100%;
  height: 100%;
  background-color: #eee6dd;

  padding-top: 0.66667rem;
  text-align: left;

  &.night {
    background-color: #0c0c0c;
    h2 {
      color: #888;
    }
    .yuedubook-box {
      p {
        color: #666;
      }
    }
  }

  &.eyeshield {
    background-color: #b8cd8d;
    h2 {
      color: #0c2e10;
    }
    .yuedubook-box {
      p {
        color: rgba(12, 46, 16, 0.8);
      }
    }
  }

  h2 {
    margin: 0px;
    color: #333;
    padding: 0 0.53333rem;
    line-height: 1.5;

    font-size: 24px;
  }

  .yuedubook-box {
    color: #333;
    padding: 0.26667rem 0.53333rem 0;

    p {
      color: #5c5d58;
      // text-indent: 2em;
      text-indent: 1cm;

      line-height: 1.5;
      margin: 0.3333rem 0;
    }
  }

  .erweima {
    width: 100%;
    height: 100px;
  }
}
</style>