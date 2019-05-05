import {
  observable,
  computed,
  autorun,
  action
} from 'mobx';

const ALL = 'all';
const COMPLETED = 'completed';
const UNCOMPLETED = 'uncompleted';

class Store {
  filterTree = {
    [COMPLETED]: true,
    [UNCOMPLETED]: false
  };

  // 待办列表
  @observable itemList = [];

  // 新建待办内容
  @observable itemContent = '';
  // 筛选类型
  @observable filterType = ALL;

  constructor(itemList, itemContent, filterType) {
    this.itemList = itemList;
    this.itemContent = itemContent;
    this.filterType = filterType;
  }

  @computed get filterItemList() {
    console.log("===========filterItemList")
    return this.filterType === ALL 
      ? this.itemList 
      : this.itemList.filter(item => item.isComplete === this.filterTree[this.filterType]);
  }

  @action.bound addItem() {
    console.log("==============add")
    this.itemList.push({
      id: 4,
      content: 'PUBG',
      isComplete: true
    })
  }
}

const store = new Store([{
    id: 1,
    content: '吃饭',
    isComplete: false
  },
  {
    id: 2,
    content: '睡觉',
    isComplete: false
  },
  {
    id: 3,
    content: '打豆豆',
    isComplete: true
  }
], '', ALL);

autorun(() => {
  // let itemList = document.querySelector("#itemList");
  // let str = "";

  // str = store.filterItemList.reduce(item => {
  //   console.log(item)
  //   return `<li> <span > ${item.content} < /span> <i > ${item.isComplete} < /i> <button data-id="${item.id}"> 删除 < /button> < /li>`;
  // }, '');
  // for (let i = 0, len = store.filterItemList.length; i < len; i++) {
  //   console.log(store.filterItemList[i])
  // }
  // console.log(store.filterItemList)

  // itemList.innerHTML = str;
})

class TodoList {
  constructor() {
    this.addBtn = document.querySelector("#addBtn");
  }

  handleAddItem() {
    this.addBtn.addEventListener("click", function() {
      store.addItem();
    })
  }

  init() {
    this.handleAddItem();
  }
}

const todoList = new TodoList();

todoList.init();