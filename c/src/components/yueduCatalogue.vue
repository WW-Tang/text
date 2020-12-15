<template>
  <div class="yueduCatalogue">
    <div class="head">
      <h4>{{obj.title}}</h4>
      <p>目录</p>
    </div>
    <ul>
      <li
        v-for="(item, index) in chapters"
        :key="index"
        :class="{red: index===obj.index}"
        @click.stop="goRouteyuedubookFn(index)"
      >{{item.order}}-{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["chapters", "obj"],
  methods: {
    goRouteyuedubookFn(index) {
      this.$emit("setData", { key: "index", value: index });
    }
  }
};
</script>

<style lang='less' scoped>
.yueduCatalogue {
  width: 100%;
  height: 100%;

  .head {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    p {
      color: #999;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  ul {
    width: 100%;
    height: 100%;
    margin-top: 60px;
    position: absolute;
    overflow-y: auto;
    background-color: #fff;
    top: 0;
    li {
      text-align: left;
      border-bottom: 1px solid #f2f2f2;
      height: 40px;
      line-height: 40px;
      color: #999;
      padding: 0 15px;
      font-size: 12px;
    }
    li.red {
      color: #b93321;
    }
  }
}
</style>