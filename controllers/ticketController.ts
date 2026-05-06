import { Request, Response } from "express";
import { ticketState } from "../models/ticket";
import { glassixService } from "../services/glassixService";
import { CreateTicketReq } from "../models/request";

export const create = async (req: Request, res: Response) => {
  const payload = req?.body as CreateTicketReq;

  try {
    const data = await glassixService.createTicket(payload);
    if (data.isAxiosError) {
      return res.status(data.status).json({ isOk: false, message: data.code });
    }
    res.status(201).json(data);
  } catch (err: any) {
    console.error("unexpected error: ", err);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal server Error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const ticketId =
    typeof req.params?.ticketId === "string" ? req.params.ticketId : null;

  // console.log(ticketId);
  if (!ticketId || ticketId === "") {
    return res
      .status(400)
      .json({ isOk: false, message: "Bad Request: no ticket id provided" });
  }

  const text = req.body?.text;

  if (!req.body?.text) {
    return res
      .status(400)
      .json({ isOk: false, message: "Bad Request: no message to send" });
  }
  try {
    const response = await glassixService.sendMessage(parseInt(ticketId), {
      text: text,
    });
    if (response.isAxiosError) {
      console.error(`Error ${response.status} ${response.code}`);
      return res
        .status(response.status)
        .json({ isOk: false, message: `${response.code}` });
    }
    res.status(200).json({ isOk: true, message: "Message sent to chat" });
  } catch (error: any) {
    console.error("unexpected error: ", error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal server Error" });
  }
};

export const setState = async (req: Request, res: Response) => {
  const ticketId =
    typeof req.params?.ticketId === "string" ? req.params.ticketId : null;

  if (!ticketId || ticketId === "") {
    return res
      .status(400)
      .json({ isOk: false, message: "Bad Request: no ticket id provided" });
  }
  const nextState = req.body?.nextState;
  console.log(nextState);

  if (!Object.values(ticketState).includes(nextState as ticketState)) {
    console.log(`Error with ticket state : ${ticketState}`);
    return res
      .status(400)
      .json({ isOk: false, message: `Bad request unknown ticket state` });
  }
  try {
    const response = await glassixService.setState(
      parseInt(ticketId),
      nextState,
    );

    if (response.isAxiosError) {
      console.error(response);
      console.error(`Error ${response.status} ${response.code}`);
      return res
        .status(response.status)
        .json({ isOk: false, message: `${response.code}` });
    }
    return res
      .status(200)
      .json({ isOk: true, message: `Closed ticket id: ${ticketId}` });
  } catch (error: any) {
    console.error("unexpected error: ", error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal server Error" });
  }
};
