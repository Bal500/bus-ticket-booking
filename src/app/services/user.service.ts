import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import {
  Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, user
} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private favoriteRoutesSubject = new BehaviorSubject<string[]>([]);
  favoriteRoutes$ = this.favoriteRoutesSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    user(this.auth).subscribe(firebaseUser => {
      if (firebaseUser) {
        this.getUserData(firebaseUser.uid).subscribe(userData => {
          this.currentUserSubject.next(userData as User);
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private getUserData(userId: string): Observable<User | null> {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      return docData(userRef, { idField: 'id' }) as Observable<User>;
    } catch (error) {
      console.error('Error getting user data from Firestore', error);
      return of(null);
    }
  }

  register(email: string, password: string, userData: Partial<User>): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(async userCredential => {
        const userId = userCredential.user.uid;
        const newUser: User = {
          id: userId,
          email: email,
          name: userData.name || '',
          phone: userData.phone || '',
          isAdmin: false,
          registeredDate: new Date()
        };
  
        const userRef = doc(this.firestore, `users/${userId}`);
        await setDoc(userRef, newUser);
      }),
      map(() => undefined),
      catchError(error => {
        console.error('Registration error', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(() => undefined),
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.favoriteRoutesSubject.next([]);
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout error', error);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.isAdmin;
  }

  updateProfile(userId: string, changes: Partial<User>): Observable<void> {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      return from(updateDoc(userRef, changes)).pipe(
        tap(() => {
          const currentUser = this.currentUserSubject.value;
          if (currentUser && currentUser.id === userId) {
            this.currentUserSubject.next({ ...currentUser, ...changes });
          }
        })
      );
    } catch (error) {
      console.error('Error updating user profile in Firestore', error);
      return of(undefined);
    }
  }

  addFavoriteRoute(routeId: string): void {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    const favorites = this.favoriteRoutesSubject.value;
    if (!favorites.includes(routeId)) {
      const newFavorites = [...favorites, routeId];
      this.favoriteRoutesSubject.next(newFavorites);

      const userRef = doc(this.firestore, `users/${currentUser.id}`);
      updateDoc(userRef, { favoriteRoutes: newFavorites }).catch(error => {
        console.error('Error updating favorite routes in Firestore', error);
      });
    }
  }

  removeFavoriteRoute(routeId: string): void {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    const favorites = this.favoriteRoutesSubject.value;
    const index = favorites.indexOf(routeId);

    if (index !== -1) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      this.favoriteRoutesSubject.next(newFavorites);

      const userRef = doc(this.firestore, `users/${currentUser.id}`);
      updateDoc(userRef, { favoriteRoutes: newFavorites }).catch(error => {
        console.error('Error updating favorite routes in Firestore', error);
      });
    }
  }

  isFavoriteRoute(routeId: string): boolean {
    return this.favoriteRoutesSubject.value.includes(routeId);
  }

  loadFavoriteRoutes(userId: string): void {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      docData(userRef).subscribe((userData: any) => {
        if (userData && userData.favoriteRoutes) {
          this.favoriteRoutesSubject.next(userData.favoriteRoutes);
        } else {
          this.favoriteRoutesSubject.next([]);
        }
      });
    } catch (error) {
      console.error('Error loading favorite routes from Firestore', error);
      this.favoriteRoutesSubject.next([]);
    }
  }

  getCurrentUserId(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.id : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  resetPassword(email: string): Observable<void> {
    console.log(`Password reset requested for ${email}`);
    return of(undefined);
  }

  deleteAccount(userId: string): Observable<void> {
    try {
      const userRef = doc(this.firestore, `users/${userId}`);
      return from(setDoc(userRef, { deleted: true, deletedAt: new Date() }, { merge: true })).pipe(
        tap(() => {
          if (this.currentUserSubject.value?.id === userId) {
            this.logout().subscribe();
          }
        }),
        catchError(error => {
          console.error('Error marking user as deleted in Firestore', error);
          throw error;
        })
      );
    } catch (error) {
      console.error('Error in deleteAccount', error);
      return of(undefined);
    }
  }
}
