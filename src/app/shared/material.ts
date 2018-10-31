import { MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
  MatTabsModule, MatStepperModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSelectModule, MatAutocompleteModule,
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
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule
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
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
})
export class MaterialModule {
}
