export type APIResponse<T> = {
  message: string;
  code: number;
  data?: T;
};

export type DockerContainerInfo = {
  VIDEO_URL: string;
  TOKEN: string;
};

export type FileUploadResponse = {
  name?: string;
  url?: string;
  size?: number;
};
