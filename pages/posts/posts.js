// pages/posts/posts.js
var postData = require("../../data/posts-data.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: 'Nov 18 2019',
        title: '正是虾肥蟹壮时',
    },

    // process: function() {
    //     var date = 'Nov 18 2019'
    //     var date_ele = document.getElementById('id')
    //
    // }
    onPostTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        console.log("onPostTap", postId)
        wx.navigateTo({
            url:"post-detail/post-detail?id=" + postId
        })
    },

    onSwiperItemTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        console.log("onSwiperItemTap", postId)
        wx.navigateTo({
            url:"post-detail/post-detail?id=" + postId
        })
    },

    onSwiperTap: function(event) {
        var postId = event.target.dataset.postid
        console.log("onSwiperItemTap", postId)
        // target 和 currentTarget
        // target 指的是当前点击的组件 和  currentTarget 指的是事件捕获的组件
        // target 这里指的是 image，而 currentTarget 指的是 swiper
        wx.navigateTo({
            url:"post-detail/post-detail?id=" + postId
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({local_database:postData.postList})
        console.log("onLoad")
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("onReady")

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("onShow")

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide")

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh")

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("onReachBottom")

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log("onShareAppMessage")

    }
})