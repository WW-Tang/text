<template>
  <div class="yuedu_footer">
    <div class="addBookrack" v-show="!bookstate" @click.stop="addBookFn">加入书架</div>
    <div class="deleteBookrack" v-show="bookstate" @click.stop="deleteBookFn">撤出书架</div>
    <div class="control">
      <div class="progressBar">
        <div class="sub" @click.stop="subFontSize">Aa-</div>
        <div class="add" @click.stop="addFontSize">Aa+</div>
        <div class="progress">
          <div class="bar" :style="{width: jindu(fontSize)+'%'}"></div>
        </div>
      </div>
      <div class="control_button">
        <div
          v-for="(item, index) in moshiArr"
          :key="index"
          :class="item.classObj"
          @click.stop="moshiTab(index)"
        >{{item.content}}</div>

        <!-- 夜间#0c0c0c h4 #888 p #666 -->

        <!-- 护眼#b8cd8d #0c2e10  rgba(12,46,16,.8) -->
      </div>
      <div class="control_section">
        <div
          class="previousChapter"
          :class="{disabled: index === 0}"
          @click.stop="previousChapterFn"
        >上一章</div>
        <div class="nextChapter" @click.stop="nextChapterFn">下一章</div>
        <div class="catalogue" @click.stop="showCatalogueFn">目录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 父组件传递的是数组索引
  props: ["index"],
  data() {
    return {
      fontSize: 20,
      moshiArr: [
        {
          classObj: {
            default: true,
            active: true
          },
          content: "默认"
        },
        {
          classObj: {
            night: true,
            active: false
          },
          content: "夜间"
        },
        {
          classObj: {
            eyeshield: true,
            active: false
          },
          content: "护眼"
        }
      ]
    };
  },
  watch: {
    //   同步父组件的字体大小与本组件的数据一致
    fontSize() {
      this.$emit("setData", { key: "fontSize", value: this.fontSize });
    }
  },
  computed: {
    bookstate() {
      return this.$store.getters.getBookById(this.$route.query.id);
    }
  },
  methods: {
    addBookFn() {
      // 第一 渲染时确认书架中没有该书 决定渲染的是加入书架还是撤出书架(用类名控制)，查询vuex数据
      // 第二 确认是否阅读过该书 查询本地数据,主要是获取页码
      // 因为是在阅读器的界面加入书架，已经产生了页码，所以不需要从本地那里拿了
      // 要保存的是页码也就是章节数，所以要+1
      var index = this.index+1;

      this.$store.commit("addBookrack", {
        title: this.$route.query.title,
        cover: this.$route.query.title,
        id: this.$route.query.id,
        index: index ? index : 1,
        // time:
        //   this.formating(Date.now() - Date.parse(this.data.updated)) +
        //   " : " +
        //   this.data.lastChapter
      });
    },

    deleteBookFn() {
      this.$store.commit("deleteBook", this.$route.query.id);
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
    },
    // 上一章下一章要注意改变的是++后的index，是章节数了，不是数组索引了，但是要的是数组索引，-1得变成-2，+1得变成不加
    // 因为在请求完数据后，已经提前对index进行了自增，1是为了保存章节数，二是为了下次请求做准备
    previousChapterFn() {
      if (this.index > 0) this.$emit("setData", { key: "index", value: "--" });
    },
    nextChapterFn() {
      this.$emit("setData", { key: "index", value: "++" });
    },
    //   显示目录
    showCatalogueFn() {
      window.console.log("显示目录");
      this.$emit("setData", { key: "control", value: false });
      this.$emit("setData", { key: "showCatalogue", value: true });
    },
    // tab功能
    moshiTab(index) {
      for (let i = 0; i < this.moshiArr.length; i++) {
        this.moshiArr[i].classObj.active = false;
      }
      this.moshiArr[index].classObj.active = true;
      //   修改父组件的classObj
      this.$emit("setData", {
        key: "classObj",
        value: this.moshiArr[index].classObj
      });
    },
    addFontSize() {
      this.fontSize += 2;
    },
    subFontSize() {
      this.fontSize -= 2;
    },
    jindu(num) {
      switch (num) {
        case 16:
          return 0;
        case 18:
          return 25;
        case 20:
          return 50;
        case 22:
          return 75;
        case 24:
          return 100;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.yuedu_footer {
  .addBookrack,
  .deleteBookrack {
    position: absolute;
    top: -40px;
    right: 0px;
    border-radius: 20px 0px 0px 20px;
    width: 70px;
    height: 25px;
    background-color: #333;
    color: #fff;
    font-size: 12px;
    line-height: 15px;
    padding: 5px;
  }
  .control {
    background-color: rgba(50, 51, 52, 0.9);
    width: 100%;
    height: auto;
    padding: 20px;
    .progressBar {
      width: 100%;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      padding: 0 40px;
      .sub,
      .add {
        color: #fff;
        float: left;
        font-size: 17px;
        margin-left: -40px;
      }
      .add {
        float: right;
        margin-right: -40px;
      }
      .progress {
        background-color: #999;
        height: 2px;
        position: relative;
        top: 11px;
        .bar {
          position: absolute;

          height: 2px;
          background-color: #b93221;
        }
      }
    }

    .control_button {
      // width: 100%;
      margin: 15px 0;
      display: flex;
      justify-content: space-around;
      .default,
      .night,
      .eyeshield {
        width: 80px;
        height: 30px;
        border: 1px solid #999;
        float: left;
        margin-right: 10px;
        color: #fff;
        line-height: 28px;
        border-radius: 3px;
      }
      .active {
        color: #b93221;
        border-color: #b93221;
      }
    }

    .control_section {
      margin-top: 10px;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .previousChapter,
      .nextChapter,
      .catalogue {
        color: #fff;
      }
      .previousChapter {
        float: left;
        &.disabled {
          color: #888;
        }
      }
      .nextChapter {
        float: right;
      }
      .catalogue {
        color: #999;
      }
    }
  }
}
</style>