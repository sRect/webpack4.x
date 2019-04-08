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
// const salesOffices = {};
// salesOffices.clienList = []; // 缓存列表
// salesOffices.listen = function (fn) { // 增加订阅者
//   this.clienList.push(fn);
// };
// salesOffices.trigger = function () { // 发布消息
//   for (let i = 0, len = this.clienList.length; i < len; i++) {
//     let fn = this.clienList[i];
//     fn.apply(this, arguments); // arguments为发布消息时带上的参数
//   }
// }

// salesOffices.listen(function (price, squareMeter) { // 小明订阅消息
//   console.log('价格= ' + price);
//   console.log('squareMeter= ' + squareMeter);
// });

// salesOffices.listen(function (price, squareMeter) { // 小红订阅消息
//   console.log('价格= ' + price);
//   console.log('squareMeter= ' + squareMeter);
// });

// salesOffices.trigger(2000000, 88); // 输出：200 万，88 平方米
// salesOffices.trigger(3000000, 110); // 输出：300 万，110 平方米


// // 升级版-只订阅自己喜欢的内容
// const salesOffices = {};
// salesOffices.clienList = {}; // 缓存列表
// salesOffices.listen = function (key, fn) {
//   if (!this.clienList[key]) { // 如果还没有订阅此类消息，给该类消息创建一个缓存列表
//     this.clienList[key] = [];
//   }
//   this.clienList[key].push(fn);
// }

// salesOffices.trigger = function () {
//   let key = Array.prototype.shift.call(arguments), // 取出消息类型
//     fns = this.clienList[key]; // 取出该消息对应的回调函数集合

//   if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
//     return false;
//   }
//   for (let i = 0, len = fns.length; i < len; i++) {
//     fns[i].apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
//   }
// }

// salesOffices.listen('squareMeter88', function (price) { // 小明订阅 88 平方米房子的消息
//   console.log('价格= ' + price); // 输出： 2000000
// });
// salesOffices.listen('squareMeter110', function (price) { // 小红订阅 110 平方米房子的消息
//   console.log('价格= ' + price); // 输出： 3000000
// });
// salesOffices.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格
// salesOffices.trigger('squareMeter110', 3000000); // 发布 110 平方米房子的价格

// // 提取发布订阅功能 取消订阅功能
// const event = {
//   clienList: [],
//   listen: function (key, fn) { // 增加订阅
//     if (!this.clienList[key]) {
//       this.clienList[key] = [];
//     }
//     this.clienList[key].push(fn);
//   },
//   trigger: function () { // 发布消息
//     let key = Array.prototype.shift.call(arguments);
//     let fns = this.clienList[key];

//     if (!fns || fns.length === 0) {
//       return;
//     }

//     for (let i = 0, len = fns.length; i < len; i++) {
//       fns[i].apply(this, arguments); // arguments 是 trigger 时带上的参数
//     }
//   },
//   remove: function (key, fn) { // 取消订阅
//     let fns = this.clienList[key];

//     if (!fns) return; // 如果key对应的消息没有被人订阅，则直接返回
//     if (!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
//       fns && (fns.length = 0);
//     } else {
//       for (let l = fns.length - 1; l >= 0; l--) {
//         let _fn = fns[l];
//         if (_fn === fn) {
//           fns.splice(l, 1);
//         }
//       }
//     }
//   }
// };

// const installEvent = function (obj) {
//   // for (let i in event) {
//   //   obj[i] = event[i];
//   // }
//   return Object.create(obj)
// };

// // var salesOffices = {};
// // installEvent(salesOffices);
// let salesOffices = installEvent(event);
// salesOffices.listen('squareMeter88', fn1 = function (price) { // 小明订阅消息
//   console.log('价格= ' + price);
// });
// salesOffices.listen('squareMeter100', fn2 = function (price) { // 小红订阅消息
//   console.log('价格= ' + price);
// });

// salesOffices.remove('squareMeter100')
// salesOffices.trigger('squareMeter88', 2000000); // 输出：2000000
// salesOffices.trigger('squareMeter88', 1500000); // 输出：1500000
// salesOffices.trigger('squareMeter100', 3000000); // 输出：3000000
// // console.log(Object.getPrototypeOf(salesOffices) === event) // true
// // console.log(salesOffices.__proto__ === event) // true

// 全局的发布 － 订阅对象
const Event = (function () {
  let clienList = {},
    listen = null,
    trigger = null,
    remove = null;

  listen = function (key, fn) { // 添加
    if (!clienList[key]) {
      clienList[key] = [];
    }

    clienList[key].push(fn);
  };

  trigger = function () { // 发布
    let key = [...arguments].shift(),
      fns = clienList[key];
    if (!fns || fns.length === 0) return;

    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i].apply(this, arguments);
    }
  };

  remove = function (key, fn) { // 取消删除
    let fns = clienList[key];

    if (!fns) return; // 如果key对应的消息没有被人订阅，则直接返回
    if (!fn) { // 如果没有传入对应的fn,则要取消key对应消息的所有订阅
      fns && (fns.length = 0);
    } else {
      for (let l = 0, len = fns.length; l < len; l++) {
        if (fns[l] === fn) {
          fns.splice(l, 1);
          l--;
        }
      }
    }
  };

  return {
    listen,
    trigger,
    remove
  };
})();

Event.listen('squareMeter100', function (squareMeter, price) { // 小红订阅消息
  console.log(squareMeter + ' 价格= ' + price);
});

// Event.remove('squareMeter100')
Event.trigger('squareMeter100', 2000000); // 输出：2000000

let a = (function () {
  let count = 0;
  let btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    Event.trigger('add', count++);
  })
})();

let b = (function () {
  let show = document.querySelector("#show");
  Event.listen('add', (type, count) => {
    show.innerHTML = count;
  })
})();