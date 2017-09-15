Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购物车的数量
    count: 0,
    //购物车的总价
    sum: 0,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    hiddenmodalput: true,
    //当前导航页
    curNav: 1,
    //当前导航的索引
    curIndex: 0,
    //当前商品的索引
    curGoodIndex: 0,
    //弹窗要用的当前商品
    curGood: {},
    //商品
    goods:[
      {
        id: 1,
        title: "热销推荐",
        level: "level1",
        logoSrc: null,
        nodes: [
          {
            id: 1,
            title: "卖萌猪崽",
            level: "level2",
            logoSrc: "../../images/goods/1.png",
            description: "可爱的猪崽可爱的猪崽可爱的猪崽可爱的猪崽",
            price: "0.02",
            preOrder: 0,
            nodes: null,
            options: [
              {
                title: "体重",
                select: [
                  { name: '1kg', value: '1' },
                  { name: '2kg', value: '2', checked: 'true' },
                  { name: '3kg', value: '3' },
                  { name: '4kg', value: '4' },
                  { name: '5kg', value: '5' },
                  { name: '6kg', value: '6' }
                ]
              },
              {
                title: "种类",
                select: [
                  { name: 'A类', value: 'A', checked: 'true' },
                  { name: 'B类', value: 'B' },
                  { name: 'C类', value: 'C' }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "小黑猪崽",
            level: "level2",
            logoSrc: "../../images/goods/2.png",
            description: "黑色的猪崽",
            price: "0.01",
            preOrder: 0,
            nodes: null,
            options: [
              {
                title: "国家",
                select: [
                  { name: 'USA', value: '美国' },
                  { name: 'CHN', value: '中国', checked: 'true' },
                  { name: 'BRA', value: '巴西' },
                  { name: 'JPN', value: '日本' },
                  { name: 'ENG', value: '英国' },
                  { name: 'TUR', value: '法国' }
                ]
              },
              {
                title: "字母",
                select: [
                  { name: 'A', value: 'A', checked: 'true' },
                  { name: 'B', value: 'B' },
                  { name: 'C', value: 'C' }
                ]
              }
            ]
          }
        ] 
      },
      {
        id: 2,
        title: "单品区",
        level: "level1",
        logoSrc: null,
        nodes: [
          {
            id: 1,
            title: "卖萌猪崽",
            level: "level2",
            logoSrc: "../../images/goods/1.png",
            description: "可爱的猪崽可爱的猪崽可爱的猪崽可爱的猪崽",
            price: "0.02",
            preOrder: 0,
            nodes: null,
            options: [
              {
                title: "国家",
                select: [
                  { name: 'USA', value: '美国' },
                  { name: 'CHN', value: '中国', checked: 'true' },
                  { name: 'BRA', value: '巴西' },
                  { name: 'JPN', value: '日本' },
                  { name: 'ENG', value: '英国' },
                  { name: 'TUR', value: '法国' }
                ]
              },
              {
                title: "字母",
                select: [
                  { name: 'A', value: 'A', checked: 'true' },
                  { name: 'B', value: 'B' },
                  { name: 'C', value: 'C' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "双拼猪崽",
        level: "level1",
        logoSrc: null,
        nodes: [
          {
            id: 3,
            title: "普通黑白猪双拼",
            level: "level2",
            logoSrc: "../../images/goods/3.jpg",
            description: "一只黑的一只粉的",
            price: "0.03",
            preOrder: 0,
            nodes: null,
            options: [
              {
                title: "国家",
                select: [
                  { name: 'USA', value: '美国' },
                  { name: 'CHN', value: '中国', checked: 'true' },
                  { name: 'BRA', value: '巴西' },
                  { name: 'JPN', value: '日本' },
                  { name: 'ENG', value: '英国' },
                  { name: 'TUR', value: '法国' }
                ]
              },
              {
                title: "字母",
                select: [
                  { name: 'A', value: 'A', checked: 'true' },
                  { name: 'B', value: 'B' },
                  { name: 'C', value: 'C' }
                ]
              }
            ]
          },
          {
            id: 4,
            title: "浴帽可爱猪崽们",
            level: "level2",
            logoSrc: "../../images/goods/4.jpg",
            description: "刚洗完白白的香香猪",
            price: "0.05",
            preOrder: 0,
            nodes: null,
            options: [
              {
                title: "国家",
                select: [
                  { name: 'USA', value: '美国' },
                  { name: 'CHN', value: '中国', checked: 'true' },
                  { name: 'BRA', value: '巴西' },
                  { name: 'JPN', value: '日本' },
                  { name: 'ENG', value: '英国' },
                  { name: 'TUR', value: '法国' }
                ]
              },
              {
                title: "字母",
                select: [
                  { name: 'A', value: 'A', checked: 'true' },
                  { name: 'B', value: 'B' },
                  { name: 'C', value: 'C' }
                ]
              }
            ]
          }
        ]
       
      },
      {
        id: 4,
        title: "三拼猪崽",
        level: "level1",
        logoSrc: null,
        preOrder: 0,
        nodes: null
      }
    ]
  },

  //根据左边的分类切换对应的商品
  switchRightTab: function(e){
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  //点击“+”加号按钮
  addPreOrder: function (e){
    //第一步：获取当前商品的index,方便给弹窗引用
    const index = e.currentTarget.dataset.index;
    //第二步：获取当前将要预购的商品对象good,方便给弹窗引用
    const navIndex = this.data.curIndex;
    const goods = this.data.goods;
    let good = goods[navIndex].nodes[index];
    //第三步：存放好index与good，并把弹窗弄出来
    this.setData({
      curGoodIndex: index,
      curGood: good,
      hiddenmodalput: !this.data.hiddenmodalput
    });
    
  },

  //弹窗的： 取消按钮  
  cancel: function () {
    //关闭弹窗 
    this.setData({
      hiddenmodalput: true
    })
  },

  //弹窗的： 确认按钮  
  confirm: function () {
    // 获取具体商品的index，goods对象，当前nav的index,以及此时的商品good
    const index = this.data.curGoodIndex;
    let goods = this.data.goods;
    const navIndex = this.data.curIndex;
    const good = this.data.curGood;
    //增加1 再赋值回给goods对象
    let num = good.preOrder;
    num += 1;
    goods[navIndex].nodes[index].preOrder = num;
    //购物车的总量count加1,购物车的总价sum加上对应的price
    let count = this.data.count;
    count += 1;
    const sum_string = this.data.sum;
    const price = Number(goods[navIndex].nodes[index].price);  
    let sum = Number(sum_string) + price;
    sum = sum.toFixed(2);
    //关闭弹窗 
    this.setData({
      goods: goods,
      count: count,
      sum: sum,
      hiddenmodalput: true
    });
   
  },
    
  //点击“-”减号按钮
  reducePreOrder: function(e){
    // 获取具体商品的index，goods对象，当前nav的index
    const index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    const navIndex = this.data.curIndex;
    //减去1 再赋值回给goods对象
    let num = this.data.goods[navIndex].nodes[index].preOrder;
    num = num - 1;
    goods[navIndex].nodes[index].preOrder = num;
    //购物车的总量count减1,购物车的总价sum减去对应的price
    let count = this.data.count;
    count -= 1;
    const sum_string = this.data.sum;
    const price = Number(goods[navIndex].nodes[index].price);
    let sum = Number(sum_string) - price;
    sum = sum.toFixed(2);
    this.setData({
      goods: goods,
      count: count,
      sum: sum
    })
  }
})