import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

// This modules imports
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
