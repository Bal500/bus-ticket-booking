import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Route } from '../../models/route';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SearchResultsComponent
    ],
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    from: string = '';
    to: string = '';
    departureTime: string = '';

    results: Route[] = [];

    allRoutes: Route[] = [
        { id: 1, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T08:00', date: '2025-04-13', price: 4200 },
        { id: 2, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T09:00', date: '2025-04-13', price: 3800 },
        { id: 3, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T10:00', date: '2025-04-13', price: 4200 }
    ];

    searchTickets() {
        this.results = this.allRoutes.filter(route =>
            route.from.toLowerCase().includes(this.from.toLowerCase()) &&
            route.to.toLowerCase().includes(this.to.toLowerCase()) &&
            (!this.departureTime || route.departure.startsWith(this.departureTime))
        );
    }
}
