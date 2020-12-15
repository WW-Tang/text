// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: ''
  },
  searchSubmit(event) {
    console.log("跳转搜索结果页面，并传递value");
    console.log(event.detail.value);
    console.log(this.inputVal);
    // 跳转路由
    wx.navigateTo({
      // 第一种路由传参方法,也是最简单的
      url: "/pages/searching/searching?id="+event.detail.value,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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