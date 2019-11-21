// pages/movies/movie-detail/movie-detail.js
import * as util from "../../../utils/util";

var app = getApp()
Page({

    data: {},

    onLoad: function (options) {
        var movieId = options.id;
        console.log(movieId)
        var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId
        util.http(url, this.processDoubanData)
    },

    processDoubanData: function (data) {
        console.log(data)
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            director.avatar = data.directors[0].avatars.large
        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: util.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.convertToCastInfos(data.casts).concat(util.convertToCastInfos(data.casts)),
            summary: data.summary
        }
        this.setData({
            movie: movie
        })
    },

    viewMoviePostImg: function (event) {
      console.log("viewMoviePostImg")
      var src = event.currentTarget.dataset.src;
      wx.previewImage({
        current: src,
        urls: [src]
      })
    }

})