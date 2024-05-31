import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirService {
  http = inject(HttpClient);
  constructor() { }

  getTemperature() {
    return this.http.get('http://localhost:8000/api/air');
  }
}
