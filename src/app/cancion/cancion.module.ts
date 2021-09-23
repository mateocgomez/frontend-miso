import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancionListComponent } from './cancion-list/cancion-list.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionCreateComponent } from './cancion-create/cancion-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CancionEditComponent } from './cancion-edit/cancion-edit.component';
import { SharedModule } from '../shared/shared.module';
import { SideBarModule } from '../app-sidebar/app-sidebar.module';
import { CancionCommentsComponent } from './cancion-comments/cancion-comments.component';


@NgModule({
  declarations: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, CancionCommentsComponent],
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule, SharedModule, SideBarModule,
  ],
  exports:[CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, CancionCommentsComponent]
})
export class CancionModule { }
