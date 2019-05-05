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
  @observable itemList = [{
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
  ];

  // 新建待办内容
  @observable itemContent = '';
  // 筛选类型
  @observable filterType = ALL;

  // constructor(itemList, itemContent, filterType) {
  //   this.itemList = itemList;
  //   this.itemContent = itemContent;
  //   this.filterType = filterType;
  // }

  @computed get filterItemList() {
    console.log("filterItemList-----")
    console.log(this.itemList)
    return this.filterType === ALL 
      ? this.itemList 
      : this.itemList.filter(item => item.isComplete === this.filterTree[this.filterType]);
  }

  @action.bound addItem() { // 添加事件
    this.itemList.push({
      id: new Date().getTime(),
      content: this.itemContent,
      isComplete: false
    });
    this.itemContent = '';
  }
  
  @action.bound inputChange(e) { // 输入框事件
    this.itemContent = e.target.value;
  }

  @action.bound removeItem(ID) { // 删除事件
    let copyList = JSON.parse(JSON.stringify(this.itemList));
    // this.itemList = this.itemList.filter(item => {
    //   return item.id !== ID;
    // })
    for (let i = 0, len = copyList.length; i < len; i++) {
      if (copyList[i].id === ID) {
        copyList.splice(i, 1);
        i--;
      }
    }

    this.itemList = copyList;

    console.log("removeItem-----")
    console.log(this.itemList)
  }
}

const store = new Store();

autorun(() => {
  console.log("autorun-----")
  console.log(store.filterItemList)
  let itemList = document.querySelector("#itemList");
  let str = "";

  for (let i = 0, len = store.filterItemList.length; i < len; i++) {
    str += `<li> 
      <span> ${store.filterItemList[i].content} </span> 
      <i> ${store.filterItemList[i].isComplete} </i> 
      <button data-id="${store.filterItemList[i].id}"> 删除 </button> 
    </li>`;
  }

  itemList.innerHTML = str;
})

class TodoList {
  constructor() {
    this.addBtn = document.querySelector("#addBtn");
    this.todoInput = document.querySelector("#todoInput");
    this.itemList = document.querySelector("#itemList");
  }

  handleAddItem() {
    this.addBtn.addEventListener("click", function() {
      store.addItem();
    })
  }

  handleInputChange() {
    this.todoInput.addEventListener("input", (e) => {
      store.inputChange(e);
    })
  }

  handleRemoveItem() {
    this.itemList.addEventListener("click", e => {
      if(e.target.nodeName.toLowerCase() === "button") {
        let id = e.target.dataset["id"];
        store.removeItem(id);
      }
    })
  }

  init() {
    this.handleAddItem();
    this.handleInputChange();
    this.handleRemoveItem();
  }
}

const todoList = new TodoList();

todoList.init();