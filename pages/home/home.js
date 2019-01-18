Page({
  data:{
    domain:'https://www.cecai360.com',
    pageIndex:1,
    pageSize:10,
    pageCount:0
  },
  onReady:function(){
    this.getslides();
    this.getnotices();
    this.gettypes();
    this.getgoods(1);
  },
  onPullDownRefresh(){
    this.getgoods(1);
    wx.stopPullDownRefresh();
  },
  onReachBottom(){
    let pageCount=this.data.pageCount;
    let pageIndex=this.data.pageIndex;
    if(pageIndex<=pageCount)
    {
      this.getgoods(pageIndex);
      pageIndex++;
    }
  },
  getslides:function(){
    let page=this;
    wx.request({
      url: page.data.domain+'/api/slide/list',
      method:'post',
      success:function(res){
        page.setData({
          slides:res.data.data
        });
      },
      fail:function(){
        console.log("error");
      }
    })
  },
  getnotices:function(){
    let page = this;
    wx.request({
      url: page.data.domain + '/api/notice/list',
      method: 'post',
      success: function (res) {
        page.setData({
          notices: res.data.data
        });
      },
      fail: function () {
        console.log("error");
      }
    })
  },
  gettypes:function(){
    let page = this;
    wx.request({
      url: page.data.domain + '/api/goodstype/list',
      method: 'post',
      success: function (res) {
        page.setData({
          types: res.data.data
        });
      },
      fail: function () {
        console.log("error");
      }
    })
  },
  getgoods:function(pageIndex){
    let page = this;
    wx.request({
      url: page.data.domain + '/api/goods/list',
      method: 'post',
      data:{
        pageIndex: pageIndex,
        pageSize:page.data.pageSize
      },
      success: function (res) {
        page.setData({
          goods: res.data.data.goods,
          pageCount:res.data.data.pageCount
        });
      },
      fail: function () {
        console.log("error");
      }
    })
  }
});