// components/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
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
  }
})