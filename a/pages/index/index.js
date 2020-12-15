//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    historyVideoList: []

  },
  goRouterSearch() {
    console.log("????");
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res) {
        console.log("成功");
      },
      fail: function(res) {
        console.log("失败", res);
      },
      complete: function(res) {},
    })
  },
  methods: {

  },


  // 请求数据
  getindexData() {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        var data = res.data.data;
        console.log(data.banner.list);
        data.time = Date.now();
        wx.setStorageSync("indexData", data);

        // 置入数据到data
        this.setData({
          indexData: wx.getStorageSync("indexData")
        });

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function() {
    // 1.0 判断本地是否存在
    var indexData = wx.getStorageSync("indexData");
    if (indexData) {
      console.log("已存在");

      // 存在情况,在判断是否间隔是否大于10分钟，是否更新数据
      if (Date.now() > indexData.time + 10 * 60 * 1000) {
        this.getindexData();
        // 
        console.log("已过期，更新");
      } else {
        // 已存在，但没过期
        this.setData({
          indexData: wx.getStorageSync("indexData")
        });
      }
    } else {
      // 不存在情况,说明是第一次进入页面，获取数据并缓存到本地
      console.log("未存在");
      this.getindexData();
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 1.0 启动loading效果
    wx.showLoading({
      title: '加载中',
    });
    // 2.0 判断是否是第一次底部上拉
    if (this.data.historyVideoList.length === 0) {
      // 3.0 获取本地数据
      var indexData = wx.getStorageSync("indexData");
      // 3.1 直接从本地数据获取昨天的数据
      this.setData({
        historyVideoList: this.data.historyVideoList.concat(indexData.posts)
      });

      // 3.2 成功拿到数据，停止loading
      wx.hideLoading();

    } else {
      // 4.0 这里能执行说明已经至少上拉过一次，第二次上拉要根据数组最后一项的链接来请求数据，在把获取到的数据保存为最后一项

      // 4.1 启动loading效果
      wx.showLoading({
        title: '加载中',
      })
      // ajax请求数据
      wx.request({
        // 4.2 拼接url，代理跨域
        url: "https://api.kele8.cn/agent/" + this.data.historyVideoList[this.data.historyVideoList.length - 1].next_page_url_full,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          // 4.3 成功拿到数据，停止loading
          wx.hideLoading();
          // 4.4 更新数据，触发视图更新
          this.setData({
            historyVideoList: this.data.historyVideoList.concat(res.data.data)
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  }
})