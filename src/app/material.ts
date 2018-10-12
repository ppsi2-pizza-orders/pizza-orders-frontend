import {MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule
    ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule
    ],
})
export class MaterialModule {
}
