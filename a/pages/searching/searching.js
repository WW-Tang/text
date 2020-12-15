// pages/searching/searching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyVideoList: [],
    historyVideoListindexData: [],
    historyUrl: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.url = 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + options.id;
      // 调用接口获取数据
      wx.request({
        url: this.url,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res);
          this.setData({
            today: res.data.data.result
          });
          this.setData({
            name: "搜索结果数据"
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      });
      // 保存搜索历史
      console.log("保存搜索历史");
      var searchHistoryObj = wx.getStorageSync("searchHistoryObj");
      if (searchHistoryObj) {
        for (var i = 0; i < searchHistoryObj.searchHistoryList.length; i++) {
          if (options.id == searchHistoryObj.searchHistoryList[i]) {
            searchHistoryObj.searchHistoryList.splice(i, 1);
          }
        }
        searchHistoryObj.searchHistoryList.push(options.id);
        wx.setStorageSync("searchHistoryObj", searchHistoryObj)
      }else{
        var data = {
          searchHistoryList: []
        };
        data.searchHistoryList.push(options.id);
        wx.setStorageSync("searchHistoryObj", data)
        
      }


    } else {
      this.url = 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index';
      // 调用接口获取数据
      wx.request({
        url: this.url,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data.data.today);
          this.setData({
            today: res.data.data.today
          });
          this.setData({
            name: "默认数据"
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 1.0 启动loading效果
    wx.showLoading({
      title: '加载中',
    });

    if (this.data.name === "搜索结果数据") {
      if (this.data.historyUrl.length === 0) {
        this.setData({
          historyUrl: this.data.historyUrl.concat([this.data.today.next_page_url_full])
        });
      }

      console.log(this.data.today.next_page_url_full);
      // ajax请求数据
      wx.request({
        // 4.2 拼接url，代理跨域
        url: "https://api.kele8.cn/agent/" + this.data.historyUrl[this.data.historyUrl.length - 1],
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          // 4.3 成功拿到数据，停止loading
          wx.hideLoading();
          // 4.4 更新数据，触发视图更新
          console.log(res);
          // 准备下一个数据连接
          this.setData({
            historyUrl: this.data.historyUrl.concat([res.data.data.result.next_page_url_full])
          });
          // 更新到历史视频数组保存起来并触发视图更新渲染到页面
          this.setData({
            historyVideoList: this.data.historyVideoList.concat(res.data.data.result.list)
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    } else {
      console.log("默认数据");
      // 默认数据
      // 2.0 判断是否是第一次底部上拉
      if (this.data.historyVideoList.length === 0) {
        // 3.0 获取本地数据
        var indexData = wx.getStorageSync("indexData");
        // 3.1 直接从本地数据获取昨天的数据
        this.setData({
          historyVideoList: this.data.historyVideoList.concat(indexData.posts.list)
        });
        this.setData({
          historyUrl: this.data.historyUrl.concat([indexData.posts.next_page_url_full])
        });
        // 3.2 成功拿到数据，停止loading
        wx.hideLoading();

      } else {
        console.log("n次下拉");
        // 4.0 这里能执行说明已经至少上拉过一次，第二次上拉要根据数组最后一项的链接来请求数据，在把获取到的数据保存为最后一项

        // 4.1 启动loading效果
        wx.showLoading({
          title: '加载中',
        })

        // ajax请求数据
        wx.request({
          // 4.2 拼接url，代理跨域
          url: "https://api.kele8.cn/agent/" + this.data.historyUrl[this.data.historyUrl.length - 1],
          data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            // 4.3 成功拿到数据，停止loading
            wx.hideLoading();
            // 4.4 更新数据，触发视图更新
            console.log(res);
            this.setData({
              historyVideoList: this.data.historyVideoList.concat(res.data.data.list)
            });
            this.setData({
              historyUrl: this.data.historyUrl.concat([res.data.data.next_page_url_full])
            });
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    }




  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})