import { Ticket } from "./ticket"

export interface Counter{
    counterId: number
    name: string
    isEmpty: boolean
    ticketId: number
    ticketOrder: Ticket 
    servicesOnCounter: any
}