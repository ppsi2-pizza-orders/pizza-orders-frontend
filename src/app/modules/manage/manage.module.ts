import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { MaterialModule } from '../../shared';
import { routes } from './manage.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ],
  declarations: [ManageComponent]
})
export class ManageModule { }
