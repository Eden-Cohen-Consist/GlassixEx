import { LRUCache } from "lru-cache";
import axios from "axios";
import axiosRetry from "axios-retry";
import { GlassixTokenInterface } from "../models/request";
import { envConf } from "../utils/envConf";
import { ErrorResponse } from "../middleware/errorMiddleware";

const cachedToken = new LRUCache<string, GlassixTokenInterface>({ max: 10 });

export const getGlassixToken = async (
  departmentId: string,
): Promise<GlassixTokenInterface> => {
  try {
    let token = cachedToken.get(departmentId);
    if (token) {
      return token;
    }

    console.info("No token found in cache, getting a new one");
    // get a token from api
    const client = axios.create();
    axiosRetry(client, {
      retries: 3,

      shouldResetTimeout: true,

      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
      },
    });

    const response = await client.post<GlassixTokenInterface>(
      `https://${envConf.workspace}.glassix.com/api/v1.2/token/get`,
      {
        apiKey: envConf.apiKey,
        apiSecret: envConf.apiSecret,
        username: envConf.apiUser,
      },
      {
        timeout: 5000,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );

    if (!response || !response.data) {
      throw new ErrorResponse("Failed to fetch glassix token from api", 500);
    }

    const tokeTTL = response.data.expires_in * 1000;

    token = {
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type,
    };

    cachedToken.set(departmentId, token, { ttl: tokeTTL });

    if (!token) {
      throw new ErrorResponse(
        "Token could not be fetched or get from cache",
        500,
      );
    }

    return token;
  } catch (error: any) {
    console.error("unexpected error");
    throw error;
  }
};
