import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Route } from '../../models/route';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  template: `
    <mat-card [ngClass]="{ 'low-seats': ticket.seats <= 5 }">
      <mat-card-title>{{ ticket.from }} → {{ ticket.to }}</mat-card-title>
      <mat-card-subtitle>
        <span [matBadge]="ticket.seats" matBadgeOverlap="false" matBadgeColor="accent">Elérhető helyek</span>
      </mat-card-subtitle>
      <mat-card-content>
        <p>Indulás: {{ ticket.departure | date: 'yyyy.MM.dd HH:mm' }}</p>
        <p>Ár: {{ ticket.price | currency: 'HUF':'symbol-narrow':'1.0-0' }}
          <mat-icon>confirmation_number</mat-icon>
        </p>
        <p *ngIf="ticket.seats <= 5" class="warning-text">Utolsó néhány hely!</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" 
          [disabled]="ticket.seats <= 0" 
          [matTooltip]="ticket.seats <= 0 ? 'Nincs elérhető hely' : 'Jegy foglalása'"
          (click)="onReserve()">
          Lefoglalás
        </button>
        <button mat-icon-button color="accent" 
          matTooltip="Hozzáadás kedvencekhez"
          (click)="onAddToFavorites()">
          <mat-icon>favorite_border</mat-icon>
        </button>
        <button mat-icon-button 
          matTooltip="Részletek megtekintése"
          (click)="onViewDetails()">
          <mat-icon>info</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 10px 0;
      transition: transform 0.3s;
    }
    mat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 10px rgba(0,0,0,0.2);
    }
    .low-seats {
      border-left: 4px solid #f44336;
    }
    .warning-text {
      color: #f44336;
      font-weight: bold;
    }
    .mat-mdc-card-actions {
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class TicketCardComponent {
  @Input() ticket!: Route;
  @Output() reserve = new EventEmitter<Route>();
  @Output() addToFavorites = new EventEmitter<Route>();
  @Output() viewDetails = new EventEmitter<Route>();

  constructor(private snackBar: MatSnackBar) {}

  onReserve() {
    if (this.ticket.seats > 0) {
      this.ticket.seats--;

      const ticketId = 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      QRCode.toDataURL(ticketId).then(qrCodeDataUrl => {
        const ticketHtml = `
          <html>
            <head>
              <title>Jegy - ${ticketId}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 40px;
                }
                img {
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <h1>Buszjegy</h1>
              <p><strong>Honnan:</strong> ${this.ticket.from}</p>
              <p><strong>Hová:</strong> ${this.ticket.to}</p>
              <p><strong>Indulás:</strong> ${new Date(this.ticket.departure).toLocaleString()}</p>
              <p><strong>Jegy azonosító:</strong> ${ticketId}</p>
              <img src="${qrCodeDataUrl}" alt="QR Kód">
              <p>Kérjük, mutassa fel ezt a jegyet felszálláskor.</p>
            </body>
          </html>
        `;

        const newWindow = window.open('', '_blank', 'width=600,height=800');
        if (newWindow) {
          newWindow.document.open();
          newWindow.document.write(ticketHtml);
          newWindow.document.close();

          this.snackBar.open('Sikeres foglalás! Jegy megnyitva.', 'Bezárás', {
            duration: 3000,
          });

          this.reserve.emit(this.ticket);
        } else {
          alert('Nem sikerült új ablakot nyitni. Kérlek, engedélyezd a felugró ablakokat.');
        }
      });
    }
  }

  onAddToFavorites() {
    this.addToFavorites.emit(this.ticket);
    this.snackBar.open('Hozzáadva a kedvencekhez!', 'Bezárás', {
      duration: 2000,
    });
  }

  onViewDetails() {
    this.viewDetails.emit(this.ticket);
  }
}
