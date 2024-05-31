import { Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AirService } from 'src/app/shared/services/air.service';
import { DevicesService } from 'src/app/shared/services/devices.service';
import { TemperatureCardComponent } from 'src/app/shared/temperature-card/temperature-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder!: string;
  private devicesService: DevicesService = inject(DevicesService);

  devices: any;

  constructor() { }

  ngOnInit() {
    this.folder = "Home!";
    this.refresh();

    
  }

  private async refresh() {
    this.getDevices();
  }


  private async getDevices() {
    try {
      this.devices = await lastValueFrom(this.devicesService.getDevices());
    } catch (e) {
      this.devices = undefined;
    }
  }
  deviceToggle(device: any, event: any){
    //this.devicesService.toggleDevice(device.name, event.detail.checked).subscribe();
  }

}
