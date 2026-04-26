import type { JwtPayload } from "../types/common.types";
import { getFromLocalStorage } from "./token/localstorage";
import { jwtDecode } from "jwt-decode";

export const getDecodedAccessToken = (): JwtPayload | null => {
  const token = getFromLocalStorage("accessToken");
  if (!token) return null;

  return decodeJwt(token);
};

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid JWT token", error);
    return null;
  }
};
