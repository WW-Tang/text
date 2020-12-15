// components/searchHistory/searchHistory.js
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
    searchHistoryList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击跳转搜索页面,并传递搜索关键字
    goRouuesearching(event) {
      console.log(event);
      wx.navigateTo({
        url: '/pages/searching/searching?id=' + event.currentTarget.dataset.val,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    deletehistory(){
      // 删除本地缓存
      var data = {
        searchHistoryList: []
      };
      wx.setStorageSync("searchHistoryObj", data);
      // 删除自身data所保存的数据
      this.setData({
        searchHistoryList: []
      });
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log("搜索历史开始渲染");
      console.log(wx.getStorageSync("searchHistoryObj").searchHistoryList);
      this.setData({
        searchHistoryList: wx.getStorageSync("searchHistoryObj").searchHistoryList.reverse()
      });
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})