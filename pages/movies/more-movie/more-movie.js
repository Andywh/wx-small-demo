// pages/movies/more-movie/more-movie.js
import * as util from "../../../utils/util";

var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [],
        navigateTitle: "",
        requestUrl: "",
        totalCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var category = options.category
        console.log(category)
        this.setData({
            navigateTitle: category
        })
        var baseUrl = app.globalData.doubanBase
        var dataUrl = ""
        if (category === '正在热映') {
            dataUrl = baseUrl + "/v2/movie/in_theaters";
        } else if (category === "即将上映") {
            dataUrl = baseUrl + "/v2/movie/coming_soon"
        } else if (category === "豆瓣top250") {
            dataUrl = baseUrl + "/v2/movie/top250"
        }
        this.data.requestUrl = dataUrl
        util.http(dataUrl, this.processDoubanData)
    },

    onScrollLower: function (event) {
        console.log("加载更多")
        var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
        util.http(nextUrl, this.processDoubanData)
        wx.showNavigationBarLoading()
    },

    processDoubanData: function (moviesDouban) {
        var movies = this.data.movies;
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx]
            var title = subject.title
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        this.setData({
            movies: movies
        })
        this.data.totalCount += 20
        wx.hideNavigationBarLoading()
        console.log(movies)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(this)
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        })
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
    onPullDownRefresh: function (event) {
        console.log("onPullDownRefresh")
        var refreshUrl = this.data.requestUrl + "?start=0&count=20"
        this.data.movies = []
        util.http(refreshUrl, this.processDoubanData)
        wx.showNavigationBarLoading()
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