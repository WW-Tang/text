// components/searchHot/searchHot.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取热门关键字
    getAJAXhotsearch(val){
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + val,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) =>{
          console.log(res);
          this.setData({
            hotlist: res.data.data.recommend_keywords
          });
          var obj = {};
          obj.time = Date().now;
          obj.hotlist = res.data.data.recommend_keywords;
          // 保存到本地
          wx.setStorageSync("hotlistObj", obj);

        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    // 点击跳转搜索页面,并传递搜索关键字
    goRouuesearching(event){
      console.log(event);
      wx.navigateTo({
        url: '/pages/searching/searching?id='+event.currentTarget.dataset.val,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

      // 1.0 判断本地是否存在
      var hotlist = wx.getStorageSync("hotlistObj");
      if (hotlist) {
        console.log("已存在");

        // 存在情况,在判断是否间隔是否大于10分钟，是否更新数据
        if (Date.now() > hotlist.time + 10 * 60 * 1000) {
          this.getAJAXhotsearch();
          // 
          console.log("已过期，更新");
        } else {
          // 已存在，但没过期
          this.setData({
            hotlist: wx.getStorageSync("hotlistObj").hotlist
          });
        }
      } else {
        // 不存在情况,说明是第一次进入页面，获取数据并缓存到本地
        console.log("未存在");
        this.getAJAXhotsearch();
      }
      // this.getAJAXhotsearch("val");
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
})
