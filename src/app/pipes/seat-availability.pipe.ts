import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seatAvailability',
  standalone: true
})
export class SeatAvailabilityPipe implements PipeTransform {
  transform(seats: number): string {
    if (seats === 0) return 'Nincs szabad hely';
    if (seats <= 5) return 'Utolsó ' + seats + ' hely!';
    if (seats <= 10) return 'Kevés hely elérhető';
    if (seats <= 20) return 'Szabad helyek';
    return 'Sok szabad hely';
  }
}
