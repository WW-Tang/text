// pages/categor/categor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳转到分类列表
  goRouterVideolist(event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/videoList/videoList?id='+event.currentTarget.dataset.id,
      events:{
        // 在这里绑定事件，然后在新路由触发事件，执行事件处理函数，这里就可以处理新路由的数据
      },
      success: function(res) {
        console.log(res.eventChannel.emit);
        // 触发自定义事件
        // res.eventChannel.emit
        res.eventChannel.emit("xxx", {
          data: event.currentTarget.dataset.item
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 请求数据
  getcateData() {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        var data = res.data;
        data.time = Date.now();
        wx.setStorageSync("cateData", data);

        // 置入数据到data
        this.setData({
          cateData: data
        });
      },
      fail: function(res) {},
      complete: function(res) {
        console.log(res);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // https://app.vmovier.com/apiv3/cate/getList
    // 1.0 获取本地数据
    var cateData = wx.getStorageSync("cateData");
    if (cateData) {
      // 已存在
      console.log("cateData已存在");
      if (cateData.time + 10 * 60 * 1000 < Date.now()) {
        // 已过期
        console.log("cateData已存在,并且过期");
        this.getcateData();
      } else {
        // 已存在，但没过期。直接从本地获取
        console.log("cateData已存在,但没过期");
        this.setData({
          cateData: cateData
        });
      }
    } else {
      // 不存在
      console.log("cate不存在");
      this.getcateData();
    }
    console.log("cate-load");

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})