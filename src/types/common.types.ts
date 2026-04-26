/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data: any;
  meta?: IMeta;
};

export interface JwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
}
