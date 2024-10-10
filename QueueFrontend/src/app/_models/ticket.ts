import { User } from "./user"

export interface Ticket {
  ticketId: number
  ticketNumber: number
  generatedTime: Date
  status: number
  ticketCounter: any
  app1User: User
  owner: number
  serviceId: number
  service: any
}
