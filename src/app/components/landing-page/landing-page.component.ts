import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { SeatAvailabilityPipe } from '../../pipes/seat-availability.pipe';
import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSliderModule,
        MatChipsModule,
    ],
    template: `
    <div class="container">
      <h1 class="title">Buszbérlés egyszerűen</h1>
      
      <div class="search-form">
        <mat-form-field appearance="outline">
          <mat-label>Honnan</mat-label>
          <input matInput [(ngModel)]="from" [matAutocomplete]="autoFrom">
          <mat-autocomplete #autoFrom="matAutocomplete">
            <mat-option *ngFor="let city of filteredFromCities" [value]="city">
              {{city}}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Hová</mat-label>
          <input matInput [(ngModel)]="to" [matAutocomplete]="autoTo">
          <mat-autocomplete #autoTo="matAutocomplete">
            <mat-option *ngFor="let city of filteredToCities" [value]="city">
              {{city}}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Indulás dátuma</mat-label>
          <input matInput [(ngModel)]="departureTime" [matDatepicker]="picker">
          <mat-hint>ÉÉÉÉ-HH-NN</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Utasok száma</mat-label>
          <mat-select [(ngModel)]="passengerCount">
            <mat-option *ngFor="let num of [1,2,3,4,5]" [value]="num">
              {{num}} utas
            </mat-option>
          </mat-select>
        </mat-form-field>
        
        <div class="price-filter">
          <span>Ár szűrés: {{minPrice}} - {{maxPrice}} Ft</span>
          <mat-slider min="3000" max="8000" step="100">
            <input matSliderStartThumb [(ngModel)]="minPrice">
            <input matSliderEndThumb [(ngModel)]="maxPrice">
          </mat-slider>
        </div>
        
        <button mat-raised-button color="primary" (click)="searchTickets()">
          Keresés
        </button>
      </div>
      
      <div class="popular-destinations" *ngIf="results.length === 0">
        <h2>Népszerű úticélok</h2>
        <mat-chip-set>
          <mat-chip *ngFor="let city of popularDestinations" (click)="selectDestination(city)">
            {{city}}
          </mat-chip>
        </mat-chip-set>
      </div>
    </div>
  `,
    styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .title {
      text-align: center;
      margin-bottom: 30px;
      color: #3f51b5;
    }
    
    .search-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 30px;
    }
    
    .price-filter {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
    }
    
    .popular-destinations {
      margin-top: 40px;
    }
    
    mat-chip-set {
      margin-top: 10px;
    }
    
    @media (max-width: 768px) {
      .search-form {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LandingPageComponent implements OnInit, OnDestroy {
    from: string = '';
    to: string = '';
    departureTime: string = '';
    passengerCount: number = 1;
    minPrice: number = 3000;
    maxPrice: number = 8000;

    results: Route[] = [];
    allRoutes: Route[] = [];
    cities: string[] = [];
    popularDestinations: string[] = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr'];

    filteredFromCities: string[] = [];
    filteredToCities: string[] = [];

    private routeSubscription?: Subscription;

    constructor(
        private routeService: RouteService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRoutes();
        this.updateFilteredCities();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.departureTime = tomorrow.toISOString().split('T')[0];

        console.log('LandingPageComponent initialized');
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        console.log('LandingPageComponent destroyed');
    }

    loadRoutes() {
        this.routeSubscription = this.routeService.getRoutes().subscribe(routes => {
            this.allRoutes = routes;

            const citySet = new Set<string>();
            routes.forEach(route => {
                citySet.add(route.from);
                citySet.add(route.to);
            });
            this.cities = Array.from(citySet);

            console.log(`Loaded ${routes.length} routes and ${this.cities.length} cities`);
        });
    }

    updateFilteredCities() {
        this.filteredFromCities = this.cities.filter(city =>
            city.toLowerCase().includes(this.from.toLowerCase())
        );

        this.filteredToCities = this.cities.filter(city =>
            city.toLowerCase().includes(this.to.toLowerCase())
        );
    }

    selectDestination(city: string) {
        this.to = city;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    searchTickets() {
        const searchParams = {
            from: this.from,
            to: this.to,
            date: this.departureTime,
            passengers: this.passengerCount,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice
        };

        this.routeService.searchRoutes(searchParams).subscribe(routes => {
            this.results = routes;
            console.log(`Found ${routes.length} matching routes`);
        });
    }

    onReserveTicket(route: Route) {
        if (this.userService.isLoggedIn()) {
            this.router.navigate(['/booking', route.id.toString()]);
        } else {
            this.router.navigate(['/login'], {
                queryParams: { redirectTo: `/booking/${route.id.toString()}` }
            });
        }
    }

    onAddToFavorites(route: Route) {
        if (this.userService.isLoggedIn()) {
            this.userService.addFavoriteRoute(route.id.toString());
        } else {
            this.router.navigate(['/login']);
        }
    }

    onViewDetails(route: Route) {
        this.router.navigate(['/route', route.id.toString()]);
    }
}
