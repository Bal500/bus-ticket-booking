import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
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
    MatAutocompleteModule,
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

  cities: string[] = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Miskolc', 'Győr', 'Sopron', 'Székesfehérvár', 'Kecskemét', 'Érd'];

  allRoutes: Route[] = [
    { id: 1, from: 'Budapest', to: 'Debrecen', departure: '2026-04-13T06:00', price: 4200, seats: 23 },
    { id: 2, from: 'Budapest', to: 'Debrecen', departure: '2026-04-13T08:00', price: 4300, seats: 8 },
    { id: 3, from: 'Budapest', to: 'Debrecen', departure: '2026-04-13T10:00', price: 4400, seats: 12 },
    { id: 4, from: 'Budapest', to: 'Debrecen', departure: '2026-04-13T12:00', price: 4500, seats: 34 },
    { id: 5, from: 'Budapest', to: 'Debrecen', departure: '2026-04-13T14:00', price: 4600, seats: 20 },
    { id: 6, from: 'Budapest', to: 'Szeged', departure: '2026-04-13T07:00', price: 3800, seats: 3 },
    { id: 7, from: 'Budapest', to: 'Szeged', departure: '2026-04-13T09:00', price: 3900, seats: 41 },
    { id: 8, from: 'Budapest', to: 'Szeged', departure: '2026-04-13T11:00', price: 4000, seats: 36 },
    { id: 9, from: 'Budapest', to: 'Szeged', departure: '2026-04-13T13:00', price: 4100, seats: 14 },
    { id: 10, from: 'Budapest', to: 'Szeged', departure: '2026-04-13T15:00', price: 4200, seats: 16 },
    { id: 11, from: 'Debrecen', to: 'Budapest', departure: '2026-04-13T06:00', price: 4000, seats: 19 },
    { id: 12, from: 'Debrecen', to: 'Budapest', departure: '2026-04-13T08:00', price: 4100, seats: 7 },
    { id: 13, from: 'Debrecen', to: 'Budapest', departure: '2026-04-13T10:00', price: 4200, seats: 28 },
    { id: 14, from: 'Debrecen', to: 'Budapest', departure: '2026-04-13T12:00', price: 4300, seats: 18 },
    { id: 15, from: 'Debrecen', to: 'Budapest', departure: '2026-04-13T14:00', price: 4400, seats: 30 },
    { id: 16, from: 'Szeged', to: 'Budapest', departure: '2026-04-13T07:00', price: 3800, seats: 42 },
    { id: 17, from: 'Szeged', to: 'Budapest', departure: '2026-04-13T09:00', price: 3900, seats: 4 },
    { id: 18, from: 'Szeged', to: 'Budapest', departure: '2026-04-13T11:00', price: 4000, seats: 40 },
    { id: 19, from: 'Szeged', to: 'Budapest', departure: '2026-04-13T13:00', price: 4100, seats: 24 },
    { id: 20, from: 'Szeged', to: 'Budapest', departure: '2026-04-13T15:00', price: 4200, seats: 43 },
    { id: 21, from: 'Pécs', to: 'Budapest', departure: '2026-04-13T06:30', price: 4700, seats: 27 },
    { id: 22, from: 'Pécs', to: 'Budapest', departure: '2026-04-13T08:30', price: 4600, seats: 22 },
    { id: 23, from: 'Pécs', to: 'Budapest', departure: '2026-04-13T10:30', price: 4800, seats: 2 },
    { id: 24, from: 'Pécs', to: 'Budapest', departure: '2026-04-13T12:30', price: 4900, seats: 39 },
    { id: 25, from: 'Pécs', to: 'Budapest', departure: '2026-04-13T14:30', price: 5000, seats: 13 },
    { id: 26, from: 'Győr', to: 'Szeged', departure: '2026-04-13T07:15', price: 5100, seats: 10 },
    { id: 27, from: 'Győr', to: 'Szeged', departure: '2026-04-13T09:15', price: 5200, seats: 32 },
    { id: 28, from: 'Győr', to: 'Szeged', departure: '2026-04-13T11:15', price: 5300, seats: 11 },
    { id: 29, from: 'Győr', to: 'Szeged', departure: '2026-04-13T13:15', price: 5400, seats: 15 },
    { id: 30, from: 'Győr', to: 'Szeged', departure: '2026-04-13T15:15', price: 5500, seats: 26 },
    { id: 31, from: 'Győr', to: 'Debrecen', departure: '2026-04-13T17:15', price: 5600, seats: 7 },
    { id: 32, from: 'Győr', to: 'Debrecen', departure: '2026-04-13T18:15', price: 5700, seats: 18 },
    { id: 33, from: 'Győr', to: 'Debrecen', departure: '2026-04-13T19:15', price: 5800, seats: 40 },
    { id: 34, from: 'Győr', to: 'Debrecen', departure: '2026-04-13T20:15', price: 5900, seats: 6 },
    { id: 35, from: 'Győr', to: 'Debrecen', departure: '2026-04-13T21:15', price: 6000, seats: 33 },
    { id: 36, from: 'Miskolc', to: 'Budapest', departure: '2026-04-13T07:00', price: 4600, seats: 8 },
    { id: 37, from: 'Miskolc', to: 'Budapest', departure: '2026-04-13T09:00', price: 4700, seats: 22 },
    { id: 38, from: 'Miskolc', to: 'Budapest', departure: '2026-04-13T11:00', price: 4800, seats: 38 },
    { id: 39, from: 'Miskolc', to: 'Budapest', departure: '2026-04-13T13:00', price: 4900, seats: 41 },
    { id: 40, from: 'Miskolc', to: 'Budapest', departure: '2026-04-13T15:00', price: 5000, seats: 4 },
    { id: 41, from: 'Kecskemét', to: 'Győr', departure: '2026-04-13T07:45', price: 5100, seats: 30 },
    { id: 42, from: 'Kecskemét', to: 'Győr', departure: '2026-04-13T09:45', price: 5200, seats: 5 },
    { id: 43, from: 'Kecskemét', to: 'Győr', departure: '2026-04-13T11:45', price: 5300, seats: 35 },
    { id: 44, from: 'Kecskemét', to: 'Győr', departure: '2026-04-13T13:45', price: 5400, seats: 13 },
    { id: 45, from: 'Kecskemét', to: 'Győr', departure: '2026-04-13T15:45', price: 5500, seats: 1 },
    { id: 46, from: 'Eger', to: 'Pécs', departure: '2026-04-13T08:10', price: 4600, seats: 24 },
    { id: 47, from: 'Eger', to: 'Pécs', departure: '2026-04-13T10:10', price: 4700, seats: 27 },
    { id: 48, from: 'Eger', to: 'Pécs', departure: '2026-04-13T12:10', price: 4800, seats: 9 },
    { id: 49, from: 'Eger', to: 'Pécs', departure: '2026-04-13T14:10', price: 4900, seats: 15 },
    { id: 50, from: 'Eger', to: 'Pécs', departure: '2026-04-13T16:10', price: 5000, seats: 36 },
    { id: 51, from: 'Nyíregyháza', to: 'Pécs', departure: '2026-04-13T07:00', price: 4600, seats: 14 },
    { id: 52, from: 'Nyíregyháza', to: 'Pécs', departure: '2026-04-13T09:00', price: 4700, seats: 20 },
    { id: 53, from: 'Nyíregyháza', to: 'Pécs', departure: '2026-04-13T11:00', price: 4800, seats: 3 },
    { id: 54, from: 'Nyíregyháza', to: 'Pécs', departure: '2026-04-13T13:00', price: 4900, seats: 12 },
    { id: 55, from: 'Nyíregyháza', to: 'Pécs', departure: '2026-04-13T15:00', price: 5000, seats: 42 },
    { id: 56, from: 'Szolnok', to: 'Szeged', departure: '2026-04-13T06:20', price: 4300, seats: 26 },
    { id: 57, from: 'Szolnok', to: 'Szeged', departure: '2026-04-13T08:20', price: 4400, seats: 45 },
    { id: 58, from: 'Szolnok', to: 'Szeged', departure: '2026-04-13T10:20', price: 4500, seats: 11 },
    { id: 59, from: 'Szolnok', to: 'Szeged', departure: '2026-04-13T12:20', price: 4600, seats: 19 },
    { id: 60, from: 'Szolnok', to: 'Szeged', departure: '2026-04-13T14:20', price: 4700, seats: 2 },
    { id: 61, from: 'Kaposvár', to: 'Debrecen', departure: '2026-04-13T07:30', price: 5100, seats: 39 },
    { id: 62, from: 'Kaposvár', to: 'Debrecen', departure: '2026-04-13T09:30', price: 5200, seats: 17 },
    { id: 63, from: 'Kaposvár', to: 'Debrecen', departure: '2026-04-13T11:30', price: 5300, seats: 28 },
    { id: 64, from: 'Kaposvár', to: 'Debrecen', departure: '2026-04-13T13:30', price: 5400, seats: 23 },
    { id: 65, from: 'Kaposvár', to: 'Debrecen', departure: '2026-04-13T15:30', price: 5500, seats: 16 },
    { id: 66, from: 'Szombathely', to: 'Miskolc', departure: '2026-04-13T06:10', price: 5000, seats: 31 },
    { id: 67, from: 'Szombathely', to: 'Miskolc', departure: '2026-04-13T08:10', price: 5100, seats: 37 },
    { id: 68, from: 'Szombathely', to: 'Miskolc', departure: '2026-04-13T10:10', price: 5200, seats: 29 },
    { id: 69, from: 'Szombathely', to: 'Miskolc', departure: '2026-04-13T12:10', price: 5300, seats: 43 },
    { id: 70, from: 'Szombathely', to: 'Miskolc', departure: '2026-04-13T14:10', price: 5400, seats: 34 },
    { id: 71, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2026-04-13T07:50', price: 4700, seats: 32 },
    { id: 72, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2026-04-13T09:50', price: 4800, seats: 44 },
    { id: 73, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2026-04-13T11:50', price: 4900, seats: 10 },
    { id: 74, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2026-04-13T13:50', price: 5000, seats: 25 },
    { id: 75, from: 'Tatabánya', to: 'Nyíregyháza', departure: '2026-04-13T15:50', price: 5100, seats: 21 },
    { id: 76, from: 'Zalaegerszeg', to: 'Szeged', departure: '2026-04-13T06:00', price: 5200, seats: 1 },
    { id: 77, from: 'Zalaegerszeg', to: 'Szeged', departure: '2026-04-13T08:00', price: 5300, seats: 36 },
    { id: 78, from: 'Zalaegerszeg', to: 'Szeged', departure: '2026-04-13T10:00', price: 5400, seats: 9 },
    { id: 79, from: 'Zalaegerszeg', to: 'Szeged', departure: '2026-04-13T12:00', price: 5500, seats: 5 },
    { id: 80, from: 'Zalaegerszeg', to: 'Szeged', departure: '2026-04-13T14:00', price: 5600, seats: 11 },
];

  searchTickets() {
    const selectedTime = new Date(this.departureTime).getTime();
    this.results = this.allRoutes.filter(route =>
      route.from.toLowerCase().includes(this.from.toLowerCase()) &&
      route.to.toLowerCase().includes(this.to.toLowerCase()) &&
      (!this.departureTime || new Date(route.departure).getTime() >= selectedTime)
    );
  }
}
