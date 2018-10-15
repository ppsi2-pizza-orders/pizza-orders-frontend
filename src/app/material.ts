import {MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule
    ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule
    ],
})
export class MaterialModule {
}
