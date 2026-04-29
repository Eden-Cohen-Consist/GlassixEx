import {Request, Response} from "express";
import {Ticket} from "../models/ticket";

// ISSUE: `Request`/`Response` imports are unused in this service layer.
// Indicates layer mixing or leftover code. (GPT vibe coded code.)
const GLASSIX_URL = process.env.BASE_URL!; //ISSUE: dear nodejs, this parameter exists I swear! (but who said so? how do I know if it exists?)
const API_KEY = process.env.API_KEY!; //ISSUE: dear nodejs, this parameter exists I swear! (but who said so? how do I know if it exists?)
const API_SECRET = process.env.API_SECRET!; //ISSUE: dear nodejs, this parameter exists I swear! (but who said so? how do I know if it exists?)
const API_USER = process.env.API_USER!; //ISSUE: dear nodejs, this parameter exists I swear! (but who said so? how do I know if it exists?)
// ISSUE: Non-null assertions (`!`) hide missing env config until runtime failures, assume we run this and suddenly oops, the parameter doesn't exist in the env file, why would we want to find it out at runtime?
// Prefer explicit startup-time validation with clear process exit.

export const getAuthToken= async() => {
  // ISSUE: No timeout/retry for outbound auth call.
  // ISSUE: No rate limiting for outbound auth call.
  // ISSUE: No error handling for outbound auth call.
  // ISSUE: No logging for outbound auth call.
  // ISSUE: No tracing for outbound auth call.

  const response = await fetch(GLASSIX_URL + "token/get", {
    method: "POST",
    headers:{
      "content-type": "application/json",
      "accept": 'application/json'
    },
    body: JSON.stringify({
      "apiKey": API_KEY,
      "apiSecret": API_SECRET,
      "userName": API_USER
    }) 
  });


  if(!response.ok){
    throw new Error(`Auth failed: ${response.status}`);
  }
  const data = await response.json();

  return data // returns the auth token
}

export const createTicket = async(ticketData: Ticket, token: string) => {
  const createTicketURL = GLASSIX_URL + "tickets/create";
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json', "Authorization": token},
    body: JSON.stringify(ticketData)
  };

  const response = await fetch(createTicketURL, options);
  
  if(!response.ok){
    throw new Error(`createTicket failed: ${response.status}`);
  }
  return response.json();
}

export const sendHello = async(ticketId: number, token: string) =>{
  const sendURL = GLASSIX_URL + `tickets/send/${ticketId}`;
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json', "Authorization": token},
    // ISSUE: Message text is hardcoded in service code, not driven by validated input/config.
    body: JSON.stringify({"enableFreeTextInput": false, "text": "hello Malshin"})
  }

  const response = await fetch(sendURL, options);

  if(!response.ok){
    throw new Error(`sendHello failed: ${response.status}`);
  }

  return response.json();
}

export const closeTicket = async(ticketId: number, token: string) => {
  const closeURL = GLASSIX_URL + `tickets/setstate/${ticketId}?nextState=Closed`;
  const options = {
    method: "PUT",
    headers: {'content-type': 'application/json', "Authorization": token},
  }

  const response = await fetch(closeURL, options);

  if(!response.ok){
    throw new Error(`closeTicket failed: ${response.status}`);
  }

  return response.json();
}
