import {observable, computed, autorun} from 'mobx';

let DEFAULT_NAME = "隔壁老王";
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

const p = new Person(DEFAULT_NAME, 18);
// const greet = observable.box('个人信息==>');

const render = () => {
  document.querySelector("#mobx").innerText = p.personInfo;
}

// 动态更新dom内容
autorun(render);

document.querySelector("#changeBtn").addEventListener("click", () => {
  p.name = DEFAULT_NAME.split("").reverse().join("");
  DEFAULT_NAME = p.name;
})