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

  private allRoutes: Route[] = [
    // ... existing route data
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

      // Fallback to local filtering
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
