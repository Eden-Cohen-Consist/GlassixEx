export interface Ticket {
  id: number;
  departmentId: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  field10: string;
  culture: "he-IL" | "en-US" | "es-ES" | "pt-PT";
  state?: ticketState;
  getAvailableUser: boolean;
  addIntroductionMessage: boolean;
  enableWebhook: boolean;
  markAsRead: boolean;
  participants: [
    {
      type: string;
      protocolType: ProtocolType;
      isActive: boolean;
      isDeleted: boolean;
      subProtocolType: SubProtocol;
      identifier: string;
    },
  ];
}

export enum ticketState {
  OPEN = "Open",
  CLOSED = "Closed",
}

export enum ProtocolType {
  SMS = "SMS",
  WHATSAPP = "WhatsApp",
  MAIL = "Mail",
  WEB = "Web",
  FACEBOOK_MESSENGER = "FBmessenger",
  WEB_CHAT = "WebViaSMS",
  FACEBOOK_FEED = "FacebookFeed",
  INSTAGRAM_FEED = "InstagramFeed",
  INSTAGRAM_DM = "InstagramDM",
  PHONECALL = "PhoneCall",
  VIBER = "Viber",
  Twitter = "Twitter",
  APPLE_BUSINESS = "AppleBusinessChat",
  GOOGLE_BUSINESS_MESSAGES = "GoogleBusinessMessages",
  GOOGLE_BUSINESS_REVIEW = "Google Business Reviews",
}

export enum SubProtocol {
  MAIL_TO = "MailTo",
  MAIL_CC = "MailCc",
  MAIL_BCC = "MailBcc",
}
