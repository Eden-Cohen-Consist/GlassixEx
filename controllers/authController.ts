import {Request, Response} from "express";
import {getAuthToken} from "../services/glassixService"

export const login = async(req: Request, res: Response): Promise<void> => {
  try{ 
    // ISSUE: This endpoint returns auth token directly to any caller, no authorization check
    // glassix Token shouldn't be returned to the client, it should be fetched from glassix API and saved in cache, you still need to authenticate the client with a different token.
    const data = await getAuthToken();
    res.status(200).json(data);
  }
  catch(err: any){
    //ISSUE: client should see a proper error message, and shouldn't know the name of the file that threw the error.
    res.status(500).json({error: "Internal server Error inside authConteroller.ts"});
  }
}
