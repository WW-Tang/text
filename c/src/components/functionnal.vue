<template>
  <div class="wrapper">
    <ul class="wrapper-box">
      <li>
        <!-- <img src="../assets/bookrack.png" alt /> -->
        <router-link to="/bookrack">
          <i></i>
          <p>书架</p>
        </router-link>
      </li>
      <li>
        <router-link to="/Ranking">
          <i></i>
          <p>排行</p>
        </router-link>
      </li>
      <li>
        <router-link to="/Ranking">
          <i></i>
          <p>VIP</p>
        </router-link>
      </li>
      <li>
        <router-link to="/Ranking">
          <i></i>
          <p>充值</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 85px;
  padding: 0 10px;
  background-color: #fff;
  background-image: linear-gradient(180deg, transparent 50%, #dfdfdf 0);
  background-size: 100% 1%;
  background-repeat: no-repeat;
  background-position: bottom;
  .wrapper-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      flex: 1;
      height: 100%;

      padding: 10px 0;
      a {
        text-align: center;
        i {
          display: block;
          width: 1.2rem;
          height: 1.2rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: 0 auto 10px;
        }
        p {
          width: 50px;
          display: block;
          color: #333;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.32rem;
          margin: 0 auto;
        }
      }

      &:nth-child(1) i {
        background-image: url(../assets/bookrack.png);
      }
      &:nth-child(2) i {
        background-image: url(../assets/ranking.png);
      }
      &:nth-child(3) i {
        background-image: url(../assets/vip.png);
      }
      &:nth-child(4) i {
        background-image: url(../assets/recharge.png);
      }
    }
  }
}
</style>