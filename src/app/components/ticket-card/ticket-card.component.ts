import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Route } from '../../models/route';
import * as QRCode from 'qrcode';

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
        <p>Elérhető helyek: {{ ticket.seats }}</p>
      </mat-card-content>
      <button mat-raised-button color="primary" (click)="reserveSeat(ticket)" [disabled]="ticket.seats <= 0">
        Lefoglalás
      </button>
    </mat-card>
  `,
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
  @Input() ticket!: Route;

  reserveSeat(route: any) {
    if (route.seats > 0) {
      route.seats--;

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
              <p><strong>Honnan:</strong> ${route.from}</p>
              <p><strong>Hová:</strong> ${route.to}</p>
              <p><strong>Indulás:</strong> ${new Date(route.departure).toLocaleString()}</p>
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
        } else {
          alert('Nem sikerült új ablakot nyitni. Kérlek engedélyezd a felugró ablakokat.');
        }
      });
    }
  }
}
