import {observable, computed, autorun} from 'mobx';

class Person {
  @observable name;
  @observable age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @computed get personInfo() {
    return `姓名：${this.name} 年龄：${this.age}`;
  }
}

const p = new Person('老王', 18);
// const greet = observable.box('个人信息==>');

const render = () => {
  document.querySelector("#mobx").innerText = p.personInfo;
}

// 动态更新dom内容
autorun(render);

document.querySelector("#changeBtn").addEventListener("click", () => {
  p.name = "隔壁老王";
})