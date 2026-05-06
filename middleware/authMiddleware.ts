import { Request, Response, NextFunction } from "express";
import { envConf } from "../utils/envConf";

export const verifyConsistToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const clientToken = req.headers["x-client-token"];
    if (!clientToken || clientToken !== envConf.consistToken) {
      console.error("Error while verifying consist token");

      return res.status(401).json({
        error: "unauthorized",
        message: "A token is required for authentication",
        isOk: false,
      });
    }
    next();
  } catch (error: any) {
    console.error("error inside verifyConsistToken: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
