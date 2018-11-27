// pages/detail/detail.js
let listData = require('../../datas/list-data.js');
let appData = getApp();
console.log(appData.data.msg);
Page({

  /**
   * 页面的初始数据
   */
  data: {
		detailObj: {},
		isCollected: false, // 默认未收藏
		isMusicPlay: false // 默认未播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		let index = options.index;
		// 更新data中的数据
		this.setData({
			detailObj: listData.list_data[index],
			index
		});

		// 读取缓存的数据，判断文章是否被收藏
		let oldStorage = wx.getStorageSync('isCollected');
		if (oldStorage[index]){ // 文章被收藏
			// 更新状态
			this.setData({
				isCollected: true
			})
		}

		// 判断当前页面音乐是否在播放
		if (appData.data.isPlay && appData.data.pageIndex === index){
			// 更新状态
			this.setData({
				isMusicPlay: true
			})
		}

		// 监听音乐播放和暂停
		wx.onBackgroundAudioPlay(() => {
			console.log('音乐播放');
			this.setData({
				isMusicPlay: true
			});

			appData.data.isPlay = true;
			appData.data.pageIndex = index;
		})

		wx.onBackgroundAudioPause(() => {
			console.log('音乐暂停');
			this.setData({
				isMusicPlay: false
			});
			appData.data.isPlay = false;
		 })
  },
	// 处理收藏功能的函数
	handleCollection(){
		// 动态修改data中isCollected的状态值
		let isCollected = !this.data.isCollected;
		this.setData({
			isCollected
		});
		let title = isCollected?'收藏成功': '取消收藏';
		wx.showToast({
			title
		})

		// 将数据缓存到stroage中
		// 已知条件: 标识index 值isCollected
		// {0: true, 1: false, 2: true}
		let index = this.data.index;
		let obj = wx.getStorageSync('isCollected');
		console.log(obj);
		obj = obj?obj:{};
		obj[index] = isCollected;
		wx.setStorage({
			key: 'isCollected',
			data: obj
		})
	},
	// 处理音乐播放的功能函数
	handleMusicPlay(){
		let isMusicPlay = !this.data.isMusicPlay;
		this.setData({
			isMusicPlay
		});

		// 处理音乐播放和暂停
		let { dataUrl, title} = this.data.detailObj.music
		if (isMusicPlay){ // 播放
			wx.playBackgroundAudio({
				dataUrl,
				title
			})
		}else {  // 暂停
			wx.pauseBackgroundAudio()
		}
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