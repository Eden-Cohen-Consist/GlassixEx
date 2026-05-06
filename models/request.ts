import { ticketState } from "./ticket";

export interface GlassixTokenInterface {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface CreateTicketReq {
  culture: "he-IL" | "en-US" | "es-ES" | "pt-PT";
  state?: ticketState;
  getAvailableUser?: boolean;
  addIntroductionMessage?: boolean;
  enableWebhook?: boolean;
  markAsRead?: boolean;
  participants: [
    {
      type: string;
      protocolType: string;
      isActive: boolean;
      isDeleted: boolean;
      subProtocolType: string;
      identifier: string;
    },
  ];
}
