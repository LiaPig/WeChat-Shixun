Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[
      {
        id: 1234,
        status: "已完成",
        products: [
          {
            id: 1,
            title: "卖萌猪崽",
            size:[
              {
                id: 1,
                name: "1kg",
                value: "1"
              },
              {
                id: 2,
                name: "A类",
                value: "A"
              }
            ],
            quantity: 2,
            price: 10.11
          },
          {
            id: 2,
            title: "大头猪崽",
            size: [
              {
                id: 1,
                name: "5kg",
                value: "5"
              },
              {
                id: 2,
                name: "B类",
                value: "B"
              }
            ],
            quantity: 1,
            price: 12.13
          },
          {
            id: 2,
            title: "大头猪崽",
            size: [
              {
                id: 1,
                name: "5kg",
                value: "5"
              },
              {
                id: 2,
                name: "B类",
                value: "B"
              }
            ],
            quantity: 1,
            price: 12.13
          },
        ],
        count: 99.99,
        time: "2017-9-21 16:18"
      },
      {
        id: 1234,
        status: "已完成",
        products: [
          {
            id: 1,
            title: "卖萌猪崽",
            size: [
              {
                id: 1,
                name: "1kg",
                value: "1"
              },
              {
                id: 2,
                name: "A类",
                value: "A"
              }
            ],
            quantity: 2,
            price: 10.11
          },
          {
            id: 2,
            title: "大头猪崽",
            size: [
              {
                id: 1,
                name: "5kg",
                value: "5"
              },
              {
                id: 2,
                name: "B类",
                value: "B"
              }
            ],
            quantity: 1,
            price: 12.13
          },
        ],
        count: 99.99,
        time: "2017-9-21 16:18"
      },
      {
        id: 1234,
        status: "已完成",
        products: [
          {
            id: 1,
            title: "卖萌猪崽",
            size: [
              {
                id: 1,
                name: "1kg",
                value: "1"
              },
              {
                id: 2,
                name: "A类",
                value: "A"
              },
              {
                id: 1,
                name: "1kg",
                value: "1"
              },
              {
                id: 2,
                name: "A类",
                value: "A"
              }
            ],
            quantity: 2,
            price: 10.11
          },
          {
            id: 2,
            title: "大头猪崽",
            size: [
              {
                id: 1,
                name: "5kg",
                value: "5"
              },
              {
                id: 2,
                name: "B类",
                value: "B"
              }
            ],
            quantity: 1,
            price: 12.13
          },
        ],
        count: 99.99,
        time: "2017-9-21 16:18"
      }
    ]
  },
  gogogo: function(){
    wx.navigateTo({
      url: '../test/test',
    })
  },

})