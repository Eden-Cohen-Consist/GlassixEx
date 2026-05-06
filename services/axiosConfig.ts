import axios, { AxiosInstance } from "axios";
import { getGlassixToken } from "./getToken";
import { envConf } from "../utils/envConf";

// axios instance for api calls
export const axiosClientInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAxiosConfig() {
  const glassixToken = await getGlassixToken(envConf.apiKey);
  const workspace = envConf.workspace;

  return {
    baseURL: `https://${workspace}.glassix.com/api/v1.2`,
    headers: {
      Authorization: `Bearer ${glassixToken.access_token}`,
    },
  };
}
