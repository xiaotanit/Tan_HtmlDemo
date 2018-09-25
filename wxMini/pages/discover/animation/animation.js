// pages/discover/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //第一个动画：透明度和背景颜色
  clickOne: function(){
    
    // //第一种写法
    // var ani = wx.createAnimation({
    //   duration: 3000
    // })
    // ani.opacity(0.2).backgroundColor('#fff').step();
    // this.setData({ animationOne: ani.export() });

    //第二种写法
    var ani = wx.createAnimation()
    ani.opacity(0.2).backgroundColor('#fff').step({ duration: 3000 });
    this.setData({ animationOne: ani.export() });
  },
  //长按第一个动画变化透明度和背景颜色
  longPressOne: function(){
    var ani = wx.createAnimation({
    })
    ani.opacity(1).backgroundColor('#000').step();
    this.setData({ animationOne: ani.export() });
  },
  //第二个动画：宽高变化和坐标变化
  clickTwo: function(){
    var ani = wx.createAnimation();
    ani.width('300rpx').height('300rpx').left(0).top('100rpx').step({ duration: 2000 });
    this.setData({ animationTwo: ani.export() });
  },
  longPressTwo: function(){
    var ani = wx.createAnimation();
    ani.width('200rpx').height('100rpx').left('300rpx').top('260rpx').step({ duration: 500 });
    this.setData({ animationTwo: ani.export() });
  },

  //旋转X轴
  clickRotateX: function(){

    var deg = 180;
    var oldAni = this.data.animationRotateX;
    if (oldAni){
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 180){
        deg = 0;
      }
    }

    var ani = wx.createAnimation({
      duration: 1000
    });
    ani.rotateX(deg).step();
    this.setData({ animationRotateX: ani });
  },
  //Y轴旋转
  clickRotateY: function(){

    var deg = 180;
    var oldAni = this.data.animationRotateY;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 180) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.rotateY(deg).step();
    this.setData({ animationRotateY: ani.export() });
    console.log(this.data.animationRotateY)
  },
  //Z轴旋转
  clickRotateZ: function () {

    var deg = 180;
    var oldAni = this.data.animationRotateZ;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 180) {
        deg = 0;
      }
    }
    //step-end	动画一直保持开始状态，最后一帧跳到结束状态
    var ani = wx.createAnimation({ "timingFunction": "step-end" });
    ani.rotateZ(deg).step();
    this.setData({ animationRotateZ: ani.export() });
  },
  clickRotate3d: function () {

    console.log(this.data.animationRotate3d)
    var deg = 360;
    var oldAni = this.data.animationRotate3d;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[3];
      if (obj == 360) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.rotate3d(1, 1, 1, deg).step({ duration: 2000 });
    this.setData({ animationRotate3d: ani.export() });
  },
  //rotate和rotateZ效果差不多
  clickRotateAll: function () {

    var deg = 360;
    var oldAni = this.data.animationRotateAll;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 360) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.rotate(deg).step();
    this.setData({ animationRotateAll: ani.export() });
  },
  
  //scaleX缩放
  clickScaleX: function () {

    var s = 2;
    var oldAni = this.data.animationScaleX;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 2) {
        s = 0.6;
      }
    }

    var ani = wx.createAnimation();
    ani.scaleX(s).step();
    this.setData({ animationScaleX: ani.export() });
  },
  //scaleY缩放
  clickScaleY: function () {

    var s = 2;
    var oldAni = this.data.animationScaleY;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 2) {
        s = 0.8;
      }
    }

    var ani = wx.createAnimation();
    ani.scaleY(s).step();
    this.setData({ animationScaleY: ani.export() });
  },
  //scaleZ缩放
  clickScaleZ: function () {

      //对于平面图的根据Z轴缩放，没有反应
      console.log(this.data.animationScaleZ)

    var s = 2;
    var oldAni = this.data.animationScaleZ;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 2) {
        s = 0.8;
      }
    }

    var ani = wx.createAnimation();
    ani.scaleZ(s).step();
    this.setData({ animationScaleZ: ani.export() });
  },
  //scale3d缩放
  clickScale3d: function () {

    var s = 2;
    var oldAni = this.data.animationScale3d;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 2) {
        s = 1;
      }
    }

    var ani = wx.createAnimation();
    ani.scale3d(s, s, s).step();
    this.setData({ animationScale3d: ani.export() });
  },
  //scale缩放: 对于平面图，scale和scale3d效果一样
  clickScaleAll: function () {

    var s = 2;
    var oldAni = this.data.animationScaleAll;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 2) {
        s = 1;
      }
    }

    var ani = wx.createAnimation();
    ani.scale(s, s).step();
    this.setData({ animationScaleAll: ani.export() });
  },

  //形变，形变X
  clickTranslateX: function () {

    console.log(this.data.animationTranslateX);

    var px = 200;
    var oldAni = this.data.animationTranslateX;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 200) {
        px = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.translateX(px).step();
    this.setData({ animationTranslateX: ani.export() });
  },
  //形变Y
  clickTranslateY: function () {

    var px = -200;
    var oldAni = this.data.animationTranslateY;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == -200) {
        px = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.translateY(px).step();
    this.setData({ animationTranslateY: ani.export() });
  },
  //对于平面图，关于Z轴移动看起来没有变化
  clickTranslateZ: function () {

    var px = -200;
    var oldAni = this.data.animationTranslateZ;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == -200) {
        px = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.translateZ(px).step();
    this.setData({ animationTranslateZ: ani.export() });
  },
  clickTranslate3d: function () {

    var px = 200;
    var oldAni = this.data.animationTranslate3d;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 200) {
        px = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.translate3d(px, -px,px/2).step();
    this.setData({ animationTranslate3d: ani.export() });
  },
  clickTranslateAll: function () {

    var px = 100;
    var oldAni = this.data.animationTranslateAll;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 100) {
        px = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.translate(px, -px*3).step();
    this.setData({ animationTranslateAll: ani.export() });
  },
  clickSkewX: function () {

    var deg = 60;
    var oldAni = this.data.animationSkewX;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == 100) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.skewX(deg).step();
    this.setData({ animationSkewX: ani.export() });
  },
  //X轴倾斜
  clickSkewX: function () {

    var deg = 60;
    var oldAni = this.data.animationSkewX;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == deg) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.skewX(deg).step();
    this.setData({ animationSkewX: ani.export() });
  },
  clickSkewY: function () {

    var deg = 120;
    var oldAni = this.data.animationSkewY;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == deg) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.skewY(deg).step();
    this.setData({ animationSkewY: ani.export() });
  },
  clickSkew: function () {

    var deg = 180;
    var oldAni = this.data.animationSkew;
    if (oldAni) {
      var obj = oldAni.actions[0].animates[0].args[0];
      if (obj == deg) {
        deg = 0;
      }
    }

    var ani = wx.createAnimation();
    ani.skew(deg, deg).step();
    this.setData({ animationSkew: ani.export() });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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