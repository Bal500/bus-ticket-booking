import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-ticket-qr',
  standalone: true,
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent implements OnInit {
  @Input() ticketId: string = '';
  qrCodeUrl: string = '';

  ngOnInit() {
    this.generateQRCode();
  }

  generateQRCode() {
    QRCode.toDataURL(this.ticketId, (err, url) => {
      if (err) {
        console.error('QR kód generálás hiba:', err);
        return;
      }
      this.qrCodeUrl = url;
    });
  }

  downloadTicket() {
    const link = document.createElement('a');
    link.href = this.qrCodeUrl;
    link.download = 'ticket-' + this.ticketId + '.png';
    link.click();
  }

  randomTicketId: string = 'TKT-' + Math.random().toString(36).substr(2, 9);
}
