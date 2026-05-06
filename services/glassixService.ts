import { CreateTicketReq } from "../models/request";
import { Ticket, ticketState } from "../models/ticket";
import { axiosClientInstance, getAxiosConfig } from "./axiosConfig";

export const glassixService = {
  createTicket: async (ticketData: CreateTicketReq) => {
    try {
      const axiosConfig = await getAxiosConfig();
      const response = await axiosClientInstance.post<Ticket>(
        `${axiosConfig.baseURL}/tickets/create`,
        ticketData,
        {
          headers: axiosConfig.headers,
        },
      );
      console.log(`Succeed in creating a Ticket id: ${response.data?.id}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  },

  setState: async (ticketId: number, state: ticketState) => {
    try {
      const axiosConfig = await getAxiosConfig();
      const response = await axiosClientInstance.put(
        `${axiosConfig.baseURL}/tickets/setstate/${ticketId}?nextState=${state}&getTicket=false`,
        null,
        {
          headers: axiosConfig.headers,
        },
      );
      console.log(`State updated to ${state} on ticket ${ticketId}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  },

  sendMessage: async (ticketId: number, payload: any) => {
    try {
      const axiosConfig = await getAxiosConfig();
      const response = await axiosClientInstance.post(
        `${axiosConfig.baseURL}/tickets/send/${ticketId}`,
        payload,
        {
          headers: axiosConfig.headers,
        },
      );
      console.log(`sent a message in ticket: ${ticketId}`);
      return response.data;
    } catch (error: any) {
      return error;
    }
  },
};
