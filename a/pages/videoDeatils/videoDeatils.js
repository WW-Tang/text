// pages/videoDeatils/videoDeatils.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳转播放页面
  goRoutervideo(event) {
    wx.navigateTo({
      url: '/pages/videoDeatils/videoDeatils?id=' + event.currentTarget.dataset.id,
      success: function(res) {
        console.log(event);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 请求视频数据
  getvideo(id) {
    console.log(this.id);
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=' + id,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          data: res.data.data
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 点击推荐列表跳转
  goRouterplay(event) {
    console.log("//////");
    wx.redirectTo({
      url: '/pages/videoDeatils/videoDeatils?id=' + event.currentTarget.dataset.id,
      success: function(res) {},
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
    console.log(options)
    this.setData({
      id: options.id
    });

    this.getvideo(options.id)

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