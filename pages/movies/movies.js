// pages/movies/movies.js
import * as util from "../../utils/util";

var app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        containerShow: true,
        searchPanelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var baseUrl = app.globalData.doubanBase
        var inTheatersUrl = baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = baseUrl + "/v2/movie/top250" + "?start=0&count=3";
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
        this.getMovieListData(top250Url, "top250", "豆瓣top250")
    },

    onMovieTap: function(event) {
        // var category = event.currentTarget.dataset.category;
        console.log("onMovieTap")
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: "movie-detail/movie-detail?id="+movieId
        })
    },

    getMovieListData: function (url, settedKey, cagetoryTitle) {
        var that = this
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': ''
            },
            success: function (res) {
                that.processDoubanData(res.data, settedKey, cagetoryTitle)
            },
        })
    },

    onCancelImgTap: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false
        })
    },

    onBindFocus: function (event) {
        console.log("onBindFocus")
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    onBindConfirm: function (event) {
        var text = event.detail.value
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
        this.getMovieListData(searchUrl, "searchResult", "")
    },

    processDoubanData: function (moviesDouban, settedKey, cagetoryTitle) {
        var movies = [];
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
        var readyData = {}
        readyData[settedKey] = {
            cagetoryTitle: cagetoryTitle,
            movies: movies
        }
        this.setData(readyData)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: "more-movie/more-movie?category=" + category
        })
    },

})