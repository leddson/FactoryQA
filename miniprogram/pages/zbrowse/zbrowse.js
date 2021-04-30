const db=wx.cloud.database()
var idx=''
Page({
  data: {
    problem_list:[{grade:"",leader_name:"",problem_detail:"",problem_name:"",project_name:"",reply:"", id:""}],
  },
  formSubmit(res){
    wx:wx.showLoading({
      title: '提交中..',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    var reply=res.detail.value.reply;
    db.collection("problem-list").doc(idx).update({
      data:{
       reply:reply
      }
    }).then(res=>{
      wx.hideLoading({
      success: (res) => {},
    })
    wx.navigateBack({
      delta: 2
    })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var id=options.id
    idx=id;
    console.log(id)
    db.collection("problem-list").doc(id)
    .get()
    .then(res=>{
        this.setData({
          id:res.data._id,
          problem_list:res.data
        })
         console.log(res)
       })
       return id
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