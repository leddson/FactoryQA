const db=wx.cloud.database()  //连接数据库 (cloud是云的意思)云数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
   obj:""
  },
getData:function(){
  // db.collection("demolist").get({
  //  success:res=>{
  //    this.setData({
  //     obj:res.data
  //    })
  //  }
  //   }) //括号里面是数据库名字,get()表示对数据表进行查询。添加是add()
 db.collection("demolist").where({//通过where查询
   grade:"加急"
 }).get().then(res=>{
   console.log(res)
 })
},
addData:function(){
  wx:wx.showLoading({
    title: '提交中..',
    mask: true,
    success: (res) => {},
    fail: (res) => {},
    complete: (res) => {},
  })
db.collection("demolist").add(
  {
    data:{project_name:"测试标题"}
  }
).then(res=>{
 wx.hideLoading({
   success: (res) => {},
 })
})
},
btnNum(){
    // db.collection("demolist").get().then(res=>{
    //   console.log(res)
    // })
    db.collection("demolist").count()
    .then(res=>{
      console.log(res)
    })
},
choosImage(){
wx.chooseImage({
  count: 4,
  sizeType: ['original','compressed'],
  sourceType: ['album','camera'],
  success: (res) => {
    // const tempFilePaths=res.tempFilePaths
    this.setData({
      temp_imgs:res.tempFilePaths
    })
  },
  fail: (res) => {},
  complete: (res) => {},
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   db.collection("demolist").get({
   success:res=>{
     this.setData({
      obj:res.data
     })
   }
    }) 
  },
btnSub(res){
console.log(res)
// var obj=res.detail.value.project;
// var gr=res.detail.value.gr;
var reply=res.detail.value.reply;
db.collection("problem-list").doc('28ee4e3e6087c08312bfbb7f1cb81607').update({
  data:{
    reply:reply
  }
}).then(res=>{console.log(res)
})
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