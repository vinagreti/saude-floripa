import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const MEMORY_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private innerLoggedState$ = new BehaviorSubject(this.getFromMemory());

  logged$ = this.innerLoggedState$.asObservable();

  constructor(
    private router: Router,
  ) { }

  login(token: string) {
    this.setInMemory(token);
    this.innerLoggedState$.next(token);
    this.router.navigate(['/dashboard']);
    return this.logged$;
  }

  logout() {
    this.setInMemory('');
    this.innerLoggedState$.next('');
    this.router.navigate(['/login']);
    return this.logged$;
  }

  private getFromMemory() {
    return localStorage.getItem(MEMORY_KEY) || undefined;
  }

  private setInMemory(token: string) {
    localStorage.setItem(MEMORY_KEY, token);
  }

}
