import {Request, Response} from "express";
import {Ticket} from "../models/ticket";
import {createTicket, sendHello, closeTicket} from "../services/glassixService";

export const create = async(req: Request, res: Response): Promise<void> =>{
  // ISSUE: Raw Authorization header is passed through without format validation (e.g. Bearer scheme).
  // ISSUE: use a validation middleware to validate any input coming from the client.
  const token = req.headers.authorization;

  // ISSUE: Business payload is hardcoded in controller.
  // This hardcodes the identifier email in source code.
  const ticketDemo: Ticket = {
    culture: 'en-US',
    state: 'Open',
    getAvailableUser: true,
    addIntroductionMessage: true,
    enableWebhook: true,
    markAsRead: false,
    participants: [
      {
        type: 'Client',
        protocolType: 'Mail',
        isActive: true,
        isDeleted: false,
        subProtocolType: 'MailTo',
        identifier: 'gurl@consist.co.il'
      }
    ]
  }

  if(!token){
    res.status(401).json({error: "No token provided"});

    return;
  }

  try{
    const data = await createTicket(ticketDemo, token);
    res.status(201).json(data);
  }
  catch(err: any){
    // ISSUE: Returning `err.message` can leak internal/upstream details to clients, client errors should always be sanitized before being returned to the client.
    res.status(500).json({error: err.message});
  }
}


export const hello = async(req: Request, res: Response): Promise<void> =>{
  // ISSUE: same issue as in create ticket. (validation middleware)
  const token = req.headers.authorization;
  const ticketId = req.body.ticketId;


  if(!token){
    res.status(401).json({error: "No token provided"});

    return;
  }

  try{
    const data = await sendHello(ticketId ,token);

    res.status(201).json(data);
  }
  catch(err: any){
    //ISSUE: same issue as in create ticket. (error not sanitized)
    res.status(500).json({error: err.message});
  }

}

//ISSUE: same issues as in "hello" function.
export const close = async(req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization;

  const ticketId = req.body.ticketId;

  if(!token){
    res.status(401).json({error: "No token provided"});

    return;
  }

  try{
    const data = await closeTicket(ticketId ,token);

    res.status(201).json(data);
  }
  catch(err: any){
    res.status(500).json({error: err.message});
  }
}
