import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { Route } from '../../models/route';

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [CommonModule, TicketCardComponent],
    template: `
    <div *ngIf="results.length > 0; else noResults">
      <app-ticket-card *ngFor="let result of results" [ticket]="result"></app-ticket-card>
    </div>
    <ng-template #noResults>
      <p>Nincs találat.</p>
    </ng-template>
  `,
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
    @Input() results: Route[] = [];
}
