const fetchData = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/chriscoyier/repos').then(res => {
      if (res.ok) {
        resolve(res.json())
      }
    }).catch(error => {
      reject(error);
    })
  })
};

(async function () {
  let [error, data] = await fetchData().then(res => [null, res]).catch(error => [error, null]);

  console.log(error);
  console.log(data);
})();


// 发布-订阅
// 初级版
const salesOffices = {};
salesOffices.clienList = []; // 缓存列表
salesOffices.listen = function (fn) { // 增加订阅者
  this.clienList.push(fn);
};
salesOffices.trigger = function () { // 发布消息
  for (let i = 0, len = this.clienList.length; i < len; i++) {
    let fn = this.clienList[i];
    fn.apply(this, arguments); // arguments为发布消息时带上的参数
  }
}

salesOffices.listen(function (price, squareMeter) { // 小明订阅消息
  console.log('价格= ' + price);
  console.log('squareMeter= ' + squareMeter);
});

salesOffices.listen(function (price, squareMeter) { // 小红订阅消息
  console.log('价格= ' + price);
  console.log('squareMeter= ' + squareMeter);
});

salesOffices.trigger(2000000, 88); // 输出：200 万，88 平方米
salesOffices.trigger(3000000, 110); // 输出：300 万，110 平方米


// 升级版-只订阅自己喜欢的内容
const salesOffices = {};
salesOffices.clienList = {}; // 缓存列表
salesOffices.listen = function (key, fn) {
  if (!this.clienList[key]) { // 如果还没有订阅此类消息，给该类消息创建一个缓存列表
    this.clienList[key] = [];
  }
  this.clienList[key].push(fn);
}

salesOffices.trigger = function () {
  let key = Array.prototype.shift.call(arguments), // 取出消息类型
    fns = this.clienList[key]; // 取出该消息对应的回调函数集合

  if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
    return false;
  }
  for (let i = 0, len = fns.length; i < len; i++) {
    fns[i].apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
  }
}

salesOffices.listen('squareMeter88', function (price) { // 小明订阅 88 平方米房子的消息
  console.log('价格= ' + price); // 输出： 2000000
});
salesOffices.listen('squareMeter110', function (price) { // 小红订阅 110 平方米房子的消息
  console.log('价格= ' + price); // 输出： 3000000
});
salesOffices.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格
salesOffices.trigger('squareMeter110', 3000000); // 发布 110 平方米房子的价格