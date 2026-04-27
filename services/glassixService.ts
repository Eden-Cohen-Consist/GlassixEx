import {Request, Response} from "express";
import {Ticket} from "../models/ticket";

const GLASSIX_URL = process.env.BASE_URL!;
const API_KEY = process.env.API_KEY!;
const API_SECRET = process.env.API_SECRET!;
const API_USER = process.env.API_USER!;

export const getAuthToken= async() => {
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
