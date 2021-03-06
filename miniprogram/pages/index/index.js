const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    scorelist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.onQuery()
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
    this.onQuery()
    setTimeout(function(){wx.stopPullDownRefresh()},500)
    
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
  scoresort:function(obj){

    obj.sort(function(a,b){return b._score-a._score})
    for(var i=1;i<=obj.length;++i){
      obj[i-1]["_rank"]=i
      obj[i-1]["_style"]=this.icon(obj[i-1]["_group"])
    }
    return obj
  },
  onQuery: async function() {
    var reslist=[]
    const db=wx.cloud.database().collection('rank')
    const num = (await db.count()).total
    console.log(num)
    for(var i=0;i*20<num;++i){
      reslist=reslist.concat((await db.skip(i*20).get()).data)
      console.log(reslist)
    }
    this.setData({
      scorelist:this.scoresort(reslist)
    })
    // db.collection('rank').get({
    //   success: res => {
    //     this.setData({
    //       scorelist: this.scoresort(res.data)
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  icon:function(obj){
    if(obj==0)
      return "cuIcon-discoverfill text-blue"
    else if(obj==1)
      return "cuIcon-colorlens text-orange"
  }
})