import { Route } from '../models/route';

export interface Ticket {
    id: number;
    route: Route;
    price: number;
}
