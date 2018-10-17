import { MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
  MatTabsModule, MatStepperModule, MatMenuModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatStepperModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatStepperModule,
    MatMenuModule
  ],
})
export class MaterialModule {
}
