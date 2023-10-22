import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

// TODO
/** 定义的后端返回结构 */
export interface IResponse<T> {
  code: number;
  data: T | null;
  message: string;
}

// 前端直接调用后端服务的请求封装

interface IRequestConfig extends AxiosRequestConfig {
  /** 控制是否隐藏错误的 message.error */
  isSilence?: boolean;
}

/** 自定义错误类型 */
interface ApiError extends Error {
  // http status
  code?: number;
  url?: string;
}

// 实例化
const api = axios.create({
  // TODO 自定义
  baseURL: '/api/',
  withCredentials: true,
});

/** 生成统一 error 对象 */
const throwError = <T>(response: AxiosResponse<T>) => {
  const { data } = response;
  const error: ApiError = new Error(data?.toString());
  throw error;
};

type THandleRequest = <T>(fn: Promise<AxiosResponse<T>>, config?: IRequestConfig) => Promise<T>;

/**
 * 请求处理函数
 * @param fn 对应service的方法，返回的是一个promise
 * @returns 返回处理后的数据，接口成功的情况下，只返回{code, data, message}中的data，
 * 接口返回非成功状态码的情况下，返回一个error对象，error.data是对应的{code, data, message}中的data，
 */
const baseHandleRequest: THandleRequest = async <T>(fn: Promise<AxiosResponse<T>>, config?: IRequestConfig): Promise<T> => {
  const { isSilence = false, responseType } = config ?? {};
  try {
    const response = await Promise.resolve(fn);
    const { data } = response;

    // 直接返回二进制
    if (responseType === 'arraybuffer') {
      return data as unknown as T;
    }

    if (response?.status === 200) {
      // 这里可以根据业务需求自行决定是否返回 data.data
      return data;
    }

    return throwError(response);
  } catch (e) {
    const err = e as ApiError;
    // 报错统一提示
    if (!isSilence) {
      // TODO 这里需要根据业务需求来看是否统一展示报错提示, 类似 antd 的 message.error
      console.log('==>报错统一提示', err.message);
    }
    console.log('==>clientApi', err.code, err.message);
    throw err;
  }
};

/**
 * request工厂函数,传递 axios 的实例和请求处理函数
 */
export function requestFactory<IRequestConfig extends AxiosRequestConfig>(
  axios: AxiosInstance,
  handleRequest: <T>(fn: Promise<AxiosResponse<T>>, config?: IRequestConfig) => Promise<T>
) {
  return {
    get: <T>(url: string, config?: IRequestConfig): Promise<T> => handleRequest<T>(axios.get(url, config), config),
    post: <T>(url: string, data?: any, config?: IRequestConfig): Promise<T> => handleRequest<T>(axios.post(url, data, config), config),
    upload: <T>(url: string, data?: FormData, config?: IRequestConfig): Promise<T> => handleRequest<T>(axios.post(url, data, config), config),
  };
}

const request = requestFactory(api, baseHandleRequest);
export default request;
