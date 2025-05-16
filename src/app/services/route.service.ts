import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Route } from '../models/route';
import {
  Firestore, collection, collectionData, doc, docData,
  addDoc, updateDoc, deleteDoc, query, where, orderBy,
  limit, startAfter, QueryDocumentSnapshot
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routesCollection = 'routes';
  private lastVisible: QueryDocumentSnapshot<Route> | null = null;
  private pageSize = 10;

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

  constructor(private firestore: Firestore) { }

  getRoutes(pageSize = this.pageSize): Observable<Route[]> {
    try {
      const routesRef = collection(this.firestore, this.routesCollection);
      const routesQuery = query(
        routesRef,
        orderBy('departure'),
        limit(pageSize)
      );

      return collectionData(routesQuery, { idField: 'id' }) as Observable<Route[]>;
    } catch (error) {
      console.error('Error getting routes from Firestore', error);
      return of(this.allRoutes.slice(0, pageSize));
    }
  }

  getNextPage(): Observable<Route[]> {
    if (!this.lastVisible) {
      return of([]);
    }

    try {
      const routesRef = collection(this.firestore, this.routesCollection);
      const routesQuery = query(
        routesRef,
        orderBy('departure'),
        startAfter(this.lastVisible),
        limit(this.pageSize)
      );

      return collectionData(routesQuery, { idField: 'id' }) as Observable<Route[]>;
    } catch (error) {
      console.error('Error getting next page from Firestore', error);
      return of([]);
    }
  }

  getRouteById(id: string): Observable<Route | undefined> {
    try {
      const routeRef = doc(this.firestore, `${this.routesCollection}/${id}`);
      return docData(routeRef, { idField: 'id' }) as Observable<Route>;
    } catch (error) {
      console.error('Error getting route by ID from Firestore', error);
      const route = this.allRoutes.find(r => r.id.toString() === id);
      return of(route);
    }
  }

  searchRoutes(params: any): Observable<Route[]> {
    try {
      const { from, to, date, passengers, minPrice, maxPrice } = params;

      let routesRef = collection(this.firestore, this.routesCollection);
      let conditions = [];

      if (from) conditions.push(where('from', '==', from));
      if (to) conditions.push(where('to', '==', to));
      if (minPrice) conditions.push(where('price', '>=', minPrice));
      if (maxPrice) conditions.push(where('price', '<=', maxPrice));
      if (passengers) conditions.push(where('seats', '>=', passengers));

      const routesQuery = query(routesRef, ...conditions);

      return collectionData(routesQuery, { idField: 'id' }).pipe(
        map((routes: any[]) => {
          if (date) {
            const searchDate = new Date(date).setHours(0, 0, 0, 0);
            return routes.filter(route => {
              const routeDate = new Date(route.departure).setHours(0, 0, 0, 0);
              return routeDate === searchDate;
            });
          }
          return routes;
        })
      ) as Observable<Route[]>;
    } catch (error) {
      console.error('Error searching routes in Firestore', error);

        return of(this.allRoutes.filter(route => {
        const { from, to, date, passengers, minPrice, maxPrice } = params;
        let match = true;

        if (from && !route.from.toLowerCase().includes(from.toLowerCase())) match = false;
        if (to && !route.to.toLowerCase().includes(to.toLowerCase())) match = false;
        if (minPrice && route.price < minPrice) match = false;
        if (maxPrice && route.price > maxPrice) match = false;
        if (passengers && route.seats < passengers) match = false;

        if (date) {
          const searchDate = new Date(date).setHours(0, 0, 0, 0);
          const routeDate = new Date(route.departure).setHours(0, 0, 0, 0);
          if (searchDate !== routeDate) match = false;
        }

        return match;
      }));
    }
  }

  getPopularRoutes(limitCount = 5): Observable<Route[]> {
    try {
      const routesRef = collection(this.firestore, this.routesCollection);
      const popularQuery = query(
        routesRef,
        orderBy('popularity', 'desc'),
        limit(limitCount)
      );
  
      return collectionData(popularQuery, { idField: 'id' }) as Observable<Route[]>;
    } catch (error) {
      console.error('Error getting popular routes from Firestore', error);
      return of(this.allRoutes.slice(0, limitCount));
    }
  }

  getRoutesByCity(city: string): Observable<Route[]> {
    try {
      const routesRef = collection(this.firestore, this.routesCollection);
      const fromQuery = query(routesRef, where('from', '==', city));
      const toQuery = query(routesRef, where('to', '==', city));

      const fromRoutes$ = collectionData(fromQuery, { idField: 'id' }) as Observable<Route[]>;
      const toRoutes$ = collectionData(toQuery, { idField: 'id' }) as Observable<Route[]>;

      return fromRoutes$.pipe(
        map(fromRoutes => {
          return toRoutes$.pipe(
            map(toRoutes => [...fromRoutes, ...toRoutes])
          );
        })
      ) as any;
    } catch (error) {
      console.error('Error getting routes by city from Firestore', error);
      return of(this.allRoutes.filter(route =>
        route.from === city || route.to === city
      ));
    }
  }

  addRoute(route: Omit<Route, 'id'>): Observable<string> {
    try {
      const routesRef = collection(this.firestore, this.routesCollection);
      return from(addDoc(routesRef, route)).pipe(
        map(docRef => docRef.id)
      );
    } catch (error) {
      console.error('Error adding route to Firestore', error);
      return of('error-id');
    }
  }

  updateRoute(id: string, changes: Partial<Route>): Observable<void> {
    try {
      const routeRef = doc(this.firestore, `${this.routesCollection}/${id}`);
      return from(updateDoc(routeRef, changes));
    } catch (error) {
      console.error('Error updating route in Firestore', error);
      return of(undefined);
    }
  }

  deleteRoute(id: string): Observable<void> {
    try {
      const routeRef = doc(this.firestore, `${this.routesCollection}/${id}`);
      return from(deleteDoc(routeRef));
    } catch (error) {
      console.error('Error deleting route from Firestore', error);
      return of(undefined);
    }
  }
}
