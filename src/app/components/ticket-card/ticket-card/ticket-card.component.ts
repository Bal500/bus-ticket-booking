import { Component, Input } from '@angular/core';
import { Route } from '../../models/route';

@Component({
    selector: 'app-ticket-card',
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
    @Input() route!: Route;

    getPrice() {
        return (Math.random() * 100).toFixed(2); // Dummy price
    }
}
