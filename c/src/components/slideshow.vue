<template>
  <div class="wrapper">
    <!-- <div class="slideshow">
      <ul>
        <li></li>
      </ul>
    </div> -->
    <div class="slideshow-vant">
      <van-swipe :autoplay="3000" indicator-color="#d26050">
        <van-swipe-item v-for="(item, index) in arr" :key="index" :style="item"></van-swipe-item>
        <!-- <van-swipe-item
          v-for="(item, index) in arr"
          :key="index"
          :style="{backgroundImage:'url('+item.backgroundImage+')'}"
        ></van-swipe-item>-->
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  name: "slideshow",
  data() {
    return {
      arr: [
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191227/44b8da9d857448229a14894fbc9a08a5.jpg)"
        },
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191218/8ff1cffb162446149bf9cf268a075347.jpg)"
        },
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191227/65382c7e86c143448daa840031c47069.jpg)"
        },
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191218/3e86af2d9d374766b1a843eb9520dd15.jpg)"
        },
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191227/ea1ed1f79327419087fcf3cce35c91ce.jpg)"
        },
        {
          backgroundImage:
            "url(https://plf-new.zhuishushenqi.com/management/images/20191210/ad193aca91b14f7293c931d15bd75b91.jpg)"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.wrapper {
  .slideshow {
    width: 100%;
    height: 40vw;
    background-color: #eee;
    position: relative;
    overflow: hidden;
    ul {
      width: 100%;

      li {
        width: 100%;
        position: absolute;
      }
    }
  }
  .slideshow-vant {
    width: 100%;
    height: 40vw;
    height: 4rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe-item {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        // &:nth-child(1) {
          // :style="{background:'url('+item+')'}"
          // background-image: url(../assets/slideshow01.jpg);
        // }
      }
      .van-swipe__indicators{
        right: 0!important;
        left: initial!important;
      }
    }
  }
}
</style>