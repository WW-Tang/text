// pages/videoList/videoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1: "https://app.vmovier.com/apiv3/post/getPostByTab?p=1 & size=10& tab=",
    url2: "https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid=",
    list: [],
    p: 1,
    historyVideoList: []
  },
  // 请求数据
  // 1
  // https://app.vmovier.com/apiv3/post/getPostByTab?p=1 & size=10& tab=hot
  // 0
  // https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid=8
  getVideoListdata(path) {
    wx.request({
      url: path,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          list: res.data.data
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
    // var 
    // console.log(options);
    this.setData({
      id: options.id
    });

    // 从旧路由获取本栏分类的信息
    var _this = this;
    const eventChannel = this.getOpenerEventChannel();
    // 绑定自定义事件
    eventChannel.on('xxx', (data) => {
      this.setData({
        item: data.data
      });

      //  如果放在外面会报错，这个setData貌似是异步，赋值后不能立即访问
      // 根据信息做判断
      console.log(this.data.url1, _this.data.url1);
      var url1 = "https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostByTab?p=" + this.data.p + " & size=10& tab=",
        url2 = "https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=" + this.data.p + "&size=10&cateid=";
      var temp = data.data;
      if (temp.cate_type === "1") {
        console.log(url1, temp.tab);
        this.getVideoListdata(url1 + temp.tab);
      } else {
        console.log(url2, temp.cateid);
        this.getVideoListdata(url2 + temp.cateid);
      }
    });

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
    wx.showLoading({
      title: "加载中"
    });
    this.setData({
      p: ++this.data.p
    });
    var url;
    if (this.data.item.cate_type === "1") {
      url = "https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostByTab?p=" + this.data.p + "& size=10& tab=";
    } else {
      url = "https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=" + this.data.p + "&size=10&cateid=";
    }
    wx.request({
      url: url,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(url, res);
        this.setData({
          historyVideoList: this.data.historyVideoList.concat(res.data.data)
        });
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading();
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})