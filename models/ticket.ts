export interface Ticket {
  culture: string,
  state: string,
  getAvailableUser: boolean,
  addIntroductionMessage: boolean,
  enableWebhook: boolean,
  markAsRead: boolean,
  participants:[
  {
    type: string,
    protocolType: string,
    isActive: boolean,
    isDeleted: boolean,
    subProtocolType: string,
    identifier: string
  }
]
}
