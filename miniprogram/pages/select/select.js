const db=wx.cloud.database()
const domain = "http://xxxxx"; // xxxxx为自己公共url部分
Page({
  data: {
    select: false,
    select2:false,
    project_name: '项目名称',
    problem_name:'问题类型',
    projects: ['项目一','项目二','项目三','项目四'],
    problems:['问题1','问题2','其他'],
    tempFilePaths: '',
    radioId:"",
    leader_name:'',
    hideAdd: false, // 是否隐藏添加图片的图标
    upload: [], // 上传的图(url)
    chooseImgs: [], // 用户选择上传的图片(缩略图)
  },
  formSubmit(res){
    wx:wx.showLoading({
      title: '提交中..',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    console.log(res)
    var {grade,leader_name,problem_detail,problem_name,project_name}=res.detail.value;
    db.collection("problem-list").add({
      data:{
        grade:grade,
        leader_name:leader_name,
        problem_detail:problem_detail,
        problem_name:problem_name,
        project_name:project_name
      }
    }).then(res=>{
      wx.hideLoading({
      success: (res) => {},
      
    })
    wx.navigateBack({
      delta: 1
    })
    })

  },
  updataRadio:function(e){
    var Id=e.value.id
    this.setData({
    radioId:Id
    })
    },

  bindShowMsg() {
    this.setData({
      select: !this.data.select,
    })
  },
  bindShowMsg2() {
    this.setData({
      select2: !this.data.select2,
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      project_name: name,
      select: false
    })
    if(name=="项目一"){
      this.setData({
        leader_name:"负责人1"
      })         
    }
    if(name=="项目二"){
      this.setData({
        leader_name:"负责人2"
      })         
    }
    if(name=='项目三'){
      this.setData({
        leader_name:"负责人3"
      })         
    }   
    if(name=='项目四'){
      this.setData({
        leader_name:"负责人4"
      })         
    }   
  },
  mySelect2(e) {
    console.log(e)
    var name= e.currentTarget.dataset.name
    this.setData({
      problem_name: name,
      select2: false
    })
  },
  onPullDownRefresh: function() {

   },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  onLoad: function () { 
  }, 
   /* ================== 多图上传 ================== */
   uploadImgs: function () {
    const that = this;
    const {chooseImgs} = this.data;
    wx.chooseImage({
        count: 9 - chooseImgs.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            const newChooseImgs = res.tempFilePaths;//临时地址数组
            const imgInfo = res.tempFiles;
            var fileName=Date.now();
            // 判断选择的图片是否符合要求
            for (let i = 0; i < imgInfo.length; i++) {
               
                console.log("尺寸", imgInfo[i].size);
               
                if (imgInfo[i].size / 1024 / 1024 >= 10) {
                    wx.showModal({
                        title: '提示', // 标题
                        content: "图片超过10MB啦~",// 内容
                        showCancel: false, // 是否显示取消按钮
                        confirmText: '确定', // 确认按钮的文字
                    });
                    return
                }
               
                const imgSplit = imgInfo[i].path.split(".");
                const imgSLen = imgSplit.length;
                // console.log("格式", imgSplit, imgSLen, imgSLen - 1);
                if (["jpg", "jpeg", "png"].includes(imgSplit[imgSLen - 1])) {   
                    console.log("格式正确");
                } else {
                    console.log("格式错误");
                    utils.showModalInfo({
                        content: "请选择正确的图片格式上传",
                    });
                    return
                }
            }

            console.log("选择图片之前", res, chooseImgs, newChooseImgs);
            newChooseImgs.forEach(item => {
                chooseImgs.push(item);
            });
            // console.log("选择图片后", chooseImgs, newChooseImgs);
            // 限制上传数量
            if (chooseImgs.length > 9) {
                wx.showModal({
                    title: '提示',
                    content: "请选择正确的图片格式上传",
                    showCancel: false,
                    confirmText: '确定',
                });
            }

            // 判断是否显示添加图片
            console.log("显示添加图片", chooseImgs.length);
            if (chooseImgs.length > 0) {
                //图如果满了9张，不显示加图
                if (chooseImgs.length >= 9) {
                    that.setData({
                        hideAdd: true
                    })
                } else {
                    that.setData({
                        hideAdd: false
                    })
                }

                // 显示预览图
                that.setData({
                    chooseImgs
                });

                //  网络请求 上传图片

                // const requestMsg = [];
                newChooseImgs.forEach((item,idx)=> {
                  fileName=fileName+"_"+idx;
                  wx.cloud.uploadFile({
                    cloudPath:fileName+".jpg",
                    filePath:item
                  }).then(res=>{
                    console.log(res.fileID)
                    
                  })
                    // wx.uploadFile({
                    //     url: domain + '/xxxxx', // xxxxx为上传图片的接口
                    //     filePath: item,
                    //     header: {
                    //         'content-type': 'multipart/form-data'
                    //     },
                    //     name: 'file',
                    //     formData: {
                    //         'isup': "2"
                    //     },
                    //     success: function (e) {
                    //         console.log("访问上传接口成功", e);
                    //         const data = JSON.parse(e.data);
                    //         //把每次选择的图push进数组
                    //         const upload = that.data.upload;
                    //         console.log("之前上传的图数组", upload, data);
                    //         upload.push({
                    //             img: data,
                    //             isShow: false,
                    //             requestMsg, // 上传返回信息代号
                    //         });
                    //         that.setData({
                    //             upload,
                    //         });
                    //     },
                    //     fail: function (e) {
                    //         console.log("访问接口失败", e);
                    //         wx.showToast({
                    //             title: "网络出错",
                    //             icon: 'none',
                    //             duration: 1000
                    //         });
                    //     },
                    // });
                });
               
            }
        }
    })

},

/* ================== 点击图片放大预览 ================== */
previewImg: function (e) {
    const contentImg = e.currentTarget.dataset.item;
    // console.log("点击图片放大预览", contentImg);
    wx.previewImage({
        current: contentImg, //当前图片地址
        urls: [contentImg], //所有要预览的图片的地址集合 数组形式
        success: function (res) {
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
    })
},

/* ================== 点击图片删除 ================== */
deleteImg: function (e) {
    const index = e.currentTarget.dataset.index;
    const {upload, chooseImgs} = this.data;
    upload.splice(index, 1);
    chooseImgs.splice(index, 1);
    // console.log("点击图片删除", index);
    this.setData({
        upload,
        chooseImgs,
        hideAdd: chooseImgs.length === 9, // 是否隐藏添加图片的图标
    })
},
})