<template>
  <div class="searchitem">
    <div class="cover">
      <img :src="cover" alt />
    </div>
    <div class="info">
      <div class="title">{{item.title}}</div>
      <div class="cat">
        <span>{{item.author}}</span>
        <span>|</span>
        <span>{{item.cat}}</span>
      </div>
      <div class="juqing">{{item.shortIntro}}</div>
      <div class="impotrant">
        <span>
          <b>{{item.latelyFollower}}</b>人气
        </span>
        <span>|</span>
        <span>
          <b>{{item.retentionRatio+'%'}}</b>读者留存
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchitem",
  props: ["item"],
  computed: {
    cover() {
      return window.unescape(this.item.cover).slice(7);
    }
  }
};
</script>

<style lang='less' scoped>
.searchitem {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding-left: 50px;
  padding-right: 25px;
  padding-bottom: 10px;
  .cover {
    width: 50px;
    height: 65.8px;
    margin-left: -50px;
    float: left;
    border: 1px solid #ebebeb;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    float: left;
    width: 100%;
    margin-left: 15px;

    text-align: left;

    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .cat,
    .juqing {
      color: #999;
      font-size: 12px;
    }
    .cat {
      span:nth-of-type(2) {
        margin: 0 10px;
      }
    }
    .juqing {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #999;
    }
    .impotrant {
      font-size: 12px;
      span:nth-of-type(2) {
        margin-left: 8px;
        margin-right: 12px;
      }
      b {
        color: #b93321;
        font-weight: normal;
      }
    }
  }
}
</style>