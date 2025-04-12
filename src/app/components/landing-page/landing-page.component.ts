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
        { id: 1, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T06:00', price: 4200 },
        { id: 2, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T08:00', price: 4300 },
        { id: 3, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T10:00', price: 4400 },
        { id: 4, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T12:00', price: 4500 },
        { id: 5, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T14:00', price: 4600 },
        { id: 6, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T07:00', price: 3800 },
        { id: 7, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T09:00', price: 3900 },
        { id: 8, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T11:00', price: 4000 },
        { id: 9, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T13:00', price: 4100 },
        { id: 10, from: 'Budapest', to: 'Szeged', departure: '2025-04-13T15:00', price: 4200 },
        { id: 11, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T06:00', price: 4000 },
        { id: 12, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T08:00', price: 4100 },
        { id: 13, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T10:00', price: 4200 },
        { id: 14, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T12:00', price: 4300 },
        { id: 15, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T14:00', price: 4400 },
        { id: 16, from: 'Szeged', to: 'Budapest', departure: '2025-04-13T07:00', price: 3800 },
        { id: 17, from: 'Szeged', to: 'Budapest', departure: '2025-04-13T09:00', price: 3900 },
        { id: 18, from: 'Szeged', to: 'Budapest', departure: '2025-04-13T11:00', price: 4000 },
        { id: 19, from: 'Szeged', to: 'Budapest', departure: '2025-04-13T13:00', price: 4100 },
        { id: 20, from: 'Szeged', to: 'Budapest', departure: '2025-04-13T15:00', price: 4200 },
        { id: 21, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T06:30', price: 4700 },
        { id: 22, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T08:30', price: 4600 },
        { id: 23, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T10:30', price: 4800 },
        { id: 24, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T12:30', price: 4900 },
        { id: 25, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T14:30', price: 5000 },
        { id: 26, from: 'Győr', to: 'Szeged', departure: '2025-04-13T07:15', price: 5100 },
        { id: 27, from: 'Győr', to: 'Szeged', departure: '2025-04-13T09:15', price: 5200 },
        { id: 28, from: 'Győr', to: 'Szeged', departure: '2025-04-13T11:15', price: 5300 },
        { id: 29, from: 'Győr', to: 'Szeged', departure: '2025-04-13T13:15', price: 5400 },
        { id: 30, from: 'Győr', to: 'Szeged', departure: '2025-04-13T15:15', price: 5500 },
        { id: 31, from: 'Győr', to: 'Debrecen', departure: '2025-04-13T17:15', price: 5600 },
        { id: 32, from: 'Győr', to: 'Debrecen', departure: '2025-04-13T18:15', price: 5700 },
        { id: 33, from: 'Győr', to: 'Debrecen', departure: '2025-04-13T19:15', price: 5800 },
        { id: 34, from: 'Győr', to: 'Debrecen', departure: '2025-04-13T20:15', price: 5900 },
        { id: 35, from: 'Győr', to: 'Debrecen', departure: '2025-04-13T21:15', price: 6000 },
        { id: 36, from: 'Miskolc', to: 'Budapest', departure: '2025-04-13T07:00', price: 4600 },
        { id: 37, from: 'Miskolc', to: 'Budapest', departure: '2025-04-13T09:00', price: 4700 },
        { id: 38, from: 'Miskolc', to: 'Budapest', departure: '2025-04-13T11:00', price: 4800 },
        { id: 39, from: 'Miskolc', to: 'Budapest', departure: '2025-04-13T13:00', price: 4900 },
        { id: 40, from: 'Miskolc', to: 'Budapest', departure: '2025-04-13T15:00', price: 5000 },
        { id: 41, from: 'Kecskemét', to: 'Győr', departure: '2025-04-13T07:45', price: 5100 },
        { id: 42, from: 'Kecskemét', to: 'Győr', departure: '2025-04-13T09:45', price: 5200 },
        { id: 43, from: 'Kecskemét', to: 'Győr', departure: '2025-04-13T11:45', price: 5300 },
        { id: 44, from: 'Kecskemét', to: 'Győr', departure: '2025-04-13T13:45', price: 5400 },
        { id: 45, from: 'Kecskemét', to: 'Győr', departure: '2025-04-13T15:45', price: 5500 },
        { id: 46, from: 'Eger', to: 'Pécs', departure: '2025-04-13T08:10', price: 4600 },
        { id: 47, from: 'Eger', to: 'Pécs', departure: '2025-04-13T10:10', price: 4700 },
        { id: 48, from: 'Eger', to: 'Pécs', departure: '2025-04-13T12:10', price: 4800 },
        { id: 49, from: 'Eger', to: 'Pécs', departure: '2025-04-13T14:10', price: 4900 },
        { id: 50, from: 'Eger', to: 'Pécs', departure: '2025-04-13T16:10', price: 5000 },
        { id: 51, from: 'Nyíregyháza', to: 'Pécs', departure: '2025-04-13T07:00', price: 4600 },
        { id: 52, from: 'Nyíregyháza', to: 'Pécs', departure: '2025-04-13T09:00', price: 4700 },
        { id: 53, from: 'Nyíregyháza', to: 'Pécs', departure: '2025-04-13T11:00', price: 4800 },
        { id: 54, from: 'Nyíregyháza', to: 'Pécs', departure: '2025-04-13T13:00', price: 4900 },
        { id: 55, from: 'Nyíregyháza', to: 'Pécs', departure: '2025-04-13T15:00', price: 5000 },
        { id: 56, from: 'Szolnok', to: 'Szeged', departure: '2025-04-13T06:20', price: 4300 },
        { id: 57, from: 'Szolnok', to: 'Szeged', departure: '2025-04-13T08:20', price: 4400 },
        { id: 58, from: 'Szolnok', to: 'Szeged', departure: '2025-04-13T10:20', price: 4500 },
        { id: 59, from: 'Szolnok', to: 'Szeged', departure: '2025-04-13T12:20', price: 4600 },
        { id: 60, from: 'Szolnok', to: 'Szeged', departure: '2025-04-13T14:20', price: 4700 },
        { id: 61, from: 'Kaposvár', to: 'Debrecen', departure: '2025-04-13T07:30', price: 5100 },
        { id: 62, from: 'Kaposvár', to: 'Debrecen', departure: '2025-04-13T09:30', price: 5200 },
        { id: 63, from: 'Kaposvár', to: 'Debrecen', departure: '2025-04-13T11:30', price: 5300 },
        { id: 64, from: 'Kaposvár', to: 'Debrecen', departure: '2025-04-13T13:30', price: 5400 },
        { id: 65, from: 'Kaposvár', to: 'Debrecen', departure: '2025-04-13T15:30', price: 5500 },
        { id: 66, from: 'Szombathely', to: 'Miskolc', departure: '2025-04-13T06:10', price: 5000 },
        { id: 67, from: 'Szombathely', to: 'Miskolc', departure: '2025-04-13T08:10', price: 5100 },
        { id: 68, from: 'Szombathely', to: 'Miskolc', departure: '2025-04-13T10:10', price: 5200 },
        { id: 69, from: 'Szombathely', to: 'Miskolc', departure: '2025-04-13T12:10', price: 5300 },
        { id: 70, from: 'Szombathely', to: 'Miskolc', departure: '2025-04-13T14:10', price: 5400 },
        { id: 71, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2025-04-13T07:50', price: 4700 },
        { id: 72, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2025-04-13T09:50', price: 4800 },
        { id: 73, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2025-04-13T11:50', price: 4900 },
        { id: 74, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2025-04-13T13:50', price: 5000 },
        { id: 75, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2025-04-13T15:50', price: 5100 },
        { id: 76, from: 'Zalaegerszeg', to: 'Szeged', departure: '2025-04-13T06:00', price: 5200 },
        { id: 77, from: 'Zalaegerszeg', to: 'Szeged', departure: '2025-04-13T08:00', price: 5300 },
        { id: 78, from: 'Zalaegerszeg', to: 'Szeged', departure: '2025-04-13T10:00', price: 5400 },
        { id: 79, from: 'Zalaegerszeg', to: 'Szeged', departure: '2025-04-13T12:00', price: 5500 },
        { id: 80, from: 'Zalaegerszeg', to: 'Szeged', departure: '2025-04-13T14:00', price: 5600 }
    ];

    searchTickets() {
        this.results = this.allRoutes.filter(route =>
            route.from.toLowerCase().includes(this.from.toLowerCase()) &&
            route.to.toLowerCase().includes(this.to.toLowerCase()) &&
            (!this.departureTime || route.departure.startsWith(this.departureTime))
        );
    }
}
