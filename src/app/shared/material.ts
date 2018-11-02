import { MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatListModule,
  MatTabsModule, MatStepperModule, MatMenuModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSelectModule, MatAutocompleteModule, MatTooltipModule,
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
    MatAutocompleteModule,
    MatTooltipModule
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
    MatAutocompleteModule,
    MatTooltipModule
  ],
})
export class MaterialModule {
}
