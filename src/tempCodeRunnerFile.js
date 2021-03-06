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