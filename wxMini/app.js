//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        console.log("....login...success...")
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {

        console.log('...获取用户信息...')
        console.log(res)

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //初始化小程序 云 开发能力
    wx.cloud.init({
      traceUser: true // 用户信息会显示在云开发控制台的用户面板中
    });
  },
  globalData: {
    userInfo: null,
    host: 'http://127.0.0.1:7654/'
  }
})