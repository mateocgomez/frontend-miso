import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { SideBarModule } from '../app-sidebar/app-sidebar.module';

@NgModule({
  declarations: [AcercaDeComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, SideBarModule
  ],
  exports:[]
})
export class AcercaModule { }
