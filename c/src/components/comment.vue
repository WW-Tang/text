<template>
  <div class="comment">
    <div class="left">
      <img :src="'http://statics.zhuishushenqi.com'+obj.author.avatar" alt />
    </div>
    <div class="right">
      <p>{{obj.author.nickname}}</p>
      <p>{{obj.title}}</p>
      <van-rate v-model="obj.rating" readonly />
      <p class="content">{{obj.content}}</p>
      <div class="box">
        <div class="right_left">{{formating(Date.now() - Date.parse(obj.updated))}}</div>
        <div class="right_right">0人觉得有用</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["obj"],
  data() {
    return {
      value: 0
    };
  },
  methods: {
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
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  display: flex;
  padding-bottom: 0.13333rem;
  border-bottom: 1px solid #ebebeb;
  .left {
    img {
      width: 0.93333rem;
      height: 0.93333rem;
      border-radius: 0.93333rem;
      margin-top: 5px;
    }
  }
  .right {
    margin-left: 5px;

    .content {
      height: 30px;
      overflow: hidden;
    }

    p {
      margin: 0;
      padding: 0;
    }
    p:nth-of-type(1) {
      color: #a58d5e;
    }
    p:nth-of-type(2) {
      font-weight: 900;
      font-size: 12px;
    }
    p:nth-of-type(3) {
      color: #999;
      font-size: 12px;
    }
    & > .box {
      margin-top: 0.13333rem;
      .right_left,
      .right_right {
        color: #999;
        font-size: 12px;
      }
      .right_left {
        float: left;
      }
      .right_right {
        float: right;
      }
    }
  }
}
</style>