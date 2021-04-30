var id="";
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    problem_list:[{grade:"",leader_name:"",problem_detail:"",problem_name:"",project_name:""}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData:function(){
    db.collection("problem-list")
    .get()
    .then(res=>{
      this.setData({
        problem_list:res.data
      })
    })
  },
  onLoad: function (options) {
    db.collection("problem-list")
    .get()
    .then(res=>{
      this.setData({
        problem_list:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData();
    db.collection("problem-list").watch({
      onChange:res=>{
        console.log(res)
        this.setData({
          problem_list:res.docs
        })
      },
      onError:err=>{
        console.log(err)
      }
    })
  },
  goTopro:function(e){
    id=e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/zbrowse/zbrowse?id='+e.currentTarget.dataset.id
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