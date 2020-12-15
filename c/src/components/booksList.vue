<template>
  <!-- 排行榜所需组件 -->
  <div class="wrapper" @click.stop="goRouteshujixiangxiFn">
    <div class="wrapper-box">
      <div class="left">
        <img :src="cover" alt />
      </div>
      <div class="right">
        <h4>
          <span>{{typeof index === 'number'? index+1+'.': ''}}{{book.title}}</span>
        </h4>
        <p>{{book.shortIntro}}</p>
        <p class="ranking">
          <span>{{book.author}}</span>
          <span>{{book.minorCate}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "booksList",
  props: ["book", "index"],
  computed: {
    cover() {
      // 处理返回的src
      return window.unescape(this.book.cover).slice(7);
    }
  },
  methods: {
    goRouteshujixiangxiFn() {
      this.$router.push({
        path: "/xiangqingye",
        query: {
          id: this.book._id
        }
      });
    },
    formatingNum(num) {
      if (num > 10000) {
        num = parseFloat((num / 10000).toFixed(2)) + "万";
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 2.8rem;
  padding: 15px;
  .wrapper-box {
    width: 100%;
    // height: 100%;
    height: 73px;
    display: flex;
    .left {
      width: 1.6rem;
      min-width: 1.6rem;
      height: 2.32rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      // max-width: 80%;
      height: 110%;
      text-align: left;
      margin-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      .xian {
        width: 100%;
        height: 1px;
      }
      h4 {
        margin: 0;
        padding: 0;
        display: flex;
        span {
          max-width: 70%;
          display: inline-block;
          font-size: 14px;

          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        i {
          display: inline-block;
          width: 26px;
          height: 13px;
          line-height: 13px;
          text-align: center;
          color: #fff;
          border-radius: 3px;
          font-size: 12px;
          font-style: normal;
          margin-left: 5px;
        }
      }
      p {
        margin: 0;
        padding: 0;
      }
      p {
        &:nth-of-type(1) {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #999;
          font-size: 12px;
        }
        &.tuijian {
          span:nth-child(1) {
            color: #666;
            font-size: 12px;
          }

          span:nth-child(2) {
            margin: 0 5px;
          }
          span:nth-child(3) {
            color: red;
          }
          i {
            float: right;
            width: 27px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            font-size: 12px;
            color: #ff8400;
            border-radius: 3px;
            font-style: normal;
            border: 1px solid #ff8400;
          }
        }

        &.ranking {
          span:nth-child(1) {
            font-size: 8px;
            color: #999;
            float: left;
          }
          span:nth-child(2) {
            float: right;
            color: #777;
            background-color: #efeff4;
            border-radius: 25px;
            font-size: 8px;
            padding: 2px 10px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>