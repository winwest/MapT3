// 引入SDK核心类
var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'U24BZ-4F5WF-MWOJD-JNONC-3WYSE-VQBTF'
});
Page({
  data: {
    mylatitude: "",
    mylongitude: "",
    inputFocus: false, // input框的focus状态
    inputModel: '', // input框的输入内容
    inputInfo: '搜索关键词', // cover-view 显示的 input 的输入内容,初始值充当placeholder作用
  },

  //搜索周边
  //获取关键词
  getKey: function (arg) {
    var _this = this;
    // console.log(arg);
    //console.log(arg.detail.value);
    //获得的keyword
    var myKeyWord = arg.detail.value;
    var mylocation = "" + this.data.mylatitude + "," + this.data.mylongitude;
    //console.log(mylocation);
    qqmapsdk.search({
      keyword: myKeyWord,
      location: mylocation,
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../img/地标.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
        // wx.showModal({
        //   title: '提示',
        //   content: '请求服务器失败',
        // })
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  getCompass:function(e){
    setTimeout(function () {
      wx.navigateTo({
        url: '../compass/compass',
      })
    }, 5);
  },
  

//------------------------------

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // 页面加载获取当前定位
    var _this = this;
    wx.getLocation({
      success(data) {
        const latitude = data.latitude;
        const longitude = data.longitude;
        var accuracy=data.accuracy;
        //打印
        //console.log(data);
        // console.log(latitude);
        // console.log(longitude);
        _this.setData({
          mylatitude: latitude,
          mylongitude: longitude
        });
        if (data) {
          _this.setData({
            markers: [{
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              accuracy:data.accuracy,
              // width: 32,
              // height: 32
            }],
            poi: { //根据自己data数据设置相应的地图中心坐标变量名称
              latitude: latitude,
              accuracy: accuracy,
              longitude: longitude
            }
          });
        }
      }
    });

    //设置地图高度
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap');
  },
  // 将焦点给到 input
  tapInput() {
    this.setData({
      //在真机上将焦点给input
      inputFocus: true,
      //初始占位清空
      inputInfo: ''
    });
  },
  // input 失去焦点后将 input 的输入内容给到cover-view
  blurInput(e) {
    this.setData({
      inputInfo: e.detail.value || '输入关键词'
    });
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