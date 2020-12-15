<template>
  <div class="hot">
    <div class="hot-box">
      <div class="title">
        <div class="title-text">热门推荐</div>
        <div class="refresh" @click.stop="refreshClickFn">
          换一批
          <!-- 字体图标，伪类after或者span -->
        </div>
      </div>
      <div class="hotkeywords">
        <ul>
          <li
            v-for="(item, index) in arr"
            :key="index"
            @click.stop="routegoSearchListClickFn(item)"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Searchhot",
  data() {
    return {
      hotkeywords: [],
      len: 0,
      arr: [],
      chofu: []
    };
  },
  computed: {},
  methods: {
    refreshClickFn() {
      var arr = [];
      //   生成6个随即索引，范围0到length-1，不可重复
      for (let i = 0; i < 7; i++) {
        //   生成随机数
        let random = Math.round(Math.random() * (this.len - 1));
        let isChange = false;
        window.console.log(this.hotkeywords[random]);

        // 判断随机数是否跟当前数组里面的某个元素相同,要等到数组里面已经有两个元素及以上才能进行比较
        if (i > 0) {
          for (let j = 0; j < arr.length; j++) {
            // 含有相同
            if (random == arr[j]) {
              // 找到相同，打标记
              isChange = true;
              //   终止循环
              break;
            }
          }
        }

        // 判断是否与当前显示的重复
        // for (let k = 0; k < this.arr.length; k++) {
        //   // 重复
        //   if (this.arr[k] == this.hotkeywords[random]) {
        //     // 开启开关变量
        //     isChange = true;
        //     // 终止循环
        //     break;
        //   }
        // }

        // 判断标记是否为真
        if (isChange) {
          // 为真则说明含有相同
          // 那么本次循环生成的随机数将不添加
          i--;
          continue;
        } else {
          arr.push(random);
        }
      }

      //   抽取数据
      var list = [];
      for (let i = 0; i < arr.length; i++) {
        list.push(this.hotkeywords[arr[i]]);
      }
      this.arr = list;
    },
    routegoSearchListClickFn(item) {
      // 保存搜索记录
      // 需要判断是否是首次存储
      if (!localStorage.Search) {
        window.console.log("首次");
        let Search = { KeyWords: [] };
        Search.KeyWords.push(this.value);
        // 重新设置，更新旧的，保存作用
        localStorage.setItem("Search", JSON.stringify(Search));
      } else {
        let Search = JSON.parse(localStorage.getItem("Search"));
        for (let i = 0; i < Search.KeyWords.length; i++) {
          if (item === Search.KeyWords[i]) {
            Search.KeyWords.splice(i, 1);
          }
        }
        Search.KeyWords.push(item);
        // 重新设置，更新旧的，保存作用
        localStorage.setItem("Search", JSON.stringify(Search));
      }

      // 跳转路由
      this.$router.push({
        path: "/SearchList",
        query: {
          value: item
        }
      });
    }
  },
  created() {
    this.axios.get("http://novel.kele8.cn/hot-books").then(response => {
      this.hotkeywords = response.data.hotWords;
      this.arr = response.data.hotWords.slice(0, 6);
      this.len = response.data.hotWords.length;
    });
  }
};
</script>
<style lang="less" scoped>
.hot {
  width: 100%;
  padding: 0 15px;
  .hot-box {
    width: 100%;
    .title {
      display: flex;
      margin-top: 15px;
      .title-text {
        flex: 1;
        text-align: left;
        margin: 0;
        color: #6b6b6b;
        font-size: 0.58667rem;
      }
      .refresh {
        width: 2.1875rem;
        height: 0.9375rem;
        margin: 0;
        color: #8a8a8f;
        font-size: 0.32rem;
        position: relative;
        line-height: 0.9375rem;
        text-align: center;
        &::after {
          content: "";
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.21333rem;
          width: 0.42667rem;
          height: 0.42667rem;
          background-image: url(../assets/refresh.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
    .hotkeywords {
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          height: 0.8rem;
          line-height: 0.8rem;
          border-radius: 25px;
          padding: 0 10px;
          background-color: #efeff4;
          color: #9b9ba3;
          margin: 5px 0;
          margin-right: 10px;
          font-size: 0.32rem;
        }
      }
    }
  }
}
</style>