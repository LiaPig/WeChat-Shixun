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
    //hiddenmodalput: true,
    hiddenSelectModal: true,
    //当前导航页
    curNav: 1,
    //当前导航的索引
    curIndex: 0,
    //当前商品的索引
    curGoodIndex: 0,
    //弹窗要用的当前商品
    curGood: null,
    //商品的标签
    good_size: [],
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
            quantity: 1,
            nodes: null,
            size: [],
            options: [
              {
                id: 1,
                title: "体重",
                select: [
                  { name: '1kg', value: '1', checked: 'true' },
                  { name: '2kg', value: '2' },
                  { name: '3kg', value: '3' },
                  { name: '4kg', value: '4' },
                  { name: '5kg', value: '5' },
                ]
              },
              {
                id: 2,
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
            quantity: 1,
            nodes: null,
            options: null
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
    ],
    //是否显示具体购物车弹窗
    showCartModalStatus: false,
    //购物车弹窗的高度
    scrollHeight: 150,
    //购物车里的内容
    cartObjects: [],
    size:[]
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
    //第一步： 获取到当前商品对象good
    const that = this;
    const index = e.currentTarget.dataset.index;
    const navIndex = that.data.curIndex;
    const goods = that.data.goods;
    let good = goods[navIndex].nodes[index];
    //第二步： 获取标签的默认值
    const options = good.options;
    let size = [];
    if(options){
      for (let i = 0; i < options.length; i++) {
        let select = {
          id: null,
          title: null,
          name: null,
          value: null
        };
        select.id = options[i].id;
        select.title = options[i].title;
        const selects = options[i].select;
        for (let j = 0; j < selects.length; j++) {
          if (selects[j].checked) {
            const name = selects[j].name;
            const value = selects[j].value;
            select.name = name;
            select.value = value;
            size.push(select);
          }
        }
      }
    }
    //第三步： 存放好index、good与size以方便给弹窗使用，
    //第四步： 开启显示弹窗  
    that.setData({
      curGoodIndex: index,
      curGood: good,
      size:size,
      hiddenSelectModal: false
    });
  },

  //点击“-”减号按钮
  reducePreOrder: function (e) {
    //第一步： 获取到当前商品对象good,以及商品的标签
    const that = this;
    const index = e.currentTarget.dataset.index;
    const navIndex = that.data.curIndex;
    const goods = that.data.goods;
    let good = goods[navIndex].nodes[index];
    const options = good.options;
    //第二步： 判断商品是否有标签
    //如果没有,直接数量减去1
    if (!options) {
      //1.商品good的数量减去1
      good.preOrder -= 1;
      //2.购物车的商品总量count减1，
      //3.购物车的总价sum减去对应的price
      let count = that.data.count;
      count--;
      const sum_string = that.data.sum;
      const price = Number(good.price);
      let sum = Number(sum_string) - price;
      sum = sum.toFixed(2);
      //4.判断这个对象的数量是否为1
      let cartObjects = that.data.cartObjects;
      let curGood = cartObjects.find(o => o.id === good.id); 
      let curIndex = cartObjects.findIndex(o => o.id === good.id);
      console.log(curGood)
      //4.如果等于1，把这个对象从购物车中移除
      if (curGood.quantity === 1){
        cartObjects.splice(curGood);
      }
      //4.如果不等于1，数量减1
      else {
        cartObjects[curIndex].quantity--;
      }
      //5.把good赋值给回goods,数据更新
      goods[navIndex].nodes[index] = good;
      this.setData({
        cartObjects: cartObjects,
        goods: goods,
        count: count,
        sum: sum
      })
    }
    //如果有，提示不能操作
    else {
      wx.showModal({
        title: '提示',
        content: '含有规格的商品只能在购物车里删减',
        showCancel: false
      })
    }
  },


  // 点击select切换
  swiperChange: function (e) {
    //第一步： 获取当前商品对象curGood,当前标签（规格）对象size
    const that = this;
    let curGood = that.data.curGood;
    let curSize = e.currentTarget.dataset;   
    //第二步: 设置当前size对象的checked值本来为true的改为false,当前的为true
    let curOption = curGood.options.find(o => o.id === curSize.id);
    for (let i = 0; i < curOption.select.length; i++){
      //checked值原本为true的改为false
      if (curOption.select[i].checked){
        curOption.select[i].checked = false;
      }
      //当前size对象的checked和curGood中对应的改为true
      if (curOption.select[i].name === curSize.name){
        curOption.select[i].checked = true;
        curSize.checked = true;
      }
    }
    //第三步： 把修改的覆盖在封装的size对象，如果没修改就不覆盖
    let size = that.data.size;
    for (let i = 0; i < size.length; i++){
      if (curSize.id === size[i].id){
        size[i] = curSize;
      }
    }   
    //第三步： 存储数据
    this.setData({
      curGood: curGood,
      size: size
    })
  },

  //弹窗的： 取消按钮  
  hideSelectModal: function () {
    //第一步： 清空在点击“+”的时候封装的curGood和size对象，
    //第二步： 关闭弹窗
    this.setData({
      curGood: null,
      size: null,
      hiddenSelectModal: true
    });
  },

  //弹窗的： 确认按钮  
  confirm: function (e) {
    // 第一步： 获取具体商品的index，goods对象，当前nav的index,以获得此时的商品对象good
    const that = this;
    const index = that.data.curGoodIndex;
    const navIndex = that.data.curIndex;
    let goods = this.data.goods;
    let good = goods[navIndex].nodes[index];
    //第二步： 获取封装的当前商品对象curGood
    let curGood = this.data.curGood;
    //第三步： 将选取的标签（规则）对象size存进curGood对象里
    curGood.size = this.data.size;
    const size = null;
    //第四步： 商品数量增加1
    good.preOrder++;
    //第五步： 购物车的总量count加1,购物车的总价sum加上对应的price
    let count = this.data.count;
    count ++;
    const sum_string = this.data.sum;
    const price = Number(good.price);  
    let sum = Number(sum_string) + price;
    sum = sum.toFixed(2);
    //第六步： 将当前商品加入到购物车中
    let cartObjects = this.data.cartObjects;  
    //1.判断购物车不为空
    if(cartObjects.length){
      //2.判断商品是否有标签（规格）
      if(curGood.size.length){
        //3.判断购物车是否已经拥有了这个商品
        let flag = 0;
        for (let i = 0; i < cartObjects.length; i++) {
          //3.如果没有：
          if (cartObjects[i].id !== curGood.id) {
            continue;
          }
          //3.如果有：
          else {
            let flag_equal = 0;
            let cartObjectes_size_length = cartObjects[i].size.length;
            //4.判断这个商品的标签（规格）是否都一样
            for (let j = 0; j < cartObjectes_size_length; j++) {
              //4.存在id一样的标签 且 标签的value相等            
              if (cartObjects[i].size[j].id === curGood.size[j].id && cartObjects[i].size[j].value === curGood.size[j].value) {
                flag_equal++;
              }
            }
            //5.全部标签都相等
            if (flag_equal === cartObjectes_size_length) {
              cartObjects[i].quantity += 1;
              flag = 1;
              break;
            }
          }
        } 
        //循环了所有购物车的对象都没有找到相同标签（规格）的，才加入到购物车！
        if (flag === 0) {
          cartObjects.push(curGood);
        }
      }
      //2.商品没有标签(规格)
      else{
        //3.是否已经有了这个商品
        let obj = cartObjects.find(o => o.id === curGood.id);
        let obj_index = cartObjects.findIndex(o => o.id === curGood.id);
        //3.如果有
        if (obj) {
          obj.quantity++; 
          cartObjects[obj_index] = obj;
        }
        //3.如果没
        else{
          cartObjects.push(curGood);
        }     
      }
    }
    //1.购物车为空， 直接添加
    else {
      cartObjects.push(curGood);
    }
    //第七步： 储存值，关闭弹窗 
    this.setData({
      size: size,
      cartObjects: cartObjects,
      goods: goods,
      count: count,
      sum: sum,
      hiddenSelectModal: true
    });
  },
    
  
  

  //点击了遮蔽层，隐藏Modal
  hideCartModal: function(){
    this.setData({
      showCartModalStatus: false
    })
  },

  //点击触发显示具体购物车Modal
  showCartModal: function(){  
    //第一步： 获取存放在购物车的商品的对象cartObjects
    const cartObjects = this.data.cartObjects;
    //第二步： 计算商品的数量，设定浮窗的高度
    let scrollHeight;
    if(cartObjects.length >= 3){
      scrollHeight = 450;
    } else {
      scrollHeight = cartObjects.length * 150;
    }
    //第三步: 显示购物车弹窗
    this.setData({
      scrollHeight: scrollHeight,
      showCartModalStatus: !this.data.showCartModalStatus,
    }) 
  },

})