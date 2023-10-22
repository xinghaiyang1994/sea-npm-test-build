import service, { IResponse } from '@/axios/index';

// 测试接口

interface IGetUserInfoRes {
  name: string;
  id: string;
}
export const getUserInfo = () => service.get<IResponse<IGetUserInfoRes>>('/user/detail');
