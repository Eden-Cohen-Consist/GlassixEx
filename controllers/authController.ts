import {Request, Response} from "express";
import {getAuthToken} from "../services/glassixService"

export const login = async(req: Request, res: Response): Promise<void> => {
  try{ 
    const data = await getAuthToken();
    res.status(200).json(data);
  }
  catch(err: any){
    res.status(500).json({error: "Internal server Error inside authConteroller.ts"});
  }
}
