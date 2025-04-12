import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
    { id: 1, from: 'Székesfehérvár', to: 'Veszprém', departure: '2025-04-13T16:16', price: 4825 },
    { id: 2, from: 'Szentendre', to: 'Debrecen', departure: '2025-04-13T14:03', price: 5566 },
    { id: 3, from: 'Kecskemét', to: 'Miskolc', departure: '2025-04-14T07:49', price: 3321 },
    { id: 4, from: 'Miskolc', to: 'Nagykanizsa', departure: '2025-04-14T01:22', price: 6801 },
    { id: 5, from: 'Debrecen', to: 'Székesfehérvár', departure: '2025-04-14T02:13', price: 5997 },
    { id: 6, from: 'Nagykanizsa', to: 'Szeged', departure: '2025-04-13T12:30', price: 4101 },
    { id: 7, from: 'Szeged', to: 'Nagykanizsa', departure: '2025-04-14T03:45', price: 4014 },
    { id: 8, from: 'Budapest', to: 'Sopron', departure: '2025-04-14T03:11', price: 7726 },
    { id: 9, from: 'Debrecen', to: 'Szeged', departure: '2025-04-14T02:04', price: 3698 },
    { id: 10, from: 'Nagykanizsa', to: 'Székesfehérvár', departure: '2025-04-13T20:08', price: 5980 },
    { id: 11, from: 'Budapest', to: 'Nyíregyháza', departure: '2025-04-14T04:20', price: 3784 },
    { id: 12, from: 'Nagykanizsa', to: 'Sopron', departure: '2025-04-13T12:18', price: 5918 },
    { id: 13, from: 'Nagykanizsa', to: 'Miskolc', departure: '2025-04-13T14:15', price: 4967 },
    { id: 14, from: 'Debrecen', to: 'Eger', departure: '2025-04-13T17:26', price: 4459 },
    { id: 15, from: 'Győr', to: 'Eger', departure: '2025-04-13T12:22', price: 7204 },
    { id: 16, from: 'Kecskemét', to: 'Sopron', departure: '2025-04-13T18:07', price: 5209 },
    { id: 17, from: 'Miskolc', to: 'Veszprém', departure: '2025-04-14T02:59', price: 6165 },
    { id: 18, from: 'Pécs', to: 'Budapest', departure: '2025-04-13T16:40', price: 6268 },
    { id: 19, from: 'Székesfehérvár', to: 'Sopron', departure: '2025-04-13T11:31', price: 6607 },
    { id: 20, from: 'Pécs', to: 'Debrecen', departure: '2025-04-14T03:17', price: 4938 },
    { id: 21, from: 'Nyíregyháza', to: 'Miskolc', departure: '2025-04-13T08:44', price: 6205 },
    { id: 22, from: 'Debrecen', to: 'Győr', departure: '2025-04-13T16:23', price: 7496 },
    { id: 23, from: 'Veszprém', to: 'Pécs', departure: '2025-04-14T09:15', price: 6321 },
    { id: 24, from: 'Sopron', to: 'Budapest', departure: '2025-04-13T11:38', price: 7208 },
    { id: 25, from: 'Miskolc', to: 'Szeged', departure: '2025-04-13T07:22', price: 5758 },
    { id: 26, from: 'Győr', to: 'Székesfehérvár', departure: '2025-04-14T05:29', price: 7126 },
    { id: 27, from: 'Eger', to: 'Nyíregyháza', departure: '2025-04-14T06:07', price: 4103 },
    { id: 28, from: 'Szeged', to: 'Veszprém', departure: '2025-04-14T08:48', price: 3431 },
    { id: 29, from: 'Debrecen', to: 'Budapest', departure: '2025-04-13T19:02', price: 6898 },
    { id: 30, from: 'Budapest', to: 'Eger', departure: '2025-04-13T14:50', price: 4009 },
    { id: 31, from: 'Nyíregyháza', to: 'Szentendre', departure: '2025-04-14T01:21', price: 6384 },
    { id: 32, from: 'Szentendre', to: 'Miskolc', departure: '2025-04-14T05:14', price: 6607 },
    { id: 33, from: 'Debrecen', to: 'Zalaegerszeg', departure: '2025-04-13T10:52', price: 7314 },
    { id: 34, from: 'Szeged', to: 'Szentendre', departure: '2025-04-13T22:34', price: 7201 },
    { id: 35, from: 'Kecskemét', to: 'Győr', departure: '2025-04-14T03:24', price: 4779 },
    { id: 36, from: 'Sopron', to: 'Veszprém', departure: '2025-04-13T21:22', price: 6392 },
    { id: 37, from: 'Székesfehérvár', to: 'Budapest', departure: '2025-04-13T14:23', price: 5336 },
    { id: 38, from: 'Székesfehérvár', to: 'Győr', departure: '2025-04-13T19:21', price: 4016 },
    { id: 39, from: 'Budapest', to: 'Debrecen', departure: '2025-04-13T13:25', price: 7106 },
    { id: 40, from: 'Szentendre', to: 'Szeged', departure: '2025-04-13T09:02', price: 6750 },
    { id: 41, from: 'Sopron', to: 'Veszprém', departure: '2025-04-13T21:26', price: 5914 },
    { id: 42, from: 'Pécs', to: 'Veszprém', departure: '2025-04-13T17:13', price: 4157 },
    { id: 43, from: 'Szeged', to: 'Kecskemét', departure: '2025-04-14T01:04', price: 3439 },
    { id: 44, from: 'Szentendre', to: 'Budapest', departure: '2025-04-13T13:24', price: 6367 },
    { id: 45, from: 'Nyíregyháza', to: 'Szentendre', departure: '2025-04-13T10:54', price: 3260 },
    { id: 46, from: 'Székesfehérvár', to: 'Szeged', departure: '2025-04-13T15:49', price: 7103 },
    { id: 47, from: 'Budapest', to: 'Szentendre', departure: '2025-04-13T14:21', price: 5029 },
    { id: 48, from: 'Szentendre', to: 'Zalaegerszeg', departure: '2025-04-14T05:33', price: 6273 },
    { id: 49, from: 'Nyíregyháza', to: 'Veszprém', departure: '2025-04-13T11:48', price: 6792 },
    { id: 50, from: 'Kecskemét', to: 'Szentendre', departure: '2025-04-13T18:05', price: 6179 }
];

  searchTickets() {
    const selectedTime = new Date(this.departureTime).getTime(); // Választott időpont
    this.results = this.allRoutes.filter(route =>
      route.from.toLowerCase().includes(this.from.toLowerCase()) &&
      route.to.toLowerCase().includes(this.to.toLowerCase()) &&
      (!this.departureTime || new Date(route.departure).getTime() >= selectedTime)
    );
  }
}
