import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogTypes } from '../components/info-dialog/info-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialogService: DialogService, private router: Router) { }

  public handleError(error: HttpErrorResponse){
    switch(error.status){
      case 0:
        this.showErrorDialog('Bład połączenia!', 'Proszę sprawdzić połączenie z Internetem.');
        break;
      case 401:
        this.goToLogin();
        break;
      case 500:
        this.showErrorDialog('Błąd!', 'Wystąpił błąd aplikacji, spróbój ponownie.');
        break;
    }
  }

  private showErrorDialog(title, message){
    this.dialogService.closeAll();
    this.dialogService.infoDialog(title, message, DialogTypes.ERROR);
  }

  private goToLogin() {
    this.dialogService.authDialog().subscribe(resp => {
      if(!resp){
        this.goToHomePage();
      }
    });
  }

  private goToHomePage() {
    this.router.navigate(['/home']);
  }

}
