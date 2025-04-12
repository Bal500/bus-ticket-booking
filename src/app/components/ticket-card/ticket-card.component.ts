import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Route } from '../../models/route';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule],
    template: `
    <mat-card>
      <mat-card-title>{{ ticket.from }} → {{ ticket.to }}</mat-card-title>
      <mat-card-content>
        <p>Indulás: {{ ticket.departure | date:'yyyy.MM.dd HH:mm' }}</p>
        <p>Ár: {{ ticket.price }} Ft <mat-icon>confirmation_number</mat-icon></p>
      </mat-card-content>
    </mat-card>
  `,
})
export class TicketCardComponent {
    @Input() ticket!: Route;
}
