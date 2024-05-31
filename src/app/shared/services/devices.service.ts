import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  http = inject(HttpClient);

  constructor() { }

  getDevices() {
    return this.http.get('http://localhost:8000/api/devices');
  }

  toggleDevice(id: any, checked: any) {
    const newStatus = checked ? 'on' : 'off';
    return this.http.get('http://localhost:8000/api/devices/' + id + '/' + newStatus);
  }
}
