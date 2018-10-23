import { MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
  MatTabsModule, MatStepperModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule,
 } from '@angular/material';
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
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
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
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
})
export class MaterialModule {
}
