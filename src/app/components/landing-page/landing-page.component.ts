import { Component } from '@angular/core';
import { Route } from '../../models/route';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    from: string = '';
    to: string = '';
    departureTime: Date | null = null;
    results: Route[] = [];

    searchTickets() {
        // Dummy data for demonstration
        this.results = [
            { from: this.from, to: this.to, departureTime: new Date() },
            { from: this.from, to: this.to, departureTime: new Date(new Date().getTime() + 3600000) }
        ];
    }
}
