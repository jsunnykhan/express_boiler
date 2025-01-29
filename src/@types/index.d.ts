export type APIResponse<T> = {
  message: string;
  code: number;
  data?: T;
};
