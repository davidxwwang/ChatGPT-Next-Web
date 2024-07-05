export interface User {
  id?: number;
  openid: string;
  unionid: string;
  nickname: string;
  headimgurl: string;
  token_infos: string;
  user_level: string;
  extras: string;
  created_at?: Date;
  updated_at?: Date;
}

export enum UserLevel {
  TOURIST = "tourist", // 未注册
  COMMON = "common", // 登录未付费
  VIP = "vip", // 登录且付费
}
