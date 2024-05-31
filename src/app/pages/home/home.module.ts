import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TemperatureCardComponent } from "../../shared/temperature-card/temperature-card.component";

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        TemperatureCardComponent
    ]
})
export class HomePageModule {}
