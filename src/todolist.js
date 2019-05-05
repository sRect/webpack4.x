import {
  observable,
  computed,
  autorun,
  action
} from 'mobx';

const ALL = 'all';
const COMPLETED = 'completed';
const UNCOMPLETED = 'uncompleted';


class TodoList {
  // 待办列表
  @observable itemList = [
    {
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

  constructor(itemList, itemContent, filterType) {
    this.itemList = itemList;
    this.itemContent = itemContent;
    this.filterType = filterType;
  }

  @computed filterItemList = (currentType) => {
    return this.filterType === ALL ? this.itemList : this.itemList.filter(item => item.isComplete === currentType);
  }

  @action.addItem addItem = () => {
    console.log(e);
  }
}