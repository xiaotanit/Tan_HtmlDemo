var app = getApp();

// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //展示瀑布流
  showWaterfall: function(e){

    var index = e.currentTarget.dataset.index;

    if (index == 1){
      wx.navigateTo({ url: 'waterfall_flow/waterfall_flow' });
    }
    else if (index == 2){
      wx.navigateTo({ url: 'waterfall_flow_two/waterfall_flow_two' });
    }
    else{
      wx.navigateTo({ url: 'waterfall_flow_three/waterfall_flow_three' });
    }
  },
  //创建动画
  testAnimation: function(){
    wx.navigateTo({
      url: 'animation/animation',
    })
  },
  //监听文本输入
  inputNum: function (e) {
    return this.checkInputText(e.detail.value);
  },
  //检查输入文本，限制只能为数字并且数字最多带2位小数
  checkInputText: function(text){

    var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;

    if (reg.test(text)) { //正则匹配通过，提取有效文本
      text = text.replace(reg, '$2$3$4');
    }
    else { //正则匹配不通过，直接清空
      text = '';
    }

    return text; //返回符合要求的文本（为数字且最多有带2位小数）
  },
  //测试mock
  testMock: function(){

      var host = 'http://127.0.0.1:7654/'
      //testOne : 测试数据模板属性值为字符串和数值
      wx.request({
        url: host + 'testOne',
        success: function(data){
          console.log("..testOne...")
          console.log(data)
        }
      })

    //testTwo: 测试数据模板属性值为对象
    wx.request({
      url: host + 'testTwo',
      success: function (data) {
        console.log("..testTwo...")
        console.log(data)
      }
    })

    //testThree : 测试数据模板属性值为数组
    wx.request({
      url: host + 'testThree',
      success: function (data) {
        console.log("..testTwo...")
        console.log(data)
      }
    })

    //testFour ： 测试模板数据属性值为function和正则Reg
    wx.request({
      url: host + 'testFour',
      success: function (data) {
        console.log("..testFour...")
        console.log(data)
      }
    })

    wx.request({
      url: host + 'userInfo',
      success: function (data) {
        console.log("...success...")
        console.log(data)

      },
      fail: function (err) {
        console.log(".....fail...")
        console.log(err)
      },
      complete: function (data) {
        console.log("....complte...")
        console.log(data);
      }
    })

    //第二个请求
    wx.request({
      url: host + 'storeInfo',
      success: function (data) {
        console.log("....success....")
        console.log(data)
      },
      fail: function (err) {
        console.log(".....fail...")
        console.log(err)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})