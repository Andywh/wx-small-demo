// pages/posts/post-detail/post-detail.js
var postDatas = require("../../../data/posts-data.js")
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var globalData = app.globalData
        var postId = options.id;
        var postData = postDatas.postList[postId]
        this.data.currentPostId = postId
        this.setData({
            postData: postData,
        })
        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
        } else {
            var postsCollected = {}
            postsCollected[postId] = false
            wx.setStorageSync('posts_collected', postsCollected)
        }
        if (globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor()
    },

    setMusicMonitor:function() {
        var that = this
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true
            app.globalData.g_currentMusicPostId = that.data.currentPostId
        })
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false
            app.globalData.g_currentMusicPostId = null
        })
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false
            app.globalData.g_currentMusicPostId = null
        })

    },

    onCollectionTap: function (event) {
        this.getPostsCollectedSyc()
        // this.getPostsCollectedAsy()
    },

    getPostsCollectedAsy: function () {
        var that = this
        wx.getStorage({
            key: "posts_collected",
            success: function (res) {
                var postsCollected = wx.getStorageSync('posts_collected')
                var postCollected = postsCollected[that.data.currentPostId]
                // 收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected
                postsCollected[that.data.currentPostId] = postCollected
                this.showModal(postsCollected, postCollected)
            }
        })
    },

    getPostsCollectedSyc: function () {
        var postsCollected = wx.getStorageSync('posts_collected')
        var postCollected = postsCollected[this.data.currentPostId]
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected
        postsCollected[this.data.currentPostId] = postCollected
        this.showModal(postsCollected, postCollected)
    },

    showModal: function (postsCollected, postCollected) {
        let that = this
        wx.showModal({
            title: "收藏",
            content: postCollected ? "收藏该文章?" : "取消收藏该文章?",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确定",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    that.showToast(postsCollected, postCollected)
                }
            }
        })
    },

    showToast: function (postsCollected, postCollected) {
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected)
        // 个您数据绑定变量，从而实现切换图片
        console.log('postCollected', postCollected)
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        })
    },

    onShareTap: function (event) {
        let itemList = ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // res.cancel 用户是不是点击了取消按钮
                // res.tapIndex 数组元素的序号，从 0 开始
                wx.showModal({
                    title: "用户分享到了 " + itemList[res.tapIndex],
                    content: "用户是否取消" + res.cancel + "现在无法实现分享功能呢，什么时候能支持呢"
                })
            }
        })
    },

    onMusicTap: function (event) {
        console.log("onMusicTap")
        var postData = this.data.postData;
        var isPlayingMusic = this.data.isPlayingMusic;
        console.log(isPlayingMusic)
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio()
            this.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false
            app.globalData.g_currentMusicPostId = null
        } else {
            wx.playBackgroundAudio({
                // dataUrl: 'http://music.163.com/song/media/outer/url?id=439142642.mp3',
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg,
            })
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true
            app.globalData.g_currentMusicPostId = this.data.currentPostId
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