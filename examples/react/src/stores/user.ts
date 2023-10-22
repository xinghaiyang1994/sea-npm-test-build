import { makeAutoObservable } from 'mobx';

interface IUserInfo {
  name: string;
}

class User {
  constructor() {
    makeAutoObservable(this);
  }
  userInfo: IUserInfo | undefined;
  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }
}

export default new User();
