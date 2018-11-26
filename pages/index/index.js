// pages/index/index.js
Page({// 注册页面

  /**
   * 页面的初始数据
   */
  data: {
		msg: 'xxxx',
		userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log('onload');
		this.handleGetUserInfo()

  },
	// 获取用户登录的信息
	handleGetUserInfo(){
	
		wx.getUserInfo({
			success: (msg) => {
				console.log(msg);
				// 将获取的数据更新到data中
				// this.setState() react
				// this.xx = value; vue
				this.setData({
					userInfo: msg.userInfo
				});
			},
			fail() {
				console.log('获取失败');
			}
		})
	},
	getUserInfo(msg){
		console.log(msg);
		if(msg.detail.rawData){ // 用户点击的允许
			this.handleGetUserInfo()
		}
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		console.log('onShow');
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