import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AirService } from '../services/air.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { OpenmeteoService } from '../services/openmeteo.service';

@Component({
  selector: 'app-temperature-card',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss'],
})
export class TemperatureCardComponent  implements OnInit {
  private airService: AirService = inject(AirService);
  private openmeteoService: OpenmeteoService = inject(OpenmeteoService);
  air = { temperature: 0, humidity: 0 };
  temperature = "";
  forecast:any = undefined;

  constructor() { }
  ngOnInit(): void {
    this.getTemperature();
    this.fetchForecast();
  }
  
  private async getTemperature() {
    try {
      this.air = <any>await lastValueFrom(this.airService.getTemperature());
      console.log(this.air);
    } catch (e) {
      this.air = { temperature: 0, humidity: 0 };
    }
  }

  private async fetchForecast() {
    this.forecast =  await this.openmeteoService.getForecast();
  }


}
