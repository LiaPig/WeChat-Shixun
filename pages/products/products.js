const datou = getApp().globalData.datou;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品分类对象
    productCategory: null,
    //当前导航页
    curNav: 1,
    //当前导航的索引
    index: null,
    //商品
    products: null,
    //弹窗要用到的当前商品的索引
    curProductIndex: 0,
    //弹窗要用的当前商品
    curProduct: null,
    //弹窗要用到的当前商品的属性标签
    curProductTags: [],
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    //hiddenmodalput: true,
    hiddenSelectModal: true,
    //购物车的数量
    count: 0,
    //购物车的总价
    sum: 0,
    //是否显示具体购物车弹窗
    showCartModalStatus: false,
    //购物车弹窗的高度
    scrollHeight: 150,
    //购物车里的内容
    cartObjects: []
    
    
  },

  onLoad: function () {
    const that = this;
    //第一步：获取商品分类
    wx.request({
      url: datou + "/api/tags?type=productCategory",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //自己组装一个e对象来复用switchRightTab函数,使得商品能加载出来
        const e = {
          target: {
            dataset: {
              id: res.data.data.content[0].id,
              index: 0
            }
          }
        }
        that.switchRightTab(e);
        
        that.setData({
          productCategory: res.data.data.content,
        }) 
        that.getAllProducts();
      }
    }) 
    
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

  // 获取所有商品
  getAllProducts: function(){
    const that = this;
    let productCategory = that.data.productCategory;
    let products = productCategory;
    //遍历所有商品标签分类，根据分类id来找出所有在当前分类标签的商品
    for (let i = 0; i < products.length; i++) {
      products[i].nodes = [];
      wx.request({
        url: datou + "/api/products/tag/" + products[i].id,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          for (let item of res.data.data.content){
            item.quantity = 0;
            products[i].nodes.push(item);
          }
          that.setData({
            products: products
          })
        }
      }) 
    }
  },

  //点击“+”加号按钮
  add: function (e){
    //第一步： 获取到当前商品对象product
    const that = this;
    const index = e.currentTarget.dataset.index;
    const navIndex = that.data.curIndex;
    const products = that.data.products;
    let product = products[navIndex].nodes[index];
    //第二步： 获取标签的默认值
    const productTags = product.productTags;
    let curProductTags = [];
    if (productTags) {
      for (let i = 0; i < productTags.length; i++) {
        //如果是商品属性标签才执行
        if (productTags[i].type === "product"){
          let select = {
            id: null,
            name: null,
            optionName: null,
            value: null,
          };
          //设置id、name、
          select.id = productTags[i].id;
          select.name = productTags[i].name;
          const selects = productTags[i].tagOptions;
          //第一个属性标签就为默认值，添加默认样式
          select.optionName = selects[0].optionName;
          select.value = selects[0].value;
          selects[0].checked = true;
          //全部设置好了之后加入到curProductTags中,组装好了默认的标签
          curProductTags.push(select);  
        }
      }
      //过滤掉只留下标签为商品属性标签,给这些标签的第一个值加上默认样式
      product.productTags = productTags.filter(o => o.type !== "productCategory");  
    }
    //第三步： 存放好index、product与curProductTags以方便给弹窗使用，
    //第四步： 开启显示弹窗  
    that.setData({
      curIndex: navIndex,
      curProductIndex: index,
      curProduct: product,
      curProductTags: curProductTags,
      hiddenSelectModal: false
    });
  },

  //点击“-”减号按钮
  reduce: function (e) {
    //第一步： 获取到当前商品对象product,以及商品的标签
    const that = this;
    const index = e.currentTarget.dataset.index;
    const navIndex = that.data.curIndex;
    const products = that.data.products;
    let product = products[navIndex].nodes[index];
    const productTags = product.productTags;
    let cartObjects = that.data.cartObjects;
    //第二步： 判断商品是否有标签
    //如果没有,直接数量减去1
    if (productTags.length === 0) {
      //1.商品good的数量减去1
      product.quantity--;
      //2.购物车的商品总量count减1，
      //3.购物车的总价sum减去对应的price
      let count = that.data.count;
      count--;
      const sum_string = that.data.sum;
      const price = Number(product.basePrice);
      let sum = Number(sum_string) - price;
      sum = sum.toFixed(2);
      //4.判断这个对象的数量是否为1
      let curProduct = cartObjects.find(o => o.id === product.id); 
      let curIndex = cartObjects.findIndex(o => o.id === product.id);
      //4.如果等于1，把这个对象从购物车中移除
      if (curProduct.quantity === 1){
        cartObjects.pop(curProduct);
      }
      //4.如果不等于1，数量减1
      else {
        cartObjects[curIndex].quantity--;
      }
      //5.把good赋值给回goods,数据更新
      
      products[navIndex].nodes[index] = product;
      this.setData({
        cartObjects: cartObjects,
        products: products,
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
    //第一步： 获取当前商品对象curProduct,当前更改了值的标签（规格）对象productTags，包含当前商品的所有标签信息的对象curProductTags
    const that = this;
    let curProduct = that.data.curProduct;
    let productTag = e.currentTarget.dataset; 
    let curProductTags = that.data.curProductTags; 
    //第二步: 设置当前curProductTags对象中checked值本来为true的改为false,当前的为true的改为false
    let tag = curProduct.productTags.find(o => o.id === productTag.id);
    for (let i = 0; i < tag.tagOptions.length; i++){
      //checked值原本为true的改为false
      if (tag.tagOptions[i].checked){
        tag.tagOptions[i].checked = false;
      }
      //当前curOption对象的checked和curGood中对应的改为true
      //productTag.optionname正确optionName错误，这是data-的bug
      if (tag.tagOptions[i].optionName === productTag.optionname){
        tag.tagOptions[i].checked = true;
      }
    }
    //第三步： 把修改的覆盖在封装的curProductTags对象里，如果没修改就不覆盖
    for (let i = 0; i < curProductTags.length; i++){
       if (curProductTags[i].id === productTag.id){
        curProductTags[i].id = productTag.id;
        curProductTags[i].name = productTag.name;
        curProductTags[i].optionName = productTag.optionname;
        curProductTags[i].value = productTag.value;
      }
    }   
   curProduct.quantity = 1;
    //第三步： 存储数据
    this.setData({
      curProduct: curProduct,
      curProductTags: curProductTags
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
  confirm: function () {
    // 第一步： 获取具体商品的index，products对象，当前nav的index,以获得此时的商品对象product
    const that = this;
    const index = that.data.curProductIndex;
    const navIndex = that.data.curIndex;
    let products = that.data.products;
    let product = products[navIndex].nodes[index];
    //第二步： 获取封装的当前商品对象curProduct
    let curProduct = that.data.curProduct;
    //第三步： 将选取的标签（规则）对象size存进curProduct对象里
    curProduct.productTags = this.data.curProductTags;
    //第四步： 商品数量增加1
    product.quantity++;
    //第五步： 购物车的总量count加1,购物车的总价sum加上对应的price
    let count = that.data.count;
    count ++;
    const sum_string = that.data.sum;
    const price = Number(product.basePrice);  
    let sum = Number(sum_string) + price;
    sum = sum.toFixed(2);
    //第六步： 将当前商品加入到购物车中
    let cartObjects = this.data.cartObjects;  
    //1.判断购物车不为空
    if(cartObjects.length){     
      //2.判断商品是否有标签（规格）
      if(curProduct.productTags.length){
        //3.判断购物车是否已经拥有了这个商品
        let flag = 0;
        for (let i = 0; i < cartObjects.length; i++) {
          //3.如果没有：
          if (cartObjects[i].id !== curProduct.id) {
            continue;
          }
          //3.如果有：
          else {
            let flag_equal = 0;
            //4.判断这个商品的标签（规格）是否都一样
            for (let j = 0; j < cartObjects[i].productTags.length; j++) {
              //4.存在id一样的标签 且 标签的value相等      
              if (cartObjects[i].productTags[j].id === curProduct.productTags[j].id && cartObjects[i].productTags[j].optionName === curProduct.productTags[j].optionName) {
                flag_equal++;
              }
            }
            //5.全部标签都相等
            if (flag_equal === cartObjects[i].productTags.length) {
              cartObjects[i].quantity += 1;
              flag = 1;
              break;
            }
          }
        } 
        //循环了所有购物车的对象都没有找到相同标签（规格）的，才加入到购物车！
        if (flag === 0) {    
          curProduct.quantity = 1;
          cartObjects.push(curProduct);
        }
      }
      //2.商品没有标签(规格)
      else{
        //3.是否已经有了这个商品
        let obj = cartObjects.find(o => o.id === curProduct.id);
        let obj_index = cartObjects.findIndex(o => o.id === curProduct.id);
        //3.如果有
        if (obj) {
          cartObjects[obj_index].quantity++;
        }
        //3.如果没
        else{
          curProduct.quantity++;
          cartObjects.push(curProduct);
        }     
      }
    }
    //1.购物车为空， 直接添加
    else {
      curProduct.quantity = 1;
      cartObjects.push(curProduct);
    }
   
    //第七步： 储存值，关闭弹窗 
    this.setData({
      curProductTages: null,
      curProduct: null,
      cartObjects: cartObjects,
      products: products,
      count: count,
      sum: sum,
      hiddenSelectModal: true
    });
    console.log(cartObjects)
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

  //购物车里的商品：点击“+”
  addQuantity: function(e){
    //第一步： 获取在购物车中的当前商品
    const that = this;
    const index = e.currentTarget.dataset.index;
    const navIndex = that.data.curIndex;
    let products = that.data.products;
    let cartObjects = that.data.cartObjects;
    //第二步： 当前商品的数量加1
    cartObjects[index].quantity++;
    products[navIndex].nodes[index].quantity++;
    //第三步： 购物车的总价钱count和总数量sum加上对应的
    let count = this.data.count;
    count++;
    const sum_string = this.data.sum;
    const price = Number(cartObjects[index].basePrice);
    let sum = Number(sum_string) + price;
    sum = sum.toFixed(2);
    //第四步： 更新数据
    this.setData({
      products: products,
      cartObjects: cartObjects,
      count: count,
      sum: sum
    }) 
  },

  // //购物车里的商品：点击“-”
  reduceQuantity: function (e) {
    //第一步： 获取在购物车中的当前商品
    const that = this;
    const index = e.currentTarget.dataset.index
    const navIndex = that.data.curIndex;
    let products = that.data.products;
    let cartObjects = that.data.cartObjects;
    //第二步： 购物车的总价钱count和总数量sum加上对应的
    products[navIndex].nodes[index].quantity--;
    let count = this.data.count;
    count--;
    const sum_string = this.data.sum;
    const price = Number(cartObjects[index].basePrice);
    let sum = Number(sum_string) - price;
    sum = sum.toFixed(2);
    //第三步： 判断当前商品的数量是否为1
    //如果是，
    if (cartObjects[index].quantity === 1){
      //1.把当前商品对象从购物车中移出
      cartObjects.pop(cartObjects[index]);
      //2.修改滚动的高度
      let scrollHeight;
      if (cartObjects.length >= 3) {
        scrollHeight = 450;
      } else {
        scrollHeight = cartObjects.length * 150;
      }
      //3.更新数据
      this.setData({
        scrollHeight: scrollHeight
      })
    }
    //如果不是，
    else{
      //1.当前商品的数量减1
      cartObjects[index].quantity--;
    }
    //第四步： 判断购物车是否空了
    //如果是空了，
    if(!cartObjects.length ){
      this.setData({
        showCartModalStatus: false,
      })
    }
    //第五步： 更新数据
    this.setData({
      products: products,
      count: count,
      sum: sum,
      cartObjects: cartObjects
    })
  },

  //清空购物车
  deleteAll: function(){
    const that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定要清空购物车吗？',
      success: function (res) {
        if (res.confirm) {
          let cartObjects = that.data.cartObjects;
          const curIndex = that.data.curIndex;
          let products = that.data.products;
          for(let i = 0; i < cartObjects.length; i++){
            const index = products[curIndex].nodes.findIndex(o => o.id === cartObjects[i].id);
            products[curIndex].nodes[index].quantity = 0;
          }
          that.setData({ 
            products: products,
            count: 0,
            sum: 0,
            cartObjects: null,
            showCartModalStatus: false
          })
        }
      }
    })
  },

  //点击“选好了”跳转到支付页面
  goToPay: function(){
    const that = this;
    const cartObjects = that.data.cartObjects;
    wx.navigateTo({
      url: '../to-pay/to-pay?cartObjects='  + JSON.stringify(cartObjects) ,
    })
  }
})